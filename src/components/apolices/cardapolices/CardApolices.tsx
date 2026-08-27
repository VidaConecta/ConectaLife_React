import { Link } from "react-router-dom"
import dayjs from "dayjs"

import type Apolice from "../../../models/Apolice"

interface CardApolicesProps {
    apolice: Apolice
}

const statusStyles: Record<Apolice['status'], string> = {
    ATIVO: 'bg-emerald-100 text-emerald-700',
    SUSPENSO: 'bg-yellow-100 text-yellow-700',
    CANCELADO: 'bg-red-100 text-red-700',
    FINALIZADO: 'bg-slate-200 text-slate-700',
}

function CardApolices({ apolice }: CardApolicesProps) {
    const valorFormatado = apolice.valorCobertura.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    })

    return (
        <div className="flex flex-col overflow-hidden rounded border border-indigo-900 shadow">
            <div className="flex items-center justify-between bg-indigo-900 px-4 py-2 text-white">
                <span className="font-bold">Apólice Nº {apolice.numeroApolice}</span>

                <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyles[apolice.status]}`}>
                    {apolice.status}
                </span>
            </div>

            <div className="flex flex-1 flex-col gap-1 bg-indigo-50 px-4 py-3">
                <p className="text-slate-700">
                    Cliente: <span className="font-semibold">{apolice.cliente?.nome}</span>
                </p>

                <p className="text-slate-700">
                    Cobertura: <span className="font-semibold">{valorFormatado}</span>
                </p>

                <p className="text-sm text-slate-500">
                    Vigência: {dayjs(apolice.dataVigencia).format('DD/MM/YYYY')}
                </p>
            </div>

            <div className="flex">
                <Link
                    to={`/editarapolice/${apolice.id}`}
                    className="flex-1 bg-indigo-600 py-2 text-center font-semibold text-white transition hover:bg-indigo-700"
                >
                    Editar
                </Link>

                <Link
                    to={`/deletarapolice/${apolice.id}`}
                    className="flex-1 bg-red-500 py-2 text-center font-semibold text-white transition hover:bg-red-700"
                >
                    Deletar
                </Link>
            </div>
        </div>
    )
}

export default CardApolices
