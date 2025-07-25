import { useState } from "react";
import { Producto } from "./Productos";
import Swal from 'sweetalert2';
interface Props {
  producto: Producto;
  onClose: () => void;
  onConfirm: (cantidad: number) => void;
}

export default function ModalAñadirCarrito({ producto, onClose, onConfirm }: Props) {
  const [cantidad, setCantidad] = useState(1);

  const handleConfirmar = () => {
    if (cantidad < 1 || cantidad > producto.stock) {
      Swal.fire({
        icon: "error",
        text: "Cantidad no valida!",
        focusConfirm: false,
          customClass: {
          confirmButton: "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
          },
          buttonsStyling: false //Importante para que usen tus clases
      });
    }
    else{
      onConfirm(cantidad);
      Swal.fire({
        title: "Producto añadido a la cesta!",
        icon: "success",
        focusConfirm: false,
        customClass: {
        confirmButton: "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
        },
        buttonsStyling: false //Importante para que usen tus clases
      });
    }
    
  };
  const estilo = ()=>{
    if(producto.stock === 0){
      return ' disabled disabled:opacity-50';
    }
    return ''
  }
  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4 text-center dark:text-white">Añadir al carrito</h2>
      
      <div className="flex flex-col items-center gap-4">
        <img
          src={producto.imagen ? `${import.meta.env.VITE_API_URL}/static/fotosProducto/${producto.imagen}` : `${import.meta.env.VITE_API_URL}/static/fotosProducto/sinFoto.jpg`}
          alt={producto.nombre}
          className="w-40 h-40 object-cover rounded-lg shadow"
        />
        <p className="text-lg font-medium text-gray-900 dark:text-white">{producto.nombre}</p>
        <p className="text-gray-600 dark:text-gray-400">{producto.precio} €</p>

        <input
            type="number"
            min={1}
            max={producto.stock}
            value={cantidad === 0 ? "" : cantidad}  // Mostrar campo vacío si cantidad es 0
            onChange={(e) => {
            const valor = e.target.value;
            if (valor === "") {
                setCantidad(0); // 0 representa "vacío" temporalmente
            } else {
            const numero = parseInt(valor);
                if (!isNaN(numero)) {
                    setCantidad(numero);
                }
            }
            }}
            className="w-24 mt-2 p-2 text-center border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
            />
        <p className="text-sm text-gray-500 dark:text-gray-400">Stock disponible: {producto.stock}</p>

        <div className="flex gap-4 mt-6">
          
          <button
            onClick={handleConfirmar}
            className={`text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 ${estilo()}`}
          >
            Añadir
          </button>
          <button
            onClick={onClose}
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}