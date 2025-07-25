import { useState, useEffect } from "react";
import FiltroProductos from "./FiltroProducto";
import GridProductos from "./gridProductos";
import NavbarPage from "./navbar";
import ModalProducto from "./modalProducto";
import { useUser } from "./userContext";
import ModalNuevoProducto from "./ModalNuevoProducto";
export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen?: string;
}

function Productos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [todosLosProductos, setTodosLosProductos] = useState<Producto[]>([]);
  const [filtroNombre, setFiltroNombre] = useState<string | undefined>(undefined);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [mostrarNuevoModal, setMostrarNuevoModal] = useState(false);
  const { usuario } = useUser();
  const fetchTodos = () => {
    fetch("/api/productos/")
      .then(res => res.json())
      .then(data => {
        setTodosLosProductos(data);
        setProductos(data);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    if (filtroNombre) {
      const filtrados = todosLosProductos.filter(p =>
        p.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
      );
      setProductos(filtrados);
    } else {
      setProductos(todosLosProductos);
    }
  }, [filtroNombre, todosLosProductos]);

  const abrirModal = (producto: Producto) => {
    setProductoSeleccionado(producto);
  };
  const cerrarModal = () => {
    setProductoSeleccionado(null);
    fetchTodos(); // 🔄 recarga productos al cerrar el modal
  };

  
  return (
    <div>
      <NavbarPage titulo="Inicio">
        <FiltroProductos onFiltrar={setFiltroNombre} />
      </NavbarPage>
      {usuario?.rol === 1 && (
        <button
          onClick={() => setMostrarNuevoModal(true)}
          className="text-right text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l 
          hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg 
          text-sm px-5 py-2.5  m-10 mt-5 mb-0"
        >
          Añadir producto
        </button>
      )}
      {mostrarNuevoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-500/50 p-5">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
            <ModalNuevoProducto
              onClose={() => setMostrarNuevoModal(false)}
              onSave={() => {
                fetchTodos(); // refresca productos
                setMostrarNuevoModal(false); // cierra modal
              }}
            />
          </div>
        </div>
      )}
      <GridProductos productos={productos} onClickProducto={abrirModal} />

      {productoSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-slate-500/50 p-5">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
            <ModalProducto producto={productoSeleccionado} onClose={cerrarModal}/>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default Productos;