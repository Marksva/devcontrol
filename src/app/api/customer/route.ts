import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";

export async function DELETE(request: Request) {

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("id");

    if (!userId) {
        return NextResponse.json({ message: "failed delete customer" }, { status: 400 });
    }

    const findTickets = await prismaClient.ticket.findFirst({
        where: {
            customerId: userId
        }
    })

    if (findTickets) {
        return NextResponse.json({ message: "cannot delete customer with tickets" }, { status: 400 });
    }

    try {
        await prismaClient.customer.delete({
            where: {
                id: userId as string
            }
        })

        return NextResponse.json({ message: "cliente deletado com sucesso" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "failed delete customer" }, { status: 400 });
    }


}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { name, email, phone, address, userId } = await request.json();

    try {

        await prismaClient.customer.create({
            data: {
                name,
                email,
                phone,
                address: address ? address : "",
                userId: userId
            }
        })

        return NextResponse.json({ message: "Customer created successfully" }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message: "Failed to create customer" }, { status: 400 });
    }

}