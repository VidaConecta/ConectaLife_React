import { BrowserRouter, Route, Routes } from "react-router-dom";

import Footer from "./components/footer/footer";
import Navbar from "./components/navbar/Navbar";

import ListarClientes from "./components/clientes/listaclientes/ListarClientes";

import DeletarApolice from "./pages/apolices/deletarapolice/DeletarApolice";
import FormApolice from "./pages/apolices/formapolice/FormApolice";
import ListarApolices from "./pages/apolices/listarapolices/ListarApolices";
import Home from "./pages/home/Home";
import FormCliente from "./components/clientes/formcliente/FormCliente";

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />

                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/apolices" element={<ListarApolices />} />
                    <Route path="/cadastrarapolice" element={<FormApolice />} />
                    <Route path="/editarapolice/:id" element={<FormApolice />} />
                    <Route path="/deletarapolice/:id" element={<DeletarApolice />} />

                    <Route path="/cadastrarcliente" element={<FormCliente />} />
                    <Route
                        path="/clientes"
                        element={<ListarClientes />}
                    />

                    <Route
                        path="/clientes/cadastrar"
                        element={<FormCliente />}
                    />

                    <Route
                        path="/clientes/editar/:id"
                        element={<FormCliente />}
                    />
                </Routes>

                <Footer />
            </BrowserRouter>
        </>
    );
}

export default App;
