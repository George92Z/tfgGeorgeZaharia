// ModalEditarProducto.tsx
import { useState, useEffect } from "react";
import { Producto } from "./Productos";

interface Props {
  producto: Producto;
  onClose: () => void;
  onSave: (producto: Producto, nuevaImagen: File | null) => void;
}

export default function ModalEditarProducto({ producto, onClose, onSave }: Props) {
  const [editado, setEditado] = useState<Producto>({ ...producto });

  useEffect(() => {
    setEditado({ ...producto });
  }, [producto]);

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;

  // No validamos aquí, solo actualizamos el texto
  setEditado(prev => ({
    ...prev,
    [name]: value,
  }));
};
const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  if (name === "precio") {
    let num = parseFloat(value);
    if (isNaN(num) || num < 0) num = 0.01;

    setEditado(prev => ({
      ...prev,
      precio: parseFloat(num.toFixed(2)), // ✅ ahora es un number
    }));
  }

  if (name === "stock") {
    let num = parseInt(value);
    if (isNaN(num) || num < 0) num = 0;

    setEditado(prev => ({
      ...prev,
      [name]: num,
    }));
  }
};
  const [imagenPrevia, setImagenPrevia] = useState<string | undefined>(
  producto.imagen ? `${import.meta.env.VITE_API_URL}/static/fotosProducto/${producto.imagen}` : undefined);
  const [nuevaImagen, setNuevaImagen] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setNuevaImagen(file);
    setImagenPrevia(URL.createObjectURL(file)); // previsualización inmediata
  }
};
  return (
   
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
    <h2 className="text-xl font-bold mb-4">Editar producto</h2>
    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
      <div
        className="flex items-center justify-center w-full mt-4"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files?.[0];
          if (file) {
            setNuevaImagen(file);
            setImagenPrevia(URL.createObjectURL(file));
          }
        }}
      >
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer 
            bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-800 dark:border-gray-600 dark:hover:border-gray-500"
        >
          {imagenPrevia ? (
            <img
              src={imagenPrevia}
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
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG, JPEG, GIF, AVIF (MAX. 800x400px)
              </p>
            </div>
          )}
          <input
            id="dropzone-file"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
      <div className="mt-7">
          <label htmlFor="nombre">Nombre de producto:</label>
          <input name="nombre" value={editado.nombre} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
      <div className="mt-7">
          <label htmlFor="descripcion">Descripcion:</label>
          <textarea name="descripcion" value={editado.descripcion} onChange={handleChange} className="h-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
      <div className="mt-7">
          <label htmlFor="precio">Precio:</label>
          <input name="precio" type="number" value={editado.precio}  onBlur={handleBlur} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
      <div className="mt-7">
          <label htmlFor="stock">Stock:</label>
          <input name="stock" type="number" value={editado.stock}  onBlur={handleBlur} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
    </div>
    
      

      <div className="flex justify-between mt-4">
        <button onClick={() => onSave(editado, nuevaImagen)}  className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5">Guardar</button>
        <button onClick={onClose} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5">Cancelar</button>
      </div>
    </div>
  );
}