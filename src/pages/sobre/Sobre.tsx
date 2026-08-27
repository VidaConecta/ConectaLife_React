import { Link } from 'react-router-dom'

function Sobre() {
  return (
    <main className="w-full px-4 py-12 sm:px-6 md:px-8 md:py-16">
      <section className="w-full max-w-6xl mx-auto">
        <div className="p-8 text-white rounded-2xl bg-slate-700 md:p-12">
          <p className="mb-3 text-sm font-semibold tracking-widest uppercase text-teal-300">
            ConnectaLife
          </p>

          <h1 className="max-w-3xl text-3xl font-bold md:text-5xl">
            Proteção e organização para cada etapa da sua vida.
          </h1>

          <p className="max-w-3xl mt-5 text-base leading-relaxed text-slate-200 md:text-lg">
            A ConnectaLife é uma plataforma para centralizar clientes e
            apólices de seguro em um único lugar, tornando a gestão mais
            simples, rápida e confiável.
          </p>

          <div className="flex flex-col gap-3 mt-8 sm:flex-row">
            <Link
              to="/clientes"
              className="px-6 py-3 font-medium text-center text-white rounded bg-teal-600 hover:bg-teal-700"
            >
              Ver Clientes
            </Link>

            <Link
              to="/apolices"
              className="px-6 py-3 font-medium text-center text-white border rounded border-slate-300 hover:bg-slate-600"
            >
              Ver Apólices
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 mt-8 md:grid-cols-3">
          <article className="p-6 bg-white border rounded-2xl border-slate-200">
            <h2 className="mb-3 text-xl font-bold text-slate-800">
              Gestão de clientes
            </h2>

            <p className="leading-relaxed text-slate-600">
              Cadastre, edite e consulte dados dos clientes de forma prática,
              mantendo as informações importantes sempre organizadas.
            </p>
          </article>

          <article className="p-6 bg-white border rounded-2xl border-slate-200">
            <h2 className="mb-3 text-xl font-bold text-slate-800">
              Controle de apólices
            </h2>

            <p className="leading-relaxed text-slate-600">
              Acompanhe as apólices cadastradas e mantenha o relacionamento
              entre os clientes e suas proteções sempre atualizado.
            </p>
          </article>

          <article className="p-6 bg-white border rounded-2xl border-slate-200">
            <h2 className="mb-3 text-xl font-bold text-slate-800">
              Experiência simples
            </h2>

            <p className="leading-relaxed text-slate-600">
              Uma interface direta, responsiva e pensada para facilitar as
              tarefas do dia a dia na administração de seguros.
            </p>
          </article>
        </div>

        <section className="p-8 mt-8 bg-white border rounded-2xl border-slate-200 md:p-10">
          <h2 className="text-2xl font-bold text-slate-800">
            Nossa proposta
          </h2>

          <p className="mt-4 leading-relaxed text-slate-600">
            A ConnectaLife conecta pessoas, informações e proteção. O objetivo
            é oferecer uma base organizada para o gerenciamento de clientes e
            apólices, ajudando você a encontrar dados, manter registros e
            realizar operações com mais agilidade.
          </p>

          <p className="mt-4 leading-relaxed text-slate-600">
            Use o menu de navegação para acessar a listagem de clientes,
            cadastrar novos registros ou gerenciar as apólices disponíveis.
          </p>
        </section>
      </section>
    </main>
  )
}

export default Sobre