import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(req: Request) {
    try {
        const newDailyUnit = await prisma.dailyUnit.findFirst({
            orderBy : {
                date: 'desc'
            }
        })   
        const { pick } = await req.json()
        console.log(pick.data.updatePick);

        const updatedDailyUnit = await prisma.dailyUnit.update({
            where: { id: newDailyUnit?.id },
            data: {
              netUnits: newDailyUnit?.netUnits + pick.data.updatePick.net, // Example update logic
            },
          });

        const unitCount = await prisma.unitCount.findFirst() 

        const updatedTotal = await prisma.unitCount.update({
            where : { id: 0},
            data : {
                netUnits: unitCount?.netUnits + pick.data.updatePick.net
            }
        })
      
        console.log(updatedDailyUnit, updatedTotal)
        
        return NextResponse.json({result: '200', ok: true})
    } catch (err) {
        return NextResponse.json({result: err, ok: false})

    }
}