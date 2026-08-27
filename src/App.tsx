import { Routes, Route, BrowserRouter } from "react-router-dom";
 
import Navbar from "./components/navbar/Navbar";
 
import Home from "./pages/home/Home";
import ListarApolices from "./pages/apolices/listarapolices/ListarApolices";
import FormApolice from "./pages/apolices/formapolice/FormApolice";
import DeletarApolice from "./pages/apolices/deletarapolice/DeletarApolice";
import { FormCliente } from "./components/formcliente/FormCliente";
import Footer from "./components/footer/Footer";
import { ListIcon, UserIcon } from "@phosphor-icons/react";
 
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
                </Routes>
 
                <Footer />
            </BrowserRouter>
        </>
    );
}
 
export default App;
 