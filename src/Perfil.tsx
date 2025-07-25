import { useUser } from "./userContext";
import NavbarPage from "./navbar";
import ModalUsuario from "./modalUsuario";
import { useState } from "react";
import Photo from "./Photo";
export default function Perfil() {
  const { usuario, access } = useUser();
  const [mostrarModal, setMostrarModal] = useState(false);

  if (!usuario) {
    return <div className="p-6 text-center text-gray-500">Cargando usuario...</div>;
  }

  // ✅ Adaptado para usar FormData y enviar imagen si se cambia
  const guardarCambios = (usuarioActualizado: typeof usuario, nuevaFoto: File | null) => {
  const formData = new FormData();

  formData.append("nombre", usuarioActualizado.nombre);
  formData.append("email", usuarioActualizado.email);
  formData.append("pwd", usuarioActualizado.pwd);
  formData.append("direccion", usuarioActualizado.direccion);

  if (nuevaFoto) {
    formData.append("foto", nuevaFoto);
  } else if (usuario.foto) {
    formData.append("fotoActual", usuario.foto);
  }

  fetch(`/api/usuarios/${usuarioActualizado.id}`, {
    method: "PUT",
    body: formData,
  })
    .then(res => res.json())
    .then(() => {
      const actualizado = {
        ...usuarioActualizado,
        foto: nuevaFoto ? nuevaFoto.name : usuario.foto, // 🔁 Forzar actualización de la foto
      };
      access(actualizado); // ⬅️ Actualiza el contexto con la nueva imagen
      setMostrarModal(false);
    });
};

  return (
    <div>
      <NavbarPage titulo="Mi perfil" />
      <div className="flex justify-center mt-10 px-4">
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-10">
          <h1 className="text-center">Perfil de usuario</h1>
          <h4 className="text-3xl font-bold mb-6 mt-6 text-center text-gray-900 dark:text-white">Hola, {usuario.nombre}</h4>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">

            <Photo ruta={`${import.meta.env.VITE_API_URL}/static/fotosUsuario/${encodeURIComponent(usuario.foto || "fotoUsuario.jpg")}`}>
             <img
                src={`${import.meta.env.VITE_API_URL}/static/fotosUsuario/${encodeURIComponent(usuario.foto || "fotoUsuario.jpg")}`}
                onError={(e) => {
                  e.currentTarget.onerror = null; // Evita bucle infinito
                  e.currentTarget.src = `${import.meta.env.VITE_API_URL}/static/fotosUsuario/fotoUsuario.jpg`;
                }}
                alt="Foto del usuario"
                className="w-28 h-28 rounded-full object-cover border border-gray-300"
              />
            </Photo>
            <div className="text-center md:text-left">
              <p className="text-xl font-semibold text-gray-900 dark:text-white"> {usuario.nombre}</p>
              <p className="text-gray-600 dark:text-gray-300">{usuario.email}</p>
              <p className="text-sm text-gray-400 mt-1">Id usuario: {usuario.id}</p>
            </div>
          </div>

          <div className="grid gap-4 text-sm sm:text-base">
            <div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">Dirección</p>
              <p className="text-gray-500 dark:text-gray-400">{usuario.direccion || "Sin dirección"}</p>
            </div>
            <div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">Contraseña</p>
              <p className="text-gray-500 dark:text-gray-400">{'*'.repeat(usuario.pwd.length) || "****"}</p>
            </div>
            <div>
              <button
                onClick={() => setMostrarModal(true)}
                className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none
                 focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Editar Perfil
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de edición */}
      {mostrarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-slate-500/50 p-5">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
            <ModalUsuario
              usuario={usuario}
              onClose={() => setMostrarModal(false)}
              onSave={guardarCambios} // ✅ ahora recibe también nueva imagen
            />
          </div>
        </div>
      )}
    </div>
  );
}
