import type Cliente from "./Cliente"

export default interface Apolice {
    id: number
    numeroApolice: string
    status: 'ATIVO' | 'CANCELADO' | 'SUSPENSO' | 'FINALIZADO'
    valorCobertura: number
    dataVigencia: string
    cliente: Cliente
}
