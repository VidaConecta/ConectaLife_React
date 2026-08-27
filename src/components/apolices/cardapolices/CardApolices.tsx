import { PencilSimpleIcon, TrashSimpleIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import type Apolice from "../../../models/Apolice";

interface CardApolicesProps {
	apolice: Apolice
}

function CardApolices({ apolice }: CardApolicesProps) {
	return (
		<div className="flex flex-col w-full max-w-sm md:max-w-64 bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-all">
			<div className="p-4 flex flex-col gap-1">
				<h3 className="text-base font-semibold text-slate-800 text-center line-clamp-2">
					Apólice Nº {apolice.numeroApolice}
				</h3>
				<p className="text-sm text-slate-500 text-center">{apolice.cliente?.nome}</p>
				<p className="text-lg font-semibold text-slate-800 text-center mt-2">
					{apolice.valorCobertura.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
				</p>
				<span className="text-xs font-medium text-blue-700 uppercase tracking-wide text-center">
					{apolice.status}
				</span>
				<div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-200">
					<Link
						to={`/editarapolice/${apolice.id}`}
						className="flex items-center justify-center gap-1 flex-1 text-sm font-medium text-blue-700 hover:bg-blue-50 py-2 rounded-lg transition-colors"
					>
						<PencilSimpleIcon size={18} />
						Editar
					</Link>
					<Link
						to={`/deletarapolice/${apolice.id}`}
						className="flex items-center justify-center gap-1 flex-1 text-sm font-medium text-red-600 hover:bg-red-50 py-2 rounded-lg transition-colors"
					>
						<TrashSimpleIcon size={18} />
						Excluir
					</Link>
				</div>
			</div>
		</div>
	);
}

export default CardApolices
