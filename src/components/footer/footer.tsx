import {
  EnvelopeSimpleIcon,
  HeartIcon,
  InfoIcon,
  ShieldCheckIcon,
  UserIcon
} from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

function Footer() {
  const anoAtual = new Date().getFullYear()

  return (
    <footer className="w-full mt-auto text-slate-200 border-t border-purple-500/30 bg-gradient-to-r from-purple-950 via-slate-950 to-cyan-950">
      <div className="container grid grid-cols-1 gap-8 px-6 py-10 mx-auto md:grid-cols-3 md:px-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <HeartIcon
              size={26}
              weight="fill"
              className="text-pink-400"
            />

            <p className="text-xl font-bold tracking-wide text-white">
              ConectaLife
            </p>
          </div>

          <p className="max-w-sm text-sm leading-6 text-slate-300">
            Seguro de vida simples e acessível para estudantes e
            desenvolvedores.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="flex items-center gap-2 text-lg font-bold text-cyan-200">
            <ShieldCheckIcon size={22} weight="bold" />
            Navegação
          </p>

          <Link
            to="/"
            className="w-fit text-sm transition-colors hover:text-cyan-200"
          >
            Início
          </Link>

          <Link
            to="/clientes"
            className="flex items-center gap-2 w-fit text-sm transition-colors hover:text-cyan-200"
          >
            <UserIcon size={17} />
            Clientes
          </Link>

          <Link
            to="/apolices"
            className="w-fit text-sm transition-colors hover:text-cyan-200"
          >
            Apólices
          </Link>

          <Link
            to="/sobre"
            className="flex items-center gap-2 w-fit text-sm transition-colors hover:text-cyan-200"
          >
            <InfoIcon size={17} />
            Sobre o projeto
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <p className="flex items-center gap-2 text-lg font-bold text-cyan-200">
            <EnvelopeSimpleIcon size={22} weight="bold" />
            Contato
          </p>

          <a
            href="mailto:contato@conectalife.com"
            className="w-fit text-sm transition-colors hover:text-cyan-200"
          >
            contato@conectalife.com
          </a>

          <p className="text-sm text-slate-300">
            (00) 0000-0000
          </p>

          <p className="text-sm leading-6 text-slate-300">
            Consulte sua apólice na área de clientes.
          </p>
        </div>
      </div>

      <div className="px-4 py-4 text-sm text-center border-t border-white/10 text-slate-300">
        ConectaLife &copy; {anoAtual} — Todos os direitos reservados
      </div>
    </footer>
  )
}

export default Footer