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
        return NextResponse.json({ message: "failed update ticket" }, { status: 404 });
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
        return NextResponse.json({ message: "failed update ticket" }, { status: 500 });
    }


    console.log(findTicket);
    return NextResponse.json({ message: "ticket found", ticket: findTicket }, { status: 200 });

}

export async function POST(request: Request) {

    const { customerId, name, description } = await request.json();

    if (!customerId || !name || !description) {
        return NextResponse.json({ message: "failed create ticket" }, { status: 400 });
    }


    try {
        await prismaClient.ticket.create({
            data: {
                name,
                description,
                customerId,
                status: "Open"
            }
        })
    } catch (error) {
        return NextResponse.json({ message: "failed create ticket" }, { status: 400 });
    }

    console.log({ customerId, name, description });

    return NextResponse.json({ message: "ticket created" }, { status: 201 });
}