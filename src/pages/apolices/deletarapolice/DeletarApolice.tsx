import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { FaTrash, FaXmark } from "react-icons/fa6"

import { AuthContext } from "../../../contexts/AuthContext"
import { deletarApolice, listarApolicePorId } from "../../../services/Apolice"
import type Apolice from "../../../models/Apolice"

function DeletarApolice() {
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()
    const { usuario } = useContext(AuthContext)

    const [apolice, setApolice] = useState<Apolice>({} as Apolice)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const header = {
        headers: { Authorization: usuario.token },
    }

    useEffect(() => {
        if (usuario.token === '') {
            navigate('/')
        }
    }, [usuario.token])

    useEffect(() => {
        if (id !== undefined) {
            listarApolicePorId(Number(id), setApolice, header)
        }
    }, [id])

    async function confirmarExclusao() {
        setIsLoading(true)

        try {
            await deletarApolice(Number(id), header)
            navigate('/apolices')
        } catch (error) {
            console.error('Erro ao deletar apólice!', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-2xl">
                <h2 className="mb-4 text-xl font-bold text-slate-800">
                    Excluir Apólice
                </h2>

                <p className="mb-6 text-slate-600">
                    Tem certeza que deseja excluir a apólice nº{' '}
                    <span className="font-semibold">{apolice.numeroApolice}</span>?
                    Essa ação não pode ser desfeita.
                </p>

                <div className="flex justify-around gap-3">
                    <button
                        type="button"
                        onClick={() => navigate('/apolices')}
                        disabled={isLoading}
                        className="rounded-lg text-white bg-slate-400 hover:bg-slate-600
                        w-1/2 py-2 transition duration-200
                        disabled:cursor-not-allowed disabled:opacity-60
                        flex items-center justify-center gap-2"
                    >
                        <FaXmark size={18} />
                        <span>Cancelar</span>
                    </button>

                    <button
                        type="button"
                        onClick={confirmarExclusao}
                        disabled={isLoading}
                        className="rounded-lg text-white bg-red-500 hover:bg-red-700
                        w-1/2 py-2 flex items-center justify-center gap-2
                        transition duration-200 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isLoading ? (
                            <ClipLoader color="#ffffff" size={20} />
                        ) : (
                            <>
                                <FaTrash size={18} />
                                <span>Excluir</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarApolice
