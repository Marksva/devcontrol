import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";

export async function PATCH(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }


    const { id } = await request.json();

    const findTicket = await prismaClient.ticket.findFirst({
        where: {
            id: id as string
        }
    })

    if (!findTicket) {
        return NextResponse.json({ message: "Filed update ticket" }, { status: 404 });
    }

    try {
        await prismaClient.ticket.update({
            where: {
                id: id as string
            },
            data: {
                status: "Closed"
            }
        });
    } catch (error) {
        return NextResponse.json({ message: "Filed update ticket" }, { status: 500 });
    }


    console.log(findTicket);
    return NextResponse.json({ message: "ticket found", ticket: findTicket }, { status: 200 });

}