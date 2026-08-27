import { ListIcon, UserIcon } from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import { useState } from "react"
 
function Navbar() {
 
    const [menuAberto, setMenuAberto] = useState(false);
 
    return (
        <>
            {/* Navbar fixa no topo, visível em todas as telas */}
            <div className="w-full flex justify-center py-4 text-white bg-purple-950 md:py-2">
                <div className="container flex items-center justify-between mx-6 mt-2 text-lg">
                    {/* Logo da loja, sempre visível, redireciona para Home */}
                    <Link to="/">
                        <img
                            src="https://ik.imagekit.io/lojagames/Conecta.jpg"
                            alt="Logo"
                            className="w-50 md:w-60 active:scale-95 transition-transform"
                        />
                    </Link>
 
                    {/* Menu de navegação desktop/tablet */}
                    <div className="items-center hidden gap-4 py-4 md:flex">
                        <Link to="/apolices" className="font-[Fredoka] hover:underline">
                            Apolices
                        </Link>
                        <Link to="/clientes" className="font-[Fredoka] hover:underline">
                            Clientes
                        </Link>
                        <Link to="/cadastrarcliente" className="font-[Fredoka] hover:underline">
                            Cadastrar cliente
                        </Link>
 
                        <Link
                            to="/perfil"
                            aria-label="Minha conta"
                            className="hover:opacity-80 transition-opacity"
                        >
                            <UserIcon size={32} weight="bold" />
                        </Link>
 
                    </div>
 
                    {/* Botão hambúrguer (mobile) */}
                    <button
                        className="md:hidden text-white p-2"
                        aria-label="Abrir menu"
                        onClick={() => setMenuAberto((open) => !open)}
                    >
                        <ListIcon size={28} />
                    </button>
                </div>
            </div>
 
            {/* Menu mobile */}
            <div
                className={`${menuAberto ? "flex" : "hidden"} md:hidden flex-col gap-3 w-full bg-purple-950 text-white px-6 py-4 border-t border-purple-900`}           >
                <Link
                    to="/apolices"
                    className="hover:underline"
                >
                    Apolices
                </Link>
                <Link
                    to="/clientes"
                    className="hover:underline"
                >
                    Clientes
                </Link>
                <Link
                    to="/cadastrarcliente"
                    className="hover:underline"
                >
                    Cadastrar cliente
                </Link>
                <Link
                    to="/perfil"
                    className="flex items-center gap-2 hover:underline"
                >
                    <UserIcon size={24} weight="bold" />
                    Minha conta
                </Link>
 
            </div>
        </>
    )
}
 
export default Navbar