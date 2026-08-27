import type Cliente from "./Cliente"
import type Usuario from "./Usuario"

export default interface Apolice {
    id: number
    numeroApolice: string
    status: 'ATIVO' | 'CANCELADO' | 'SUSPENSO' | 'FINALIZADO'
    valorCobertura: number
    dataVigencia: string
    cliente: Cliente
    usuario: Usuario
}
