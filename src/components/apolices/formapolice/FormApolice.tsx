import {
  useState,
  useEffect,
  type ChangeEvent,
  type FormEvent
} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { NumericFormat } from 'react-number-format'
import { ClipLoader } from 'react-spinners'
import {
  CalendarBlankIcon,
  CurrencyCircleDollarIcon,
  FileTextIcon,
  UserIcon,
  ShieldCheckIcon
} from '@phosphor-icons/react'
import type Apolice from '../../../models/Apolice'
import type Cliente from '../../../models/Cliente'
import { apoliceService } from '../../../services/Apolice'
import { clienteService } from '../../../services/ClienteService'

function FormApolice() {
  const navigate = useNavigate()

  const [apolice, setApolice] = useState<Apolice>({} as Apolice)
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente>(
    {} as Cliente
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { id } = useParams<{ id: string }>()

  async function buscarPorId(id: string) {
    try {
      const dados = await apoliceService.buscarPorId(Number(id))
      setApolice(dados)
    } catch (error) {
      alert('Erro ao buscar a apólice.')
    }
  }

  async function buscarClientes() {
    try {
      const dados = await clienteService.listarTodos()
      setClientes(dados)
    } catch (error) {
      alert('Erro ao buscar clientes.')
    }
  }

  useEffect(() => {
    buscarClientes()
  }, [])

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  useEffect(() => {
    if (apolice.cliente !== undefined) {
      setClienteSelecionado(apolice.cliente)
    }
  }, [apolice])

  useEffect(() => {
    setApolice({
      ...apolice,
      cliente: clienteSelecionado
    })
  }, [clienteSelecionado])

  function atualizarEstado(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setApolice({
      ...apolice,
      [e.target.name]: e.target.value
    })
  }

  function atualizarValorCobertura(valor: number | undefined) {
    setApolice({
      ...apolice,
      valorCobertura: valor ?? 0
    })
  }

  function atualizarCliente(e: ChangeEvent<HTMLSelectElement>) {
    const cliente = clientes.find((c) => c.id === Number(e.target.value))

    if (cliente !== undefined) {
      setClienteSelecionado(cliente)
    }
  }

  function retornar() {
    navigate('/apolices')
  }

  async function gerarNovaApolice(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    if (id !== undefined) {
      try {
        await apoliceService.atualizar(Number(id), apolice)
        alert('Apólice atualizada com sucesso!')
      } catch (error) {
        alert('Erro ao atualizar a apólice.')
      }
    } else {
      try {
        await apoliceService.cadastrar(apolice)
        alert('Apólice cadastrada com sucesso!')
      } catch (error) {
        alert('Erro ao cadastrar a apólice.')
      }
    }

    setIsLoading(false)
    retornar()
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#EDF5FF] px-4 pb-12 pt-24 sm:px-6 sm:pt-28 md:pb-16">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#1689F5]/20 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-36 -right-32 h-96 w-96 rounded-full bg-[#7C3AED]/20 blur-3xl" />

      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-[#38BDF8]/10 blur-3xl" />

      <section className="relative z-10 mx-auto w-full max-w-xl">
        <header className="mb-8 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="h-9 w-1 rounded-full bg-gradient-to-b from-[#1689F5] to-[#7C3AED]" />

            <h1 className="bg-gradient-to-r from-[#126CC5] via-[#2563EB] to-[#6D28D9] bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
              {id === undefined ? 'Cadastrar Apólice' : 'Editar Apólice'}
            </h1>
          </div>

          <p className="mx-auto max-w-md text-sm leading-6 text-[#526581]">
            {id === undefined
              ? 'Registre os dados da nova apólice e vincule-a a um cliente cadastrado.'
              : 'Atualize os dados da apólice para manter a proteção do cliente sempre organizada.'}
          </p>
        </header>

        <form
          className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/55 p-6 shadow-[0_20px_60px_rgba(37,99,235,0.14)] backdrop-blur-xl sm:p-8"
          onSubmit={gerarNovaApolice}
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1689F5] via-[#2563EB] to-[#7C3AED]" />

          <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[#60A5FA]/15 blur-2xl" />

          <div className="pointer-events-none absolute -bottom-16 -left-12 h-28 w-28 rounded-full bg-[#A78BFA]/15 blur-2xl" />

          <div className="relative z-10 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="numeroApolice"
                className="flex items-center gap-2 text-sm font-semibold text-[#30476A]"
              >
                <FileTextIcon
                  size={18}
                  weight="bold"
                  className="text-[#1689F5]"
                />
                Número da apólice
              </label>

              <input
                id="numeroApolice"
                name="numeroApolice"
                type="text"
                required
                value={apolice.numeroApolice ?? ''}
                onChange={atualizarEstado}
                className="w-full rounded-xl border border-white/80 bg-white/65 px-4 py-3 text-base text-[#172B4D] outline-none shadow-sm transition-all placeholder:text-[#8AA0BD] focus:border-[#1689F5]/50 focus:bg-white focus:ring-4 focus:ring-[#1689F5]/10"
                placeholder="Digite o número da apólice"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="status"
                className="flex items-center gap-2 text-sm font-semibold text-[#30476A]"
              >
                <ShieldCheckIcon
                  size={18}
                  weight="bold"
                  className="text-[#1689F5]"
                />
                Status
              </label>

              <select
                id="status"
                name="status"
                value={apolice.status ?? ''}
                onChange={atualizarEstado}
                className="w-full rounded-xl border border-white/80 bg-white/65 px-4 py-3 text-base text-[#172B4D] outline-none shadow-sm transition-all focus:border-[#1689F5]/50 focus:bg-white focus:ring-4 focus:ring-[#1689F5]/10"
              >
                <option value="" disabled>
                  Selecione um status
                </option>
                <option value="ATIVO">Ativo</option>
                <option value="SUSPENSO">Suspenso</option>
                <option value="CANCELADO">Cancelado</option>
                <option value="FINALIZADO">Finalizado</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="valorCobertura"
                className="flex items-center gap-2 text-sm font-semibold text-[#30476A]"
              >
                <CurrencyCircleDollarIcon
                  size={18}
                  weight="bold"
                  className="text-[#1689F5]"
                />
                Valor da cobertura
              </label>

              <NumericFormat
                id="valorCobertura"
                name="valorCobertura"
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale
                allowNegative={false}
                prefix="R$ "
                value={apolice.valorCobertura ?? ''}
                onValueChange={(values) =>
                  atualizarValorCobertura(values.floatValue)
                }
                className="w-full rounded-xl border border-white/80 bg-white/65 px-4 py-3 text-base text-[#172B4D] outline-none shadow-sm transition-all placeholder:text-[#8AA0BD] focus:border-[#1689F5]/50 focus:bg-white focus:ring-4 focus:ring-[#1689F5]/10"
                placeholder="R$ 0,00"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="dataVigencia"
                className="flex items-center gap-2 text-sm font-semibold text-[#30476A]"
              >
                <CalendarBlankIcon
                  size={18}
                  weight="bold"
                  className="text-[#1689F5]"
                />
                Vigência
              </label>

              <input
                id="dataVigencia"
                name="dataVigencia"
                type="date"
                required
                value={apolice.dataVigencia ?? ''}
                onChange={atualizarEstado}
                className="w-full rounded-xl border border-white/80 bg-white/65 px-4 py-3 text-base text-[#172B4D] outline-none shadow-sm transition-all focus:border-[#1689F5]/50 focus:bg-white focus:ring-4 focus:ring-[#1689F5]/10"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="cliente"
                className="flex items-center gap-2 text-sm font-semibold text-[#30476A]"
              >
                <UserIcon size={18} weight="bold" className="text-[#1689F5]" />
                Cliente
              </label>

              <select
                id="cliente"
                name="cliente"
                value={clienteSelecionado.id ?? ''}
                onChange={atualizarCliente}
                className="w-full rounded-xl border border-white/80 bg-white/65 px-4 py-3 text-base text-[#172B4D] outline-none shadow-sm transition-all focus:border-[#1689F5]/50 focus:bg-white focus:ring-4 focus:ring-[#1689F5]/10"
              >
                <option value="" disabled>
                  Selecione um cliente
                </option>

                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-2 flex flex-col-reverse gap-3 border-t border-white/70 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={retornar}
                disabled={isLoading}
                className="w-full rounded-xl border border-white/80 bg-white/60 px-6 py-3 text-base font-semibold text-[#526581] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:text-[#172B4D] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="flex min-w-40 items-center justify-center rounded-xl bg-gradient-to-r from-[#1689F5] via-[#2563EB] to-[#6D28D9] px-6 py-3 text-base font-semibold text-white shadow-[0_8px_20px_rgba(37,99,235,0.28)] transition-all hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <ClipLoader color="#ffffff" size={22} />
                ) : (
                  <span>
                    {id === undefined ? 'Cadastrar Apólice' : 'Atualizar Apólice'}
                  </span>
                )}
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  )
}

export default FormApolice