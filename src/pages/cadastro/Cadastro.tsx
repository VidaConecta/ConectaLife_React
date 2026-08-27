import { useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import dayjs from "dayjs"

import { FaUserPlus, FaXmark } from "react-icons/fa6"

function Cadastro() {
    const navigate = useNavigate()

    const [usuario, setUsuario] = useState<Usuario>({
        id: 0,
        nome: '',
        email: '',
        senha: '',
        dataNascimento: '',
        cpf: '',
    })

    const [confirmarSenha, setConfirmarSenha] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [mensagem, setMensagem] = useState<string>('')
    const [mostrarModal, setMostrarModal] = useState<boolean>(false)
    const [cadastroRealizado, setCadastroRealizado] = useState<boolean>(false)

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value,
        })
    }

    function retornar() {
        navigate('/')
    }

    function possuiIdadeMinima(dataNascimento: string) {
        return dayjs().diff(dayjs(dataNascimento), 'year') >= 18
    }

    function exibirMensagem(texto: string) {
        setMensagem(texto)
        setCadastroRealizado(false)
        setMostrarModal(true)
    }

    function fecharModal() {
        setMostrarModal(false)

        if (cadastroRealizado) {
            navigate('/')
        }
    }

    async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (usuario.senha.length < 8) {
            exibirMensagem('A senha deve ter no mínimo 8 caracteres!')
            return
        }

        if (usuario.senha !== confirmarSenha) {
            exibirMensagem('As senhas não coincidem!')
            return
        }

        if (!possuiIdadeMinima(usuario.dataNascimento)) {
            exibirMensagem('É necessário ter 18 anos ou mais para se cadastrar!')
            return
        }

        setIsLoading(true)

        try {
            await cadastrarUsuario('/usuarios/cadastrar', usuario, setUsuario)

            setMensagem('Usuário cadastrado com sucesso!')
            setCadastroRealizado(true)
            setMostrarModal(true)
        } catch (error) {
            exibirMensagem('Erro ao cadastrar o usuário!')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen place-items-center font-bold">
                <div
                    className="bg-[url('https://ik.imagekit.io/5eywr3ioq/Imagens%20Projeto%20Integrador/cadastrocoectalife.jpg')]
                    lg:block hidden bg-no-repeat w-full min-h-screen bg-cover bg-center"
                ></div>

                <form
                    className="flex justify-center items-center flex-col w-full max-w-md px-6 sm:px-8 py-10 lg:py-3 gap-3"
                    onSubmit={cadastrarNovoUsuario}
                >
                    <h2 className="text-slate-900 text-3xl sm:text-4xl lg:text-5xl text-center">
                        Cadastrar
                    </h2>

                    <div className="flex flex-col w-full">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            placeholder="Nome"
                            className="border-2 border-slate-700 rounded p-2 w-full"
                            required
                            value={usuario.nome}
                            onChange={atualizarEstado}
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="usuario">Usuário</label>
                        <input
                            type="email"
                            id="usuario"
                            name="usuario"
                            placeholder="email@exemplo.com"
                            className="border-2 border-slate-700 rounded p-2 w-full"
                            required
                            value={usuario.usuario}
                            onChange={atualizarEstado}
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="foto">
                            Foto (URL){" "}
                            <span className="text-slate-400 font-normal">
                                opcional
                            </span>
                        </label>

                        <input
                            id="foto"
                            name="foto"
                            type="url"
                            className="border-2 border-slate-700 rounded p-2 w-full"
                            placeholder="https://..."
                            value={usuario.foto}
                            onChange={atualizarEstado}
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="dataNascimento">
                            Data de Nascimento
                        </label>

                        <input
                            type="date"
                            id="dataNascimento"
                            name="dataNascimento"
                            className="border-2 border-slate-700 rounded p-2 w-full"
                            required
                            value={usuario.dataNascimento}
                            onChange={atualizarEstado}
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="senha">Senha</label>

                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Mínimo de 8 caracteres"
                            className="border-2 border-slate-700 rounded p-2 w-full"
                            required
                            minLength={8}
                            value={usuario.senha}
                            onChange={atualizarEstado}
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="confirmarSenha">Confirmar Senha</label>

                        <input
                            type="password"
                            id="confirmarSenha"
                            name="confirmarSenha"
                            placeholder="Repita sua senha"
                            className="border-2 border-slate-700 rounded p-2 w-full"
                            required
                            minLength={8}
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row justify-around w-full gap-3 sm:gap-8">
                        <button
                            type="button"
                            onClick={retornar}
                            disabled={isLoading}
                            className="rounded-lg text-white bg-red-400 hover:bg-red-700
                            w-full sm:w-1/2 py-2 transition duration-200
                            disabled:cursor-not-allowed disabled:opacity-60
                            flex items-center justify-center gap-2"
                        >
                            <FaXmark size={18} />
                            <span>Cancelar</span>
                        </button>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="rounded-lg text-white bg-teal-500 hover:bg-teal-700
                            w-full sm:w-1/2 py-2 flex items-center justify-center gap-2
                            transition duration-200 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isLoading ? (
                                <>
                                    <ClipLoader color="#ffffff" size={20} />
                                    <span>Cadastrando...</span>
                                </>
                            ) : (
                                <>
                                    <FaUserPlus size={18} />
                                    <span>Cadastrar</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {mostrarModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-800">
                                {cadastroRealizado ? 'Cadastro concluído' : 'Atenção'}
                            </h2>

                            <button
                                type="button"
                                onClick={fecharModal}
                                className="flex h-9 w-9 items-center justify-center rounded-full
                                text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                aria-label="Fechar mensagem"
                            >
                                <FaXmark size={18} />
                            </button>
                        </div>

                        <p className="mb-6 text-slate-600">
                            {mensagem}
                        </p>

                        <button
                            type="button"
                            onClick={fecharModal}
                            className="w-full rounded-lg bg-teal-500 py-3 font-bold text-white
                            transition duration-200 hover:bg-teal-700
                            focus:outline-none focus:ring-4 focus:ring-teal-300"
                        >
                            {cadastroRealizado ? 'Ir para login' : 'Entendi'}
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Cadastro