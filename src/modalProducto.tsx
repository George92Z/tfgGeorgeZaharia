import { useState } from "react";
import { Producto } from "./Productos";
import { useUser } from "./userContext";
import ModalEditarProducto from "./ModalEditarProducto";
import ModalConfirmacion from "./ModalConfirmacion";
import ModalAñadirCarrito from "./modalAñadirAlCarrito";
import { useCart } from "./cartContext";
import Swal from 'sweetalert2';
import Photo from "./Photo";
interface Props {
  producto: Producto;
  onClose: () => void;
}

export default function ModalProducto({ producto, onClose }: Props) {
  const { añadirAlCarrito } = useCart();
  const [mostrarAñadirCarrito, setMostrarAñadirCarrito] = useState(false);
  const { usuario } = useUser();
  const [mostrarEditar, setMostrarEditar] = useState(false);

  const cerrarEditar = () => setMostrarEditar(false);

  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const eliminarProducto = () => {
    fetch(`/api/productos/${producto.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        onClose();
      });
  };
  //esta función recibirá el producto editado y la nueva imagen desde el modal hijo
  const guardarCambios = (editado: Producto, nuevaImagen: File | null) => {
    const formData = new FormData();

    formData.append("nombre", editado.nombre);
    formData.append("descripcion", editado.descripcion);
    formData.append("precio", editado.precio.toString());
    formData.append("stock", editado.stock.toString());

    if (nuevaImagen) {
      formData.append("imagen", nuevaImagen);
    } else if (producto.imagen) {
      formData.append("imagenActual", producto.imagen);
    }

    fetch(`/api/productos/${producto.id}`, {
      method: "PUT",
      body: formData,
    })
      .then(res => res.json())
      .then(() => {
        cerrarEditar();
        onClose(); // Cierra el modal padre
      });
  };
  const estilo = ()=>{
    if(producto.stock === 0){
      return ' disabled disabled:opacity-50';
    }
    return ''
  }
  return (
    <>
      {mostrarEditar ? (
        <ModalEditarProducto producto={producto} onClose={cerrarEditar} onSave={guardarCambios} />
      ) : (
        <div className="max-w-4xl mx-auto px-4">
          
          
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col items-center space-y-4 max-h-110 md:max-h-110 overflow-y-auto">

              <Photo ruta={producto.imagen ? `${import.meta.env.VITE_API_URL}/static/fotosProducto/${producto.imagen}` : `${import.meta.env.VITE_API_URL}/static/fotosProducto/sinFoto.jpg`}>
                <img
                  src={producto.imagen ? `${import.meta.env.VITE_API_URL}/static/fotosProducto/${producto.imagen}` : `${import.meta.env.VITE_API_URL}/static/fotosProducto/sinFoto.jpg`}
                  alt={producto.nombre}
                  className="aspect-square object-cover w-full max-w-[280px] rounded-lg shadow mt-3"
                />
              </Photo>

              <div className="w-full">
                <p className={`text-gray-500 text-xl mb-2  ${producto.stock <= 5 ?"bg-amber-200":"bg-cyan-200"} w-fit px-2 font-semibold italic precio mt-0`}>{producto.stock <= 5 ?(<><i className="fa-solid fa-circle-exclamation text-amber-600"></i></>):(<></>)} {producto.precio}€</p>
                <h2 className="text-lg text-gray-500 dark:text-white font-semibold mb-2">{producto.nombre}</h2>
                
                  
               {producto.stock <= 5 && producto.stock > 0? (<>
                  <p  className="text-red-700 bg-red-200 w-fit px-2 rounded-sm mt-3 italic text-lg" >Solo quedan <strong>{producto.stock}</strong> unidades</p>
                  </>):
                  (<>
                    {producto.stock <= 0?
                    (<>
                      <p  className="text-blue-700 bg-blue-200 w-fit px-2 rounded-sm mt-3 italic text-lg" >Agotado</p>
                    </>)
                    :
                    (<>
                      <p  className="text-green-600 bg-green-100 w-fit px-2 rounded-sm mt-3 italic text-lg" ><strong>{producto.stock}</strong> unidades disponibles</p>
                    </>)}
                  </>)
                }
                <p className="mt-3 dark:text-gray-400">{producto.descripcion}</p>
                
              </div>
            </div>
            

            <div className="flex items-center">
              {usuario?.rol === 1 ? (
                <>
                  <button onClick={() => setMostrarEditar(true)} className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-1">
                    Editar
                  </button>
                  <button
                    onClick={() => setMostrarConfirmacion(true)}
                    className="text-white bg-gradient-to-br from-pink-500 to-orange-400 font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    Eliminar
                  </button>
                  {mostrarConfirmacion && (
                    <ModalConfirmacion
                      mensaje={`¿Deseas eliminar el producto "${producto.nombre}"?`}
                      onConfirmar={() => {
                        eliminarProducto();
                        Swal.fire({
                          title: "Producto eliminado.",
                          icon: "success",
                          confirmButtonText: "OK",
                          //Esta opción evita el foco automático
                          focusConfirm: false,
                          customClass: {
                          confirmButton: "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
                          },
                          buttonsStyling: false // 👈 Importante para que usen tus clases
                      });
                        setMostrarConfirmacion(false);
                      }}
                      onCancelar={() => setMostrarConfirmacion(false)}
                    />
                  )}
                </>
              ) : (
                <>
                  <button onClick={() => setMostrarAñadirCarrito(true)}
                  disabled={producto.stock === 0}
                  className={`text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-1 ${estilo()}`}>
                    Añadir al carrito
                  </button>
                  {mostrarAñadirCarrito && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-500/50 p-5">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
                        <ModalAñadirCarrito
                            producto={producto}
                            onClose={() => setMostrarAñadirCarrito(false)}
                            onConfirm={(cantidad) => {
                              añadirAlCarrito(producto, cantidad);
                              setMostrarAñadirCarrito(false);
                              onClose();
                            }}
                          />
                      </div>
                    </div>
                  )}
                </>
              )}
              <button onClick={onClose} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 
              focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 
                dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 ml-1">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}