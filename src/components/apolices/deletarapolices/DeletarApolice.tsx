import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"

import { apoliceService } from "../../../services/Apolice"
import type Apolice from "../../../models/Apolice"

function DeletarApolice() {
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()

    const [apolice, setApolice] = useState<Apolice | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        if (id !== undefined) {
            apoliceService.buscarPorId(Number(id))
                .then(setApolice)
                .catch((error) => console.error('Erro ao buscar apólice!', error))
        }
    }, [id])

    async function confirmarExclusao() {
        if (id === undefined) return

        setIsLoading(true)

        try {
            await apoliceService.deletar(Number(id))
            navigate('/apolices')
        } catch (error) {
            console.error('Erro ao deletar apólice!', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-md rounded border-2 border-indigo-900 bg-white p-6 shadow-2xl">
                <h2 className="mb-4 text-xl font-bold text-indigo-900">
                    Excluir Apólice
                </h2>

                <p className="mb-6 text-slate-600">
                    Tem certeza que deseja excluir a apólice nº{' '}
                    <span className="font-semibold">{apolice?.numeroApolice}</span>?
                    Essa ação não pode ser desfeita.
                </p>

                <div className="flex justify-around gap-3">
                    <button
                        type="button"
                        onClick={() => navigate('/apolices')}
                        disabled={isLoading}
                        className="w-1/2 rounded bg-slate-400 py-2 text-white transition
                        hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        onClick={confirmarExclusao}
                        disabled={isLoading}
                        className="flex w-1/2 items-center justify-center gap-2 rounded bg-red-500
                        py-2 text-white transition hover:bg-red-700
                        disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isLoading ? <ClipLoader color="#ffffff" size={20} /> : 'Excluir'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarApolice
