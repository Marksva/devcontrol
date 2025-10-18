export function CardCustomer() {

    return (
        <article className="flex flex-col bg-gray-100 border-1 border-gray-200 p-2 rounded-lg gap-2 hover:scale-103 duration-200">
            <h2>
                <a className="font-bold">Nome:</a> Mercado Silva
            </h2>
            <p><a className="font-bold">Email:</a> teste@teste.com</p>
            <p><a className="font-bold">Telefone:</a> XX99101010</p>
            <button className="bg-red-500 px-3 rounded text-white mt-2 self-start">
                Deletar
            </button>
        </article>
    )
}