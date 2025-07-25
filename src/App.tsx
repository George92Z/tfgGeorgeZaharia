import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./home";
import Login from "./login";
import Register from "./register";
import Productos from "./Productos";
import Perfil from "./Perfil";
import Cesta from "./cesta";
import Pedidos from "./Pedidos";
import ProtectedRoute from "./ProtectedRoute";
import PedidosAdmin from "./PedidosAdmin";
import Footer from "./Footer";
import Contacto from "./contacto";
import QuienesSomos from "./QuienesSomos";
function App() {
  return (
    <BrowserRouter>
      {/* Layout general con min-h-screen y flex para anclar el footer */}
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <Routes>
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Productos />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/MiCesta" element={<Cesta />} />
            <Route path="/MisPedidos" element={<Pedidos />} />
            <Route path="/Contacto" element={<Contacto />} />
            <Route path="/quienes-somos" element={<QuienesSomos />} />
            <Route
              path="/PedidosAdmin"
              element={
                <ProtectedRoute>
                  <PedidosAdmin />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        {/* El footer siempre abajo */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
