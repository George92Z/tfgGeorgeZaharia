
import { Usuario } from "./home";
import './App.css';
import Photo from "./Photo";
interface Props {
  usuario: Usuario;
  onClose: () => void;
}

export default function ModalDetalleUsuario({ usuario, onClose }: Props) {

  return (
    <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-gray-500">Detalles del Usuario</h2>

          <div className="flex flex-col items-center gap-4">
            <Photo ruta={`${import.meta.env.VITE_API_URL}/static/fotosUsuario/${usuario.foto || "fotoUsuario.jpg"}`}>
              <img
                src={`${import.meta.env.VITE_API_URL}/static/fotosUsuario/${usuario.foto || "fotoUsuario.jpg"}`}
                onError={(e) => {
                  e.currentTarget.onerror = null; // Evita bucle infinito
                  e.currentTarget.src = `${import.meta.env.VITE_API_URL}/static/fotosUsuario/fotoUsuario.jpg`;
                }}
                className="w-28 h-28 rounded-full object-cover border border-gray-300"
              />
            </Photo>

            <div className="w-full">
              <p><strong>Nombre:</strong> <span className="text-md text-gray-500 font-semibold" >{usuario.nombre}</span></p>
              <p><strong>Email:</strong> <span className="text-md text-gray-500 font-semibold" >{usuario.email}</span></p>
              <p><strong>Direccion:</strong> <span className="text-md text-gray-500 font-semibold" >{usuario.direccion}</span></p>
              <p><strong>pwd:</strong> <span className="text-md text-gray-500 font-semibold" >{'*'.repeat(Math.min(usuario.pwd.length, 8)) + ''}</span></p>
            </div>

            <div className="flex items-center mt-10">
              <button onClick={onClose} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 
                dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 m-5">
                Cerrar
              </button>
            </div>
          </div>
        </div>
  );
}
