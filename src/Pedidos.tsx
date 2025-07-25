import { useEffect, useState } from "react";
import { useUser } from "./userContext";
import NavbarPage from "./navbar";
import ModalDetallesPedido from "./modalDetallePedido";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

export interface Pedido {
  id: number;
  fecha_pedido: string;
  fecha_entrega: string;
  total: number;
  estado: string;
  envio: string;
  productos: [];
}
export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen?: string;
  cantidad: number;
}

export default function MisPedidos() {
  const { usuario } = useUser();
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);//esto servira para sacar los pedidos del usuario.
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState<Pedido | null>(null);
  const fetchPedidos = () => {
    fetch(`/api/pedidos/usuario/${usuario?.id}`)
      .then(res => res.json())
      .then(data => {
        setPedidos(data);
      });
  };
  useEffect(() => {
    if (!usuario) return;
    fetchPedidos();
  }, [usuario]);

  const [paginaActual, setPaginaActual] = useState(1);
  const Login= () => {
    navigate("/login");
  };
  const comprar= () => {
    navigate("/");
  };
  const elementosPorPagina = 10;
  const totalPaginas = Math.ceil(pedidos.length / elementosPorPagina);
  const pedidosPaginados = pedidos.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );
  const cancelarPedido = async (id: number) => {
    const result = await Swal.fire({
      title: "¿Seguro que quieres cancelar este pedido?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Volver",
      confirmButtonText: "Sí, cancelar",
      //Esta opción evita el foco automático
      focusConfirm: false,
      focusCancel: false,
      customClass: {
      confirmButton: "text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2",
      cancelButton: "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 ml-2",
      },
      buttonsStyling: false // 👈 Importante para que usen tus clases
    });

    if (result.isConfirmed) {
      const res = await fetch(`/api/pedidos/${id}/cancelar`, {
        method: "PUT",
      });

      if (res.ok) {
        await Swal.fire({
          title: "Pedido cancelado correctamente.",
          icon: "success",
          confirmButtonText: "OK",
          //Esta opción evita el foco automático
          focusConfirm: false,
          customClass: {
          confirmButton: "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
          },
          buttonsStyling: false // 👈 Importante para que usen tus clases
        });
        setPedidoSeleccionado(null);
        fetchPedidos();
      } else {
        const error = await res.json();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo fue mal, no se pudo cancelar el pedido!",
          focusConfirm: false,
          customClass: {
          confirmButton: "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
          },
          buttonsStyling: false // 👈 Importante para que usen tus clases
        });
        console.log(error.error);
      }
    }
  
};

const eliminarPedido = async (id: number) => {
    const result = await Swal.fire({
      title: "¿Seguro que quieres eliminar este pedido?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Volver",
      confirmButtonText: "Sí, eliminar",
      //Esta opción evita el foco automático
      focusConfirm: false,
      focusCancel: false,
      customClass: {
      confirmButton: "text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2",
      cancelButton: "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 ml-2",
      },
      buttonsStyling: false // 👈 Importante para que usen tus clases
    });
    if (result.isConfirmed) {
      const res = await fetch(`/api/pedidos/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await Swal.fire({
          title: "Pedido cancelado correctamente.",
          icon: "success",
          confirmButtonText: "OK",
          //Esta opción evita el foco automático
          focusConfirm: false,
          customClass: {
          confirmButton: "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
          },
          buttonsStyling: false // 👈 Importante para que usen tus clases
        });
        setPedidoSeleccionado(null);
        fetchPedidos();
      } else {
        const error = await res.json();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo fue mal, no se pudo eliminar el pedido!",
          focusConfirm: false,
          customClass: {
          confirmButton: "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
          },
          buttonsStyling: false // 👈 Importante para que usen tus clases
        });
        console.log(error.error);
      }
    }
};

  const renderNumerosDePagina = () => {
      const numeros: (number | string)[] = [];

      if (totalPaginas <= 3) {
        for (let i = 1; i <= totalPaginas; i++) {
          numeros.push(i);
        }
      } else {
        numeros.push(1);

        if (paginaActual > 2) numeros.push("...");

        if (paginaActual !== 1 && paginaActual !== totalPaginas) {
          numeros.push(paginaActual);
        }

        if (paginaActual < totalPaginas - 1) numeros.push("...");

        if (totalPaginas > 1) numeros.push(totalPaginas);
      }

      return ( 
        <div>
          {numeros.map((n, index) =>
            n === "..." ? (
              <span key={index} className="mx-1">...</span>
            ) : (
              <button
                key={index}
                onClick={() => setPaginaActual(Number(n))}
                type="button"
                className="text-gray-900 bg-white border border-gray-300 me-1 ms-1 px-3 py-1 rounded"
                style={{
                  fontWeight: paginaActual === n ? "bold" : "normal",
                  backgroundColor: paginaActual === n ? "AliceBlue" : "white"
                }}
              >
                {n}
              </button>
            )
          )}
        </div>
      );
    };

  return (
    <div>
      <NavbarPage titulo="Mis pedidos" />
      {!usuario ? (

        <>
          <div className="text-center">
             <h1 className="text-gray-600 mt-10 p-10 dark:text-gray-200"><strong>Inicia sesion para ver tus pedidos.</strong></h1>
            <button onClick={Login} className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l
           hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none
           focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 mt-10 mb-10">Iniciar sesion</button>
          </div>
        </>
      ):(
        <>
        {pedidos.length === 0 ?
         <>
          <div className="text-center">
             <h1 className="text-gray-600 mt-20 dark:text-gray-200"><strong>Actualmente no tienes pedidos.</strong></h1>
            <button onClick={comprar} className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l
           hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none
           focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 mt-10 mb-20">Comprar</button>
          </div>
         </>
         :
          <>
            <div className="max-w-4xl mx-auto p-6 mt-5">
              <table className="text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase">
                  <tr>
                    <th className="text-left w-100 dark:text-gray-200">Fecha</th>
                    <th className="text-left w-150 dark:text-gray-200">Total</th>
                    <th className="text-left w-100 dark:text-gray-200">Estado</th>
                    <th className="text-left"></th>
                  </tr>
                </thead>
                <tbody className="dark:text-gray-200">
                  {/*aqui hacer un for in que es como un foreach pero con la diferencia que se parece mas a un mapa de llave valor. */}

                  {pedidosPaginados.map((pedido) => (
                    
                    <tr key={pedido.id} className="border-b">
                      <td>
                        {new Date(pedido.fecha_pedido).toLocaleDateString()}
                      </td>
                      <td>
                        {
                          pedido.total
                        } €
                      </td>
                      <td className="text-center align-middle">
                      <div className="w-30">
                          <div
                            className={`items-center px-2 py-1 font-sans text-xs font-bold text-green-900 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20
                            ${pedido.estado === "pendiente" ? "text-yellow-800 bg-yellow-400" : ""}
                            ${pedido.estado === "enviado" ? "text-sky-800 bg-sky-400" : ""}
                            ${pedido.estado === "cancelado" ? "text-red-800 bg-red-400" : ""}
                            ${pedido.estado === "entregado" ? "text-green-800 bg-green-400" : ""}
                            `}>
                            <span className="">
                              {
                                pedido.estado
                              }
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">
                        <button className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br
                        focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5
                        py-2.5 text-center mt-2 mb-2"
                        onClick={() => setPedidoSeleccionado(pedido)}
                        >
                          <i className="fa-solid fa-circle-info"></i>
                        </button>
                        {pedidoSeleccionado && (
                          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/5 p-5">
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
                              <ModalDetallesPedido
                                pedidoId={pedidoSeleccionado.id}
                                productos={pedidoSeleccionado.productos}
                                onClose={() => setPedidoSeleccionado(null)}
                              />
                              {["pendiente", "enviado"].includes(pedidoSeleccionado.estado) ? (
                                  <button
                                    onClick={() => cancelarPedido(pedidoSeleccionado.id)}
                                    className="mt-6 text-white bg-gradient-to-br from-red-600 to-orange-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                                  >
                                    Cancelar pedido
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => eliminarPedido(pedidoSeleccionado.id)}
                                    className="mt-6 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
                                  >
                                    Eliminar pedido
                                  </button>
                                )}
                              </div>
                            </div>
                        )}

                      </td>
                    </tr>
                    
                  ))}
                  
                </tbody>
              </table>

              
            </div>
            <div className="flex justify-center mt-10 mb-10">
                <button  type="button"
                      className="text-gray-900 bg-white border border-gray-300 me-1 ms-1 buttonsPag"
                onClick={() => setPaginaActual(p => Math.max(p - 1, 1))} disabled={paginaActual === 1}>
                    <i className="fa-solid fa-arrow-left text-black"></i> 
                </button>

              {renderNumerosDePagina()}

              <button  type="button"
                      className="text-gray-900 bg-white border border-gray-300 me-1 ms-1 buttonsPag"
              onClick={() => setPaginaActual(p => Math.min(p + 1, totalPaginas))} disabled={paginaActual === totalPaginas}>
                  <i className="fa-solid fa-arrow-right text-black"></i> 
              </button>
            </div>
          </>
         }
          
        </>
      )}
      
    </div>
    
  );
}
