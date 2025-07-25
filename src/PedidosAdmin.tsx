import { useEffect, useState } from "react";
import { useUser } from "./userContext";
import NavbarPage from "./navbar";
import {Pedido} from "./Pedidos";
import ModalEditarPedido from "./ModalEditarPedido";
import {MetodoEnvio} from './cesta';
import Swal from 'sweetalert2';
export default function PedidosAdmin() {
    const { usuario } = useUser();
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState<Pedido | null>(null);
    const [mostrarModal, setMostrarModal] = useState(false);

    const fetchPedidos = () => {
        fetch(`/api/pedidos/`)
        .then(res => res.json())
        .then(data => {
            setPedidos(data);
        });
    };
    useEffect(() => {
        if (!usuario) return;
            fetchPedidos();
        }, [usuario]
    );
    const [envios, setEnvios] = useState<MetodoEnvio[]>([]);
     // 🔄 Obtener métodos de envío desde la API
    useEffect(() => {
        fetch("/api/pedidos/envios")
        .then(res => res.json())
        .then(data => {
            setEnvios(data);

        });
    }, []);
    // ✅ Adaptado para usar FormData
    const guardarCambios = (pedidoActualizado: Pedido) => {
        const formData = new FormData();
        formData.append("estado", pedidoActualizado.estado);
        formData.append("fecha_pedido", pedidoActualizado.fecha_pedido);
        formData.append("fecha_entrega", pedidoActualizado.fecha_entrega);
        formData.append("total", pedidoActualizado.total.toString());
        const fechaEntrega = new Date(pedidoActualizado.fecha_entrega);
        const fechaPedido = new Date(pedidoActualizado.fecha_pedido);

        if (fechaEntrega < fechaPedido) {
        Swal.fire({
            icon: "warning",
            title: "Opa...",
            text: "La fecha de entrega no puede ser menor a la fecha de inicio!",
            focusConfirm: false,
            customClass: {
            confirmButton: "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
            },
            buttonsStyling: false // 👈 Importante para que usen tus clases
        });
        }
        else{
            fetch(`/api/pedidos/${pedidoActualizado.id}`, {
            method: "PUT",
            body: formData,
        })
        .then(async res => {
            if (!res.ok) {
                const error = await res.json();
               Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error al actualizar el pedido!",
                    focusConfirm: false,
                    customClass: {
                    confirmButton: "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
                    },
                    buttonsStyling: false // 👈 Importante para que usen tus clases
                });
                console.log(error);
            }
            return res.json();
        })
        .then(() => {
            fetchPedidos();
            Swal.fire({
                title: 'Pedido cambiado correctamente',
                text: 'Los cambios se aplicaron correctamente.',
                icon: 'success',
                confirmButtonText: 'OK',
                focusConfirm: false,
                customClass: {
                confirmButton: "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
                },
                buttonsStyling: false // 👈 Importante para que usen tus clases
            });
            setMostrarModal(false);
        })
        .catch(err => {
            Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error en el servidor!",
                    focusConfirm: false,
                    customClass: {
                    confirmButton: "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
                    },
                    buttonsStyling: false // 👈 Importante para que usen tus clases
                });
            console.log(err);
        });
        }
    };

    const [paginaActual, setPaginaActual] = useState(1);
    const productosPorPagina = 10;
    const totalPaginas = Math.ceil(pedidos.length / productosPorPagina);
    const pedidosPaginados = pedidos.slice(
        (paginaActual - 1) * productosPorPagina,
        paginaActual * productosPorPagina
    );

    const renderNumerosDePagina = () => {
        const numeros: (number | string)[] = [];
    
        if (totalPaginas <= 3) {
        for (let i = 1; i <= totalPaginas; i++) {
            numeros.push(i);
        }
        } else {
        numeros.push(1);
    
        if (paginaActual > 2) {
            numeros.push("...");
        }
    
        if (paginaActual !== 1 && paginaActual !== totalPaginas) {
            numeros.push(paginaActual);
        }
    
        if (paginaActual < totalPaginas - 1) {
            numeros.push("...");
        }
    
        if (totalPaginas > 1) {
            numeros.push(totalPaginas);
        }
        }

        return (
        <div>
            {numeros.map((n, index) =>
            n === "..." ? (
                <span key={index}>...</span>
            ) : (
                <button
                key={index}
                onClick={() => setPaginaActual(Number(n))}
                type="button"
                className="text-gray-900 bg-white border border-gray-300 me-1 ms-1"
                style={{
                    fontWeight: paginaActual === n ? "bold" : "normal",
                    backgroundColor: paginaActual === n? "AliceBlue": "white"
                }}
                >
                {n}
                </button>
            )
            )}
        </div>
        );
    };

    return(
        <>
            <NavbarPage titulo="Pedidos" />
            <div className="max-w-4xl mx-auto p-6">
                { pedidos.length < 1 ? 
                (<>
                    <div className="text-center">
                        <h1 className="text-gray-600 mt-30 p-10 mb-10 dark:text-gray-200"><strong>Actualmente no hay pedidos hechos.</strong></h1>
                    </div>
                </>) 
                : 
                (<>
                    <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-20">
                        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                            <tr>
                            <th className="text-left w-100 dark:text-gray-200">Fecha</th>
                            <th className="text-left w-150 dark:text-gray-200">Total</th>
                            <th className="text-left w-100 dark:text-gray-200">Estado</th>
                            <th className="text-left"></th>
                            </tr>
                        </thead>
                        <tbody className="dark:text-gray-200">
                            {pedidosPaginados.map((p) => (
                                <tr key={p.id} className="border-b">
                                    <td>{new Date(p.fecha_pedido).toLocaleDateString()}</td>
                                    <td>{p.total} €</td>
                                    <td className="text-center align-middle">
                                    <div className="w-30">
                                        <div
                                        className={`items-center px-2 py-1 font-sans text-xs font-bold text-green-900 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20
                                        ${p.estado === "pendiente" ? "text-yellow-800 bg-yellow-400" : ""}
                                        ${p.estado === "enviado" ? "text-sky-800 bg-sky-400" : ""}
                                        ${p.estado === "cancelado" ? "text-red-800 bg-red-400" : ""}
                                        ${p.estado === "entregado" ? "text-green-800 bg-green-400" : ""}
                                        `}>
                                        <span className="">
                                            {p.estado}
                                        </span>
                                        </div>
                                    </div>
                                    </td>
                                    <td>
                                        <button className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br
                                        focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5
                                        py-2.5 text-center mt-2 mb-2"
                                        onClick={() => {setPedidoSeleccionado(p); setMostrarModal(true);}}
                                        >
                                        <i className="fa-solid fa-pen-to-square"></i>
                                        </button>
                                    
                                            {/* Modal de edición */}
                                            {mostrarModal && pedidoSeleccionado && (
                                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-500/5 p-5">
                                                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
                                                        <ModalEditarPedido
                                                            pedido={pedidoSeleccionado}
                                                            envios={envios}
                                                            onClose={() => setPedidoSeleccionado(null)}
                                                            onSave={guardarCambios}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                    </td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
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
                </>)
                }
           </div>
        </>
        
    );
}