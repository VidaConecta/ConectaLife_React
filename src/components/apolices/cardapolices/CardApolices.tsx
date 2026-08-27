import { Link } from "react-router-dom"
import dayjs from "dayjs"

import type Apolice from "../../../models/Apolice"

interface CardApolicesProps {
    apolice: Apolice
}

const statusStyles: Record<Apolice['status'], string> = {
    ATIVO: 'bg-teal-100 text-teal-700',
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
        <div className="flex flex-col gap-2 rounded-2xl border-2 border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-800">
                    Apólice Nº {apolice.numeroApolice}
                </h3>

                <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyles[apolice.status]}`}>
                    {apolice.status}
                </span>
            </div>

            <p className="text-slate-600">
                Cliente: <span className="font-semibold">{apolice.cliente?.nome}</span>
            </p>

            <p className="text-slate-600">
                Cobertura: <span className="font-semibold">{valorFormatado}</span>
            </p>

            <p className="text-slate-600">
                Vigência até: <span className="font-semibold">{dayjs(apolice.dataVigencia).format('DD/MM/YYYY')}</span>
            </p>

            <div className="mt-3 flex justify-end gap-3">
                <Link
                    to={`/editarapolice/${apolice.id}`}
                    className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-bold text-white transition duration-200 hover:bg-teal-700"
                >
                    Editar
                </Link>

                <Link
                    to={`/deletarapolice/${apolice.id}`}
                    className="rounded-lg bg-red-400 px-4 py-2 text-sm font-bold text-white transition duration-200 hover:bg-red-700"
                >
                    Excluir
                </Link>
            </div>
        </div>
    )
}

export default CardApolices
