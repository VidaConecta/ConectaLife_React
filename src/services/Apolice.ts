import type Apolice from "../models/Apolice"
import { api } from "./Service"

// Função listar todas as apólices

export const listarApolices = async (setApolices: Function, header: Object) => {
    const resposta = await api.get('/apolices', header)
    setApolices(resposta.data)
}

// Função listar apólice por id

export const listarApolicePorId = async (id: number, setApolice: Function, header: Object) => {
    const resposta = await api.get(`/apolices/${id}`, header)
    setApolice(resposta.data)
}

// Função cadastrar apólice

export const cadastrarApolice = async (apolice: Apolice, setApolice: Function, header: Object) => {
    const resposta = await api.post('/apolices', apolice, header)
    setApolice(resposta.data)
}

// Função atualizar apólice

export const atualizarApolice = async (apolice: Apolice, setApolice: Function, header: Object) => {
    const resposta = await api.put(`/apolices/${apolice.id}`, apolice, header)
    setApolice(resposta.data)
}

// Função deletar apólice

export const deletarApolice = async (id: number, header: Object) => {
    await api.delete(`/apolices/${id}`, header)
}

// Função validar cobertura da apólice

export const validarCoberturaApolice = async (id: number, coberturas: Object, setResultado: Function, header: Object) => {
    const resposta = await api.post(`/apolices/${id}/validar-cobertura`, coberturas, header)
    setResultado(resposta.data)
}
