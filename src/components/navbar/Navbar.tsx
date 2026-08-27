import { Link } from 'react-router-dom'
import { useState } from 'react'
import {
  HouseIcon,
  InfoIcon,
  ListIcon,
  UserIcon
} from '@phosphor-icons/react'

function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false)

  function fecharMenu() {
    setMenuAberto(false)
  }

  return (
    <>
      <header className="w-full border-b border-purple-500/30 bg-gradient-to-r from-purple-950 via-slate-950 to-cyan-950 text-white shadow-lg shadow-purple-950/40">
        <div className="container flex items-center justify-between px-4 py-3 mx-auto md:px-6">
          <Link
            to="/"
            onClick={fecharMenu}
            className="flex items-center gap-3 transition-transform hover:scale-[1.02] active:scale-95"
            aria-label="Ir para a página inicial"
          >
            <img
              src="https://ik.imagekit.io/lojagames/Batimentos%20Cardiacos.png"
              alt="Batimento cardíaco"
              className="object-contain w-16 h-8 md:w-20 md:h-10"
            />

            <div className="hidden sm:block">
              <p className="text-lg font-bold tracking-wide text-cyan-200 md:text-xl">
                ConectaLife
              </p>

              <p className="text-xs text-purple-200">
                Seguro de vida conectado a você
              </p>
            </div>
          </Link>

          <nav
            className="items-center hidden gap-2 md:flex"
            aria-label="Navegação principal"
          >
            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg transition-colors hover:bg-white/10 hover:text-cyan-200"
            >
              <HouseIcon size={20} weight="bold" />
              Início
            </Link>

            <Link
              to="/clientes"
              className="flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg transition-colors hover:bg-white/10 hover:text-cyan-200"
            >
              <UserIcon size={20} weight="bold" />
              Clientes
            </Link>

            <Link
              to="/cadastrarcliente"
              className="px-4 py-2 text-sm font-bold rounded-lg bg-cyan-600 transition-colors shadow-md shadow-cyan-950/40 hover:bg-cyan-500"
            >
              Cadastrar cliente
            </Link>

            <Link
              to="/apolices"
              className="flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg transition-colors hover:bg-white/10 hover:text-cyan-200"
            >
              Apólices
            </Link>

            <Link
              to="/sobre"
              className="flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg transition-colors hover:bg-white/10 hover:text-cyan-200"
            >
              <InfoIcon size={20} weight="bold" />
              <span>Sobre</span>
            </Link>
          </nav>

          <button
            type="button"
            className="p-2 text-white rounded-lg transition-colors md:hidden hover:bg-white/10"
            aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuAberto}
            onClick={() => setMenuAberto((aberto) => !aberto)}
          >
            <ListIcon size={28} weight="bold" />
          </button>
        </div>
      </header>

      <nav
        className={`${menuAberto ? 'flex' : 'hidden'} flex-col w-full gap-2 px-4 py-4 text-white border-b border-purple-500/30 bg-slate-950 md:hidden`}
        aria-label="Navegação mobile"
      >
        <Link
          to="/"
          onClick={fecharMenu}
          className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-purple-900/50"
        >
          <HouseIcon size={20} weight="bold" />
          Início
        </Link>

        <Link
          to="/clientes"
          onClick={fecharMenu}
          className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-purple-900/50"
        >
          <UserIcon size={20} weight="bold" />
          Clientes
        </Link>

        <Link
          to="/cadastrarcliente"
          onClick={fecharMenu}
          className="px-4 py-3 font-bold text-center rounded-lg transition-colors bg-cyan-600 hover:bg-cyan-500"
        >
          Cadastrar cliente
        </Link>

        <Link
          to="/apolices"
          onClick={fecharMenu}
          className="px-4 py-3 rounded-lg transition-colors hover:bg-purple-900/50"
        >
          Apólices
        </Link>

        <Link
          to="/sobre"
          onClick={fecharMenu}
          className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-purple-900/50"
        >
          <InfoIcon size={20} weight="bold" />
          Sobre o projeto
        </Link>
      </nav>
    </>
  )
}

export default Navbar