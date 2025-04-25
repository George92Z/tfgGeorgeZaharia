import { useEffect, useState } from "react";
import TablaUsuarios from "./tablaPaginada";
import ModalUsuario from "./modalUsuario";
import './App.css'
export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  edad: number;
  contrasenia: string
  activo: boolean;
}

function Home() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const fetchUsuarios = () => {
    fetch("/api/usuarios")
      .then(res => res.json())
      .then(data => {
        console.log("👀 Usuarios:", data); // ¿trae habilitado?
        setUsuarios(data);
      });
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const abrirModal = (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setUsuarioSeleccionado(null);
  };

  const guardarCambios = (usuarioActualizado: Usuario) => {
    fetch(`/api/usuarios/${usuarioActualizado.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuarioActualizado)
    })
      .then(res => res.json())
      .then(() => {
        cerrarModal();
        fetchUsuarios();
      });
  };

  return (
    <>
    <div className="container">
        <br className="mt-30"/>
        <TablaUsuarios usuarios={usuarios} onEditar={abrirModal} />

        {mostrarModal && usuarioSeleccionado && (
        <ModalUsuario
            usuario={usuarioSeleccionado}
            onClose={cerrarModal}
            onSave={guardarCambios}
        />
        )}
    </div>
      
    </>
  );
}

export default Home;