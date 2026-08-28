import { Link } from "react-router-dom";

function Introducao() {
  return (
    <main className="w-full px-4 py-12 sm:px-6 md:px-8 md:py-16 bg-[#EDF5FF]">
      <div className="pointer-events-none absolute -left-40 -top-28 h-96 w-96 rounded-full bg-[#1689F5]/20 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-[#7C3AED]/20 blur-3xl" />

      <section className="relative w-full max-w-6xl mx-auto">
        <div className="p-8 rounded-2xl border border-white/70 bg-white/55 shadow-[0_20px_60px_rgba(37,99,235,0.14)] backdrop-blur-xl md:p-12">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1689F5] via-[#2563EB] to-[#7C3AED]" />

          <p className="mb-3 text-sm font-semibold tracking-widest uppercase text-[#1689F5]">
            ConnectaLife
          </p>

          <h1 className="max-w-3xl text-3xl font-bold bg-gradient-to-r from-[#126CC5] via-[#2563EB] to-[#6D28D9] bg-clip-text text-transparent md:text-5xl">
            Bem-vindo à ConnectaLife
          </h1>

          <p className="max-w-3xl mt-5 text-base leading-relaxed text-[#526581] md:text-lg">
            Gerencie clientes e apólices de maneira simples, centralizada e segura. Comece seguindo as etapas abaixo.
          </p>

          <div className="flex flex-col gap-3 mt-8 sm:flex-row">
            <Link
              to="/clientes"
              className="px-6 py-3 font-medium text-center text-white transition-all rounded-lg bg-gradient-to-r from-[#1689F5] via-[#2563EB] to-[#6D28D9] shadow-[0_8px_20px_rgba(37,99,235,0.28)] hover:-translate-y-0.5 hover:brightness-110"
            >
              Cadastrar cliente
            </Link>

            <Link
              to="/cadastrarapolice"
              className="px-6 py-3 font-medium text-center text-[#245CB2] transition-all border rounded-lg border-white/80 bg-white/50 shadow-sm backdrop-blur-md hover:-translate-y-0.5 hover:border-[#2563EB]/25 hover:bg-[#EAF2FF]/80"
            >
              Cadastrar apólice
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 mt-8 md:grid-cols-3">
          <article className="p-6 bg-white/55 border border-white/70 rounded-2xl shadow-[0_18px_50px_rgba(37,99,235,0.12)] backdrop-blur-xl">
            <span className="flex items-center justify-center w-10 h-10 mb-4 font-bold text-white rounded-full bg-gradient-to-r from-[#1689F5] to-[#2563EB] shadow-[0_8px_20px_rgba(37,99,235,0.28)]">
              1
            </span>

            <h2 className="mb-3 text-xl font-bold text-[#172B4D]">
              Cadastre o cliente
            </h2>

            <p className="leading-relaxed text-[#526581]">
              Registre os dados necessários para manter sua base de clientes completa, atualizada e organizada.
            </p>
          </article>

          <article className="p-6 bg-white/55 border border-white/70 rounded-2xl shadow-[0_18px_50px_rgba(37,99,235,0.12)] backdrop-blur-xl">
            <span className="flex items-center justify-center w-10 h-10 mb-4 font-bold text-white rounded-full bg-gradient-to-r from-[#1689F5] to-[#2563EB] shadow-[0_8px_20px_rgba(37,99,235,0.28)]">
              2
            </span>

            <h2 className="mb-3 text-xl font-bold text-[#172B4D]">
              Registre a apólice
            </h2>

            <p className="leading-relaxed text-[#526581]">
              Vincule uma apólice ao cliente e registre as principais informações sobre a proteção contratada.
            </p>
          </article>

          <article className="p-6 bg-white/55 border border-white/70 rounded-2xl shadow-[0_18px_50px_rgba(37,99,235,0.12)] backdrop-blur-xl">
            <span className="flex items-center justify-center w-10 h-10 mb-4 font-bold text-white rounded-full bg-gradient-to-r from-[#1689F5] to-[#2563EB] shadow-[0_8px_20px_rgba(37,99,235,0.28)]">
              3
            </span>

            <h2 className="mb-3 text-xl font-bold text-[#172B4D]">
              Acompanhe os registros
            </h2>

            <p className="leading-relaxed text-[#526581]">
              Consulte e atualize clientes e apólices sempre que necessário, mantendo todas as informações centralizadas.
            </p>
          </article>
        </div>

        <section className="p-8 mt-8 bg-white/55 border border-white/70 rounded-2xl shadow-[0_20px_60px_rgba(37,99,235,0.14)] backdrop-blur-xl md:p-10">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1689F5] via-[#2563EB] to-[#7C3AED]" />

          <h2 className="text-2xl font-bold text-[#172B4D]">
            Comece a utilizar a plataforma
          </h2>

          <p className="mt-4 leading-relaxed text-[#526581]">
            O primeiro passo é cadastrar o cliente. Depois, você poderá registrar as apólices relacionadas a ele e acompanhar todas as informações em um único lugar.
          </p>

          <p className="mt-4 leading-relaxed text-[#526581]">
            Utilize o menu de navegação ou os botões acima para acessar os recursos disponíveis na ConnectaLife.
          </p>
        </section>
      </section>
    </main>
  );
}

export default Introducao;