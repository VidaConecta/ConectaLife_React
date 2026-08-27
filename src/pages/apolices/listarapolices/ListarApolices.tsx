import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ClipLoader } from "react-spinners"

import { apoliceService } from "../../../services/Apolice"
import type Apolice from "../../../models/Apolice"
import CardApolices from "../../../components/apolices/cardapolices/CardApolices"

function ListarApolices() {
    const [apolices, setApolices] = useState<Apolice[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function buscarApolices() {
        setIsLoading(true)

        try {
            const dados = await apoliceService.listarTodos()
            setApolices(dados)
        } catch (error) {
            console.error('Erro ao buscar apólices!', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        buscarApolices()
    }, [])

    return (
        <div className="container mx-auto flex flex-col gap-6 px-6 py-10">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-indigo-900">Apólices</h2>

                <Link
                    to="/cadastrarapolice"
                    className="rounded bg-indigo-700 px-4 py-2 font-semibold text-white transition hover:bg-indigo-800"
                >
                    Cadastrar Apólice
                </Link>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-10">
                    <ClipLoader color="#3730a3" size={40} />
                </div>
            ) : apolices.length === 0 ? (
                <p className="text-center text-slate-500">Nenhuma apólice cadastrada.</p>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {apolices.map((apolice) => (
                        <CardApolices key={apolice.id} apolice={apolice} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default ListarApolices
