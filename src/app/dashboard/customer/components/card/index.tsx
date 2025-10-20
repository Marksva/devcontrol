"use client"

import { CustomerProps } from "@/utils/customer.type"
import { api } from "@/lib/api"
import { useRouter } from "next/navigation";

export function CardCustomer({ customer }: { customer: CustomerProps }) {

    const router = useRouter();

    async function handleDeleteCustomer() {

        try {
            const response = await api.delete("/api/customer", {
                params: {
                    id: customer.id
                }
            });

            if (response.status === 200) {
                router.refresh();
            }

        } catch (error) {
            console.error("Failed to delete customer", error);
        }

    }

    return (
        <article className="flex flex-col bg-gray-100 border-1 border-gray-200 p-2 rounded-lg gap-2 hover:scale-103 duration-200">
            <h2>
                <a className="font-bold">Nome:</a> {customer.name}
            </h2>
            <p><a className="font-bold">Email:</a> {customer.email}</p>
            <p><a className="font-bold">Telefone:</a> {customer.phone}</p>
            <button
                className="bg-red-500 px-3 rounded text-white mt-2 self-start"
                onClick={handleDeleteCustomer}
            >
                Deletar
            </button>
        </article>
    )
}