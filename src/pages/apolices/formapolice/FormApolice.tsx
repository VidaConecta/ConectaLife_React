import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"

import { apoliceService } from "../../../services/Apolice"
import { clienteService } from "../../../services/ClienteService"
import type Apolice from "../../../models/Apolice"
import type Cliente from "../../../models/Cliente"

function FormApolice() {
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()

    const [apolice, setApolice] = useState<Apolice>({
        id: 0,
        numeroApolice: '',
        status: 'ATIVO',
        valorCobertura: 0,
        dataVigencia: '',
        cliente: { id: 0, nome: '', dataNascimento: '', cpf: '', email: '' },
    })

    const [clientes, setClientes] = useState<Cliente[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        clienteService.listarTodos()
            .then(setClientes)
            .catch((error) => console.error('Erro ao buscar clientes!', error))
    }, [])

    useEffect(() => {
        if (id !== undefined) {
            apoliceService.buscarPorId(Number(id))
                .then(setApolice)
                .catch((error) => console.error('Erro ao buscar apólice!', error))
        }
    }, [id])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target

        if (name === 'clienteId') {
            const cliente = clientes.find((c) => c.id === Number(value))

            if (cliente) {
                setApolice({ ...apolice, cliente })
            }

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
                await apoliceService.atualizar(Number(id), apolice)
            } else {
                await apoliceService.cadastrar(apolice)
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
                <h2 className="text-center text-3xl font-bold text-indigo-900">
                    {id !== undefined ? 'Editar Apólice' : 'Cadastrar Apólice'}
                </h2>

                <div className="flex w-full flex-col">
                    <label htmlFor="numeroApolice">Número da Apólice</label>
                    <input
                        type="text"
                        id="numeroApolice"
                        name="numeroApolice"
                        className="w-full rounded border-2 border-indigo-900 p-2"
                        required
                        value={apolice.numeroApolice}
                        onChange={atualizarEstado}
                    />
                </div>

                <div className="flex w-full flex-col">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        name="status"
                        className="w-full rounded border-2 border-indigo-900 p-2"
                        value={apolice.status}
                        onChange={atualizarEstado}
                    >
                        <option value="ATIVO">Ativo</option>
                        <option value="SUSPENSO">Suspenso</option>
                        <option value="CANCELADO">Cancelado</option>
                        <option value="FINALIZADO">Finalizado</option>
                    </select>
                </div>

                <div className="flex w-full flex-col">
                    <label htmlFor="valorCobertura">Valor da Cobertura (R$)</label>
                    <input
                        type="number"
                        id="valorCobertura"
                        name="valorCobertura"
                        min={0}
                        step="0.01"
                        className="w-full rounded border-2 border-indigo-900 p-2"
                        required
                        value={apolice.valorCobertura}
                        onChange={atualizarEstado}
                    />
                </div>

                <div className="flex w-full flex-col">
                    <label htmlFor="dataVigencia">Vigência</label>
                    <input
                        type="date"
                        id="dataVigencia"
                        name="dataVigencia"
                        className="w-full rounded border-2 border-indigo-900 p-2"
                        required
                        value={apolice.dataVigencia}
                        onChange={atualizarEstado}
                    />
                </div>

                <div className="flex w-full flex-col">
                    <label htmlFor="clienteId">Cliente</label>
                    <select
                        id="clienteId"
                        name="clienteId"
                        className="w-full rounded border-2 border-indigo-900 p-2"
                        required
                        value={apolice.cliente.id || ''}
                        onChange={atualizarEstado}
                    >
                        <option value="" disabled>Selecione um cliente</option>
                        {clientes.map((cliente) => (
                            <option key={cliente.id} value={cliente.id}>
                                {cliente.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mt-2 flex w-full flex-col justify-around gap-3 sm:flex-row sm:gap-8">
                    <button
                        type="button"
                        onClick={() => navigate('/apolices')}
                        disabled={isLoading}
                        className="w-full rounded bg-slate-400 py-2 text-white transition
                        hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-1/2"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex w-full items-center justify-center gap-2 rounded bg-indigo-700
                        py-2 text-white transition hover:bg-indigo-800
                        disabled:cursor-not-allowed disabled:opacity-60 sm:w-1/2"
                    >
                        {isLoading ? <ClipLoader color="#ffffff" size={20} /> : 'Salvar'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FormApolice
