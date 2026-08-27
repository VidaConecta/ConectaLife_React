import { Link } from 'react-router-dom'
import type Cliente from '../../../models/Cliente'

interface CardClienteProps {
  cliente: Cliente
}

function CardCliente({ cliente }: CardClienteProps) {
  return (
    <div className="flex flex-col justify-between overflow-hidden border rounded-2xl">
      <header className="px-6 py-2 text-2xl font-bold text-white bg-slate-700">
        Cliente
      </header>

      <div className="flex flex-col gap-2 h-full p-6 bg-white text-slate-900">
        <p className="text-xl font-bold">{cliente.nome}</p>
        <p>CPF: {cliente.cpf}</p>
        <p>E-mail: {cliente.email}</p>
        <p>Data de nascimento: {cliente.dataNascimento}</p>
      </div>

      <div className="flex">
        <Link
          to={`/clientes/editar/${cliente.id}`}
          className="flex items-center justify-center w-full py-2 text-slate-100 bg-teal-600 hover:bg-teal-700"
        >
          Editar
        </Link>

        <Link
          to={`/clientes/deletar/${cliente.id}`}
          className="flex items-center justify-center w-full py-2 text-slate-100 bg-red-400 hover:bg-red-700"
        >
          Deletar
        </Link>
      </div>
    </div>
  )
}

export default CardCliente