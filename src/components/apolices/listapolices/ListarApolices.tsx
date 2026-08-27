// Página que lista todas as Apólices cadastradas
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon } from '@phosphor-icons/react';
import { SyncLoader } from 'react-spinners';
import type Apolice from '../../../models/Apolice';
import { apoliceService } from '../../../services/Apolice';
import CardApolices from '../cardapolices/CardApolices';

function ListarApolices() {

	// Controla a exibição do loader enquanto as apólices são carregadas
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// Estado que guarda a lista de apólices retornada pela API
	const [apolices, setApolices] = useState<Apolice[]>([]);

	// Busca as apólices ao montar o componente e sempre que a quantidade mudar
	useEffect(() => {
		buscarApolices();
	}, [apolices.length]);

	async function buscarApolices() {
		try {
			setIsLoading(true);
			const dados = await apoliceService.listarTodos();
			setApolices(dados);
		} catch (error) {
			alert('Erro ao buscar apólices.');
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<main className="grow w-full max-w-7xl mx-auto px-4 md:px-8 pt-24 md:pt-28 pb-12 md:pb-16 flex flex-col gap-8">
			<div className="flex justify-between gap-2">
				<h1 className="text-3xl md:text-4xl font-semibold text-slate-800">
					Apólices
				</h1>
				<Link
					to='/cadastrarapolice'
					className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-5 py-3 rounded-lg hover:bg-blue-700 transition-colors w-fit"
				>
					<PlusIcon size={18} />
					Nova Apólice
				</Link>
			</div>

			{isLoading && (
				<div className="flex justify-center">
					<SyncLoader color="#312e81" size={32} />
				</div>
			)}

			{(!isLoading && apolices.length === 0) && (
				<span className="text-3xl text-center my-8">
					Nenhuma Apólice foi encontrada!
				</span>
			)}

			<div className="grid grid-cols-1 justify-items-center md:grid-cols-3 md:justify-items-stretch lg:grid-cols-4 gap-4 md:gap-6">
				{
					apolices.map((apolice) => (
						<CardApolices key={apolice.id} apolice={apolice} />
					))
				}
			</div>
		</main>
	);
}

export default ListarApolices
