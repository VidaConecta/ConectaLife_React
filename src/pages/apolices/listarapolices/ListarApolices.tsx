import { useContext, useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { FaPlus } from "react-icons/fa6"

import { AuthContext } from "../../../contexts/AuthContext"
import { listarApolices } from "../../../services/Apolice"
import type Apolice from "../../../models/Apolice"
import CardApolices from "../../../components/apolices/cardapolices/CardApolices"

function ListarApolices() {
    const navigate = useNavigate()
    const { usuario } = useContext(AuthContext)

    const [apolices, setApolices] = useState<Apolice[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const header = {
        headers: { Authorization: usuario.token },
    }

    async function buscarApolices() {
        setIsLoading(true)

        try {
            await listarApolices(setApolices, header)
        } catch (error) {
            console.error('Erro ao buscar apólices!', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (usuario.token === '') {
            navigate('/')
        }
    }, [usuario.token])

    useEffect(() => {
        buscarApolices()
    }, [])

    return (
        <div className="container mx-auto flex flex-col gap-6 px-6 py-10">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-slate-900">Apólices</h2>

                <Link
                    to="/cadastrarapolice"
                    className="flex items-center gap-2 rounded-lg bg-teal-500 px-4 py-2 font-bold text-white transition duration-200 hover:bg-teal-700"
                >
                    <FaPlus size={16} />
                    Nova Apólice
                </Link>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-10">
                    <ClipLoader color="#0f766e" size={40} />
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
