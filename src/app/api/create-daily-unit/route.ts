import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(req: Request) {
    console.log('hello')
    try {
        const newDailyUnit = await prisma.dailyUnit.create({
            data : {
                netUnits : 0,
                unitCount: { connect : {id: 0}}
            }
        })
        return NextResponse.json({result: '200', ok: true, data: newDailyUnit})
    } catch (err) {
        return NextResponse.json({result: err, ok: false})

    }
}