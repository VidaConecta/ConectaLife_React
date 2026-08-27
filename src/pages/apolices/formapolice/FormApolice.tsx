import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { FaCheck, FaXmark } from "react-icons/fa6"

import { AuthContext } from "../../../contexts/AuthContext"
import { atualizarApolice, cadastrarApolice, listarApolicePorId } from "../../../services/Apolice"
import type Apolice from "../../../models/Apolice"

function FormApolice() {
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()
    const { usuario } = useContext(AuthContext)

    const [apolice, setApolice] = useState<Apolice>({
        id: 0,
        numeroApolice: '',
        status: 'ATIVO',
        valorCobertura: 0,
        dataVigencia: '',
        cliente: { id: 0 } as Apolice['cliente'],
        usuario: { id: usuario.id } as Apolice['usuario'],
    })

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

    function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target

        if (name === 'clienteId') {
            setApolice({
                ...apolice,
                cliente: { ...apolice.cliente, id: Number(value) },
            })
            return
        }

        setApolice({
            ...apolice,
            [name]: name === 'valorCobertura' ? Number(value) : value,
        })
    }

    async function salvar(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        try {
            if (id !== undefined) {
                await atualizarApolice(apolice, setApolice, header)
            } else {
                await cadastrarApolice(apolice, setApolice, header)
            }

            navigate('/apolices')
        } catch (error) {
            console.error('Erro ao salvar apólice!', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <form
                className="flex w-full max-w-md flex-col gap-3"
                onSubmit={salvar}
            >
                <h2 className="text-center text-3xl font-bold text-slate-900">
                    {id !== undefined ? 'Editar Apólice' : 'Cadastrar Apólice'}
                </h2>

                <div className="flex flex-col w-full">
                    <label htmlFor="numeroApolice">Número da Apólice</label>
                    <input
                        type="text"
                        id="numeroApolice"
                        name="numeroApolice"
                        className="border-2 border-slate-700 rounded p-2 w-full"
                        required
                        value={apolice.numeroApolice}
                        onChange={atualizarEstado}
                    />
                </div>

                <div className="flex flex-col w-full">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        name="status"
                        className="border-2 border-slate-700 rounded p-2 w-full"
                        value={apolice.status}
                        onChange={atualizarEstado}
                    >
                        <option value="ATIVO">Ativo</option>
                        <option value="SUSPENSO">Suspenso</option>
                        <option value="CANCELADO">Cancelado</option>
                        <option value="FINALIZADO">Finalizado</option>
                    </select>
                </div>

                <div className="flex flex-col w-full">
                    <label htmlFor="valorCobertura">Valor da Cobertura (R$)</label>
                    <input
                        type="number"
                        id="valorCobertura"
                        name="valorCobertura"
                        min={0}
                        step="0.01"
                        className="border-2 border-slate-700 rounded p-2 w-full"
                        required
                        value={apolice.valorCobertura}
                        onChange={atualizarEstado}
                    />
                </div>

                <div className="flex flex-col w-full">
                    <label htmlFor="dataVigencia">Vigência</label>
                    <input
                        type="date"
                        id="dataVigencia"
                        name="dataVigencia"
                        className="border-2 border-slate-700 rounded p-2 w-full"
                        required
                        value={apolice.dataVigencia}
                        onChange={atualizarEstado}
                    />
                </div>

                <div className="flex flex-col w-full">
                    <label htmlFor="clienteId">ID do Cliente</label>
                    <input
                        type="number"
                        id="clienteId"
                        name="clienteId"
                        min={1}
                        className="border-2 border-slate-700 rounded p-2 w-full"
                        required
                        value={apolice.cliente.id || ''}
                        onChange={atualizarEstado}
                    />
                </div>

                <div className="flex flex-col sm:flex-row justify-around w-full gap-3 sm:gap-8 mt-2">
                    <button
                        type="button"
                        onClick={() => navigate('/apolices')}
                        disabled={isLoading}
                        className="rounded-lg text-white bg-red-400 hover:bg-red-700
                        w-full sm:w-1/2 py-2 transition duration-200
                        disabled:cursor-not-allowed disabled:opacity-60
                        flex items-center justify-center gap-2"
                    >
                        <FaXmark size={18} />
                        <span>Cancelar</span>
                    </button>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="rounded-lg text-white bg-teal-500 hover:bg-teal-700
                        w-full sm:w-1/2 py-2 flex items-center justify-center gap-2
                        transition duration-200 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isLoading ? (
                            <ClipLoader color="#ffffff" size={20} />
                        ) : (
                            <>
                                <FaCheck size={18} />
                                <span>Salvar</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FormApolice
