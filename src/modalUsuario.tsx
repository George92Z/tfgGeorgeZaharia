import { useEffect, useState } from "react";
import { Usuario } from "./home";
import './App.css';

interface Props {
  usuario: Usuario;
  onClose: () => void;
  onSave: (usuario: Usuario, nuevaFoto: File | null) => void;
}

export default function ModalUsuario({ usuario, onClose, onSave }: Props) {
  const [editado, setEditado] = useState<Usuario>({ ...usuario });

  const [fotoPrevia, setFotoPrevia] = useState<string | undefined>(
    usuario.foto ? `${import.meta.env.VITE_API_URL}/static/fotosUsuario/${usuario.foto}` : undefined
  );
  const [nuevaFoto, setNuevaFoto] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditado({ ...editado, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNuevaFoto(file);
      setFotoPrevia(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    setEditado({ ...usuario });
    setFotoPrevia(usuario.foto ? `${import.meta.env.VITE_API_URL}/static/fotosUsuario/${usuario.foto}` : undefined);
    setNuevaFoto(null);
  }, [usuario]);

  return (
    <div className='px-4'>
      <div className="mt-5 space-y-4 max-h-96 overflow-y-auto pr-2">
      
        {/* Imagen / drag and drop */}
      <div
        className="flex items-center justify-center w-full mt-4"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files?.[0];
          if (file) {
            setNuevaFoto(file);
            setFotoPrevia(URL.createObjectURL(file));
          }
        }}
      >
        <label
          htmlFor="dropzone-foto"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer 
            bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-800 dark:border-gray-600 dark:hover:border-gray-500"
        >
          {fotoPrevia ? (
            <img
              src={fotoPrevia || `${import.meta.env.VITE_API_URL}/static/fotosUsuario/${usuario.foto || "fotoUsuario.jpg"}`}
              onError={(e) => {
                e.currentTarget.onerror = null; // Evita bucle infinito
                e.currentTarget.src = `${import.meta.env.VITE_API_URL}/static/fotosUsuario/fotoUsuario.jpg`;
              }}
              alt="Previsualización"
              className="h-full object-contain rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Haz clic para subir</span> o arrastra aquí
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, JPEG, GIF, AVIF</p>
            </div>
          )}
          <input id="dropzone-foto" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </label>
      </div>

        {/* Campos */}
        <div className="mt-6">
          <label htmlFor="nombre" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Nombre:</label>
          <input
            name="nombre"
            placeholder="Nombre"
            value={editado.nombre}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="mt-6">
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
          <input
            name="email"
            placeholder="Email"
            value={editado.email}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="mt-6">
          <label htmlFor="direccion" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Dirección:</label>
          <input
            name="direccion"
            placeholder="Dirección"
            value={editado.direccion}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="mt-6">
          <label htmlFor="pwd" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Contraseña:</label>
          <input
            type="password"
            name="pwd"
            placeholder="Contraseña"
            value={editado.pwd.toString()}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-center mt-5">
        <button
          className="me-5 text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5"
          onClick={() => onSave(editado, nuevaFoto)}
        >
          Guardar
        </button>
        <button
          className="ms-5 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5"
          onClick={onClose}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
