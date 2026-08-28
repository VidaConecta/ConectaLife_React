import { Link } from "react-router-dom";

function Introducao() {
    return (
        <main className="w-full px-4 py-12 sm:px-6 md:px-8 md:py-16">
            <section className="w-full max-w-6xl mx-auto">
                <div className="p-8 text-white rounded-2xl bg-slate-700 md:p-12">
                    <p className="mb-3 text-sm font-semibold tracking-widest uppercase text-teal-300">
                        ConnectaLife
                    </p>

                    <h1 className="max-w-3xl text-3xl font-bold md:text-5xl">
                        Bem-vindo à ConnectaLife
                    </h1>

                    <p className="max-w-3xl mt-5 text-base leading-relaxed text-slate-200 md:text-lg">
                        Gerencie clientes e apólices de maneira simples,
                        centralizada e segura. Comece seguindo as etapas abaixo.
                    </p>

                    <div className="flex flex-col gap-3 mt-8 sm:flex-row">
                        <Link
                            to="/clientes"
                            className="px-6 py-3 font-medium text-center text-white transition-colors rounded bg-teal-600 hover:bg-teal-700"
                        >
                            Cadastrar cliente
                        </Link>

                        <Link
                            to="/apolices"
                            className="px-6 py-3 font-medium text-center text-white transition-colors border rounded border-slate-300 hover:bg-slate-600"
                        >
                            Cadastrar apólice
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-5 mt-8 md:grid-cols-3">
                    <article className="p-6 bg-white border rounded-2xl border-slate-200">
                        <span className="flex items-center justify-center w-10 h-10 mb-4 font-bold text-white rounded-full bg-teal-600">
                            1
                        </span>

                        <h2 className="mb-3 text-xl font-bold text-slate-800">
                            Cadastre o cliente
                        </h2>

                        <p className="leading-relaxed text-slate-600">
                            Registre os dados necessários para manter sua base
                            de clientes completa, atualizada e organizada.
                        </p>
                    </article>

                    <article className="p-6 bg-white border rounded-2xl border-slate-200">
                        <span className="flex items-center justify-center w-10 h-10 mb-4 font-bold text-white rounded-full bg-teal-600">
                            2
                        </span>

                        <h2 className="mb-3 text-xl font-bold text-slate-800">
                            Registre a apólice
                        </h2>

                        <p className="leading-relaxed text-slate-600">
                            Vincule uma apólice ao cliente e registre as
                            principais informações sobre a proteção contratada.
                        </p>
                    </article>

                    <article className="p-6 bg-white border rounded-2xl border-slate-200">
                        <span className="flex items-center justify-center w-10 h-10 mb-4 font-bold text-white rounded-full bg-teal-600">
                            3
                        </span>

                        <h2 className="mb-3 text-xl font-bold text-slate-800">
                            Acompanhe os registros
                        </h2>

                        <p className="leading-relaxed text-slate-600">
                            Consulte e atualize clientes e apólices sempre que
                            necessário, mantendo todas as informações
                            centralizadas.
                        </p>
                    </article>
                </div>

                <section className="p-8 mt-8 bg-white border rounded-2xl border-slate-200 md:p-10">
                    <h2 className="text-2xl font-bold text-slate-800">
                        Comece a utilizar a plataforma
                    </h2>

                    <p className="mt-4 leading-relaxed text-slate-600">
                        O primeiro passo é cadastrar o cliente. Depois, você
                        poderá registrar as apólices relacionadas a ele e
                        acompanhar todas as informações em um único lugar.
                    </p>

                    <p className="mt-4 leading-relaxed text-slate-600">
                        Utilize o menu de navegação ou os botões acima para
                        acessar os recursos disponíveis na ConnectaLife.
                    </p>
                </section>
            </section>
        </main>
    );
}

export default Introducao;
