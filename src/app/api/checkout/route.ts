const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';


const getActiveProducts = async () => {
  const checkProducts = await stripe.products.list()
  const availableProducts = checkProducts.data.filter(
    (product: any) => product.active === true
  )

  return availableProducts
}

export const POST = async(request:any) => {
  const {product, user} = await request.json()

  let activeProducts = await getActiveProducts()

  try {
      const stripeProduct = activeProducts?.find(
        (stripeProduct: any) => 
          stripeProduct?.name?.toLowerCase() == product?.name?.toLowerCase()
      )

      if (stripeProduct == undefined) {
        const prod = await stripe.products.create({
          name: product.name,
          default_price_data : {
            unit_amount: product.price * 100,
            currency: 'usd'
          }
        })
      }

  } catch (error) {
    console.error("Error creating new product", error)
  }

  activeProducts = await getActiveProducts()
  let stripeItems:any[] = []

  const stripeProduct = activeProducts?.find(
    (stripeProduct: any) => 
      stripeProduct?.name?.toLowerCase() == product?.name?.toLowerCase()
  )

  if (stripeProduct) {
    stripeItems.push({
      price: stripeProduct?.default_price,
      quantity: 1,
    })
  }

  const session = await stripe.checkout.sessions.create({
    line_items: stripeItems,
    mode: "payment",
    success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: 'http://localhost:3000/join'
  });

  console.log(session)

  
  return NextResponse.json({url: session.url})
}