import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NumericFormat } from 'react-number-format';
import { ClipLoader } from "react-spinners";
import type Apolice from "../../../models/Apolice";
import type Cliente from "../../../models/Cliente";
import { apoliceService } from "../../../services/Apolice";
import { clienteService } from "../../../services/ClienteService";

// Formulário usado tanto para cadastrar quanto para editar uma Apólice
function FormApolice() {

	const navigate = useNavigate();

	const [apolice, setApolice] = useState<Apolice>({} as Apolice);
	const [clientes, setClientes] = useState<Cliente[]>([]);
	const [clienteSelecionado, setClienteSelecionado] = useState<Cliente>({} as Cliente);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { id } = useParams<{ id: string }>();

	async function buscarPorId(id: string) {
		try {
			const dados = await apoliceService.buscarPorId(Number(id));
			setApolice(dados);
		} catch (error) {
			alert('Erro ao buscar a apólice.');
		}
	}

	async function buscarClientes() {
		try {
			const dados = await clienteService.listarTodos();
			setClientes(dados);
		} catch (error) {
			alert('Erro ao buscar clientes.');
		}
	}

	useEffect(() => {
		buscarClientes();
	}, []);

	useEffect(() => {
		if (id !== undefined) {
			buscarPorId(id);
		}
	}, [id]);

	useEffect(() => {
		if (apolice.cliente !== undefined) {
			setClienteSelecionado(apolice.cliente);
		}
	}, [apolice]);

	useEffect(() => {
		setApolice({
			...apolice,
			cliente: clienteSelecionado,
		});
	}, [clienteSelecionado]);

	function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		setApolice({
			...apolice,
			[e.target.name]: e.target.value,
		});
	}

	function atualizarValorCobertura(valor: number | undefined) {
		setApolice({
			...apolice,
			valorCobertura: valor ?? 0,
		});
	}

	function atualizarCliente(e: ChangeEvent<HTMLSelectElement>) {
		const cliente = clientes.find((c) => c.id === Number(e.target.value));
		if (cliente !== undefined) {
			setClienteSelecionado(cliente);
		}
	}

	function retornar() {
		navigate('/apolices');
	}

	async function gerarNovaApolice(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setIsLoading(true);

		if (id !== undefined) {
			try {
				await apoliceService.atualizar(Number(id), apolice);
				alert('Apólice atualizada com sucesso!');
			} catch (error) {
				alert('Erro ao atualizar a apólice.');
			}
		} else {
			try {
				await apoliceService.cadastrar(apolice);
				alert('Apólice cadastrada com sucesso!');
			} catch (error) {
				alert('Erro ao cadastrar a apólice.');
			}
		}

		setIsLoading(false);
		retornar();
	}

	return (
		<main className="grow w-full max-w-3xl mx-auto px-4 md:px-8 py-20 md:py-24 flex flex-col gap-8">
			<div className="flex flex-col gap-2">
				<h1 className="text-3xl md:text-4xl font-semibold text-slate-800 text-center">
					{id === undefined ? 'Cadastrar Apólice' : 'Editar Apólice'}
				</h1>
			</div>

			<form
				className="flex flex-col gap-5 bg-white border border-slate-200 rounded-lg p-6 md:p-8"
				onSubmit={gerarNovaApolice}
			>
				<div className="flex flex-col gap-2">
					<label htmlFor="numeroApolice" className="text-sm font-medium text-slate-700">
						Número da Apólice
					</label>
					<input
						id="numeroApolice"
						name="numeroApolice"
						type="text"
						required
						value={apolice.numeroApolice ?? ''}
						onChange={atualizarEstado}
						className="border border-slate-300 rounded-lg px-4 py-2 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
						placeholder="Número da apólice"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="status" className="text-sm font-medium text-slate-700">
						Status
					</label>
					<select
						id="status"
						name="status"
						value={apolice.status ?? ''}
						onChange={atualizarEstado}
						className="border border-slate-300 rounded-lg px-4 py-2 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
					>
						<option value="" disabled>Selecione um status</option>
						<option value="ATIVO">Ativo</option>
						<option value="SUSPENSO">Suspenso</option>
						<option value="CANCELADO">Cancelado</option>
						<option value="FINALIZADO">Finalizado</option>
					</select>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="valorCobertura" className="text-sm font-medium text-slate-700">
						Valor da Cobertura (R$)
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
						onValueChange={(values) => atualizarValorCobertura(values.floatValue)}
						className="border border-slate-300 rounded-lg px-4 py-2 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
						placeholder="R$ 0,00"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="dataVigencia" className="text-sm font-medium text-slate-700">
						Vigência
					</label>
					<input
						id="dataVigencia"
						name="dataVigencia"
						type="date"
						required
						value={apolice.dataVigencia ?? ''}
						onChange={atualizarEstado}
						className="border border-slate-300 rounded-lg px-4 py-2 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="cliente" className="text-sm font-medium text-slate-700">
						Cliente
					</label>
					<select
						id="cliente"
						name="cliente"
						value={clienteSelecionado.id ?? ''}
						onChange={atualizarCliente}
						className="border border-slate-300 rounded-lg px-4 py-2 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
					>
						<option value="" disabled>Selecione um Cliente</option>
						{clientes.map((cliente) => (
							<option key={cliente.id} value={cliente.id}>
								{cliente.nome}
							</option>
						))}
					</select>
				</div>

				<div className="flex items-center justify-center gap-3 mt-2">
					<button
						type="submit"
						disabled={isLoading}
						className="bg-blue-600 text-white text-base px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-60 flex items-center justify-center min-w-40"
					>
						{isLoading ?
							<ClipLoader color="#ffffff" size={24} /> :
							<span>{id === undefined ? 'Cadastrar Apólice' : 'Atualizar'}</span>
						}
					</button>
					<button
						type="button"
						onClick={retornar}
						className="text-base px-6 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors font-medium"
					>
						Cancelar
					</button>
				</div>
			</form>
		</main>
	)
}

export default FormApolice
