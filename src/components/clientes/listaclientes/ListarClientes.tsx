import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SyncLoader } from 'react-spinners'
import type Cliente from '../../../models/Cliente'
import { clienteService } from '../../../services/ClienteService'
import CardCliente from '../cardclientes/CardCliente'

function ListarClientes() {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [erro, setErro] = useState('')

  useEffect(() => {
    buscarClientes()
  }, [])

  async function buscarClientes() {
    try {
      setIsLoading(true)
      setErro('')

      const dados = await clienteService.listarTodos()
      setClientes(dados)
    } catch (error) {
      console.error('Erro ao buscar clientes:', error)
      setErro('Erro ao carregar os clientes.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center w-full overflow-x-hidden">
      <div className="box-border w-full px-4 py-6 mx-auto mt-8 mb-4 max-w-7xl sm:px-6 md:px-8 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-4 mb-6 sm:flex-row">
          <h1 className="text-3xl text-center md:text-4xl">
            Clientes
          </h1>

          <button
            type="button"
            onClick={() => navigate('/clientes/cadastrar')}
            className="px-6 py-2 text-white rounded bg-teal-600 hover:bg-teal-700"
          >
            Cadastrar Cliente
          </button>
        </div>

        {isLoading && (
          <div className="flex justify-center py-8">
            <SyncLoader color="#00aebd" size={20} />
          </div>
        )}

        {!isLoading && erro && (
          <p className="my-8 font-bold text-center text-red-600">
            {erro}
          </p>
        )}

        {!isLoading && !erro && clientes.length === 0 && (
          <p className="block my-8 text-3xl text-center">
            Nenhum cliente foi encontrado!
          </p>
        )}

        <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 md:mb-0">
          {clientes.map((cliente) => (
            <CardCliente key={cliente.id} cliente={cliente} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ListarClientes