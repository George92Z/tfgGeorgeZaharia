import { useState, useEffect } from "react";
import Filtro from "./Filtro";
import TablaUsuarios from "./tablaPaginada";
import ModalDetalleUsuario from "./modalDetalleUsuario";
import NavbarPage from "./navbar";
export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  pwd: string;
  direccion: string;
  rol: number;
  foto:string;
}

function Home() {

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const fetchUsuarios = (filtros?: { email?: string; nombre?: string }) => {
    let url = "/api/usuarios/";
    if (filtros) {
      const params = new URLSearchParams();
      if (filtros.email) params.append("email", filtros.email);
      if (filtros.nombre) params.append("nombre", filtros.nombre);
      url += `?${params.toString()}`;
    }
    fetch(url)
      .then(res => res.json())
      .then(data => setUsuarios(data));
  };

  const fetchTodos = () => {
    fetch("/api/usuarios/")
      .then(res => res.json())
      .then(data => {
        setUsuarios(data);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const abrirModal = (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setUsuarioSeleccionado(null);
  };

  

  return (
    <div>
      
      <NavbarPage titulo="Usuarios">
        <Filtro onFiltrar={fetchUsuarios} />
      </NavbarPage>
    
      <div className="flex itemss-center mt-10">
        <TablaUsuarios usuarios={usuarios} onEditar={abrirModal} />
        {mostrarModal && usuarioSeleccionado && (
          <div className="fixed inset-0 z-50 flex items-center justify-center  bg-slate-500/50 p-5">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
            <ModalDetalleUsuario
              usuario={usuarioSeleccionado}
              onClose={cerrarModal}
            />
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default Home;
