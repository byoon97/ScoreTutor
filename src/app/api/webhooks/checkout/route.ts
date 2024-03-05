import { DateResolver } from 'graphql-scalars';
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from '../../../../../lib/prisma';

const stripe = require("stripe")(process.env.STRIPE_PRIVATE);

const secret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    
    const signature = headers().get("stripe-signature");
    
    const event = stripe.webhooks.constructEvent(body, signature, secret);
    
    if (event.type === "checkout.session.completed") {
      if (!event.data.object.customer_details.email) {
        throw new Error(`missing user email, ${event.id}`);
      }

      let user = await prisma.user.findUnique({
        where : {
            email: event.data.object.customer_details.email
        },
        include: { membership: true },
      })

      const createExpirationDate = async () => {
        let item = event?.data?.object?.amount_subtotal;
        let previousDateISO = user?.membership?.expiresAt;
        
        // Convert the previousDate from ISO string to Date object
        let previousDate = previousDateISO ? new Date(previousDateISO) : null;
        let baseDate = new Date();
      
        // If previousDate exists and is in the future, use it as the base date
        if (previousDate && previousDate > baseDate) {
          baseDate = previousDate;
        }
      
        switch (item) {
          case 25000:
            baseDate.setMonth(baseDate.getMonth() + 1);
            break;
          case 60000:
            baseDate.setMonth(baseDate.getMonth() + 6);
            break;
          case 150000:
            baseDate.setFullYear(baseDate.getFullYear() + 1);
            break;
          default:
            console.log("Amount does not match any conditions.");
            return null;
        }
      
        const expirationDateISO = baseDate.toISOString();
      
        return expirationDateISO;
      };
      
      let membership = await prisma.membership.create({
        data: {
            expiresAt: await createExpirationDate(),
            user: { connect: { id: user?.id }}
        }
      })

      console.log(membership)

    }
    
    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    
    console.error(error);
    return NextResponse.json(
      {
        message: "something went wrong",
        ok: false,
      },
      { status: 500 }
    );
  }
}