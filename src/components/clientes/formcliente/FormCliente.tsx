import dayjs from 'dayjs'
import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent
} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type Cliente from '../../../models/Cliente'
import { clienteService } from '../../../services/ClienteService'

function FormCliente() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const [cliente, setCliente] = useState<Cliente>({
    nome: '',
    dataNascimento: '',
    cpf: '',
    email: ''
  })

  const [erro, setErro] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (id !== undefined) {
      buscarClientePorId(id)
    }
  }, [id])

  async function buscarClientePorId(idCliente: string) {
    try {
      setIsLoading(true)
      setErro('')

      const clienteEncontrado = await clienteService.buscarPorId(
        Number(idCliente)
      )

      setCliente(clienteEncontrado)
    } catch (error) {
      console.error('Erro ao buscar cliente:', error)
      setErro('Erro ao carregar os dados do cliente.')
    } finally {
      setIsLoading(false)
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErro('')

    const dataNascimento = dayjs(cliente.dataNascimento)
    const idade = dayjs().diff(dataNascimento, 'year')

    if (!dataNascimento.isValid() || idade < 18) {
      setErro('O cliente deve ser maior de idade (mínimo 18 anos).')
      return
    }

    try {
      setIsLoading(true)

      if (id !== undefined) {
        const clienteAtualizado = await clienteService.atualizar(
          Number(id),
          cliente
        )

        alert(`Cliente ${clienteAtualizado.nome} atualizado com sucesso!`)
      } else {
        const novoCliente = await clienteService.cadastrar(cliente)

        alert(`Cliente ${novoCliente.nome} cadastrado com sucesso!`)
      }

      navigate('/clientes')
    } catch (error) {
      console.error('Erro ao salvar cliente:', error)
      setErro('Erro ao salvar cliente na API.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex flex-col items-center justify-center px-4 py-8 mx-auto">
      <h1 className="my-6 text-3xl text-center md:text-4xl">
        {id === undefined ? 'Cadastrar Cliente' : 'Editar Cliente'}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-md gap-4"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="nome">Nome:</label>

          <input
            type="text"
            name="nome"
            id="nome"
            value={cliente.nome}
            onChange={handleChange}
            className="p-2 text-base bg-white border-2 rounded border-slate-700"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="dataNascimento">Data de Nascimento:</label>

          <input
            type="date"
            name="dataNascimento"
            id="dataNascimento"
            value={cliente.dataNascimento}
            onChange={handleChange}
            className="p-2 text-base bg-white border-2 rounded border-slate-700"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="cpf">CPF (apenas números):</label>

          <input
            type="text"
            name="cpf"
            id="cpf"
            value={cliente.cpf}
            onChange={handleChange}
            maxLength={11}
            pattern="[0-9]{11}"
            title="Digite exatamente 11 números."
            className="p-2 text-base bg-white border-2 rounded border-slate-700"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">E-mail:</label>

          <input
            type="email"
            name="email"
            id="email"
            value={cliente.email}
            onChange={handleChange}
            className="p-2 text-base bg-white border-2 rounded border-slate-700"
            required
          />
        </div>

        {erro && (
          <p className="font-bold text-red-600">
            {erro}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate('/clientes')}
            disabled={isLoading}
            className="w-full py-2 text-white bg-red-400 rounded hover:bg-red-700 disabled:opacity-60"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 text-white bg-teal-600 rounded hover:bg-teal-700 disabled:opacity-60"
          >
            {isLoading
              ? 'Salvando...'
              : id === undefined
                ? 'Cadastrar Cliente'
                : 'Atualizar Cliente'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormCliente