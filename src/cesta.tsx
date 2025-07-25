import { useCart } from "./cartContext";
import NavbarPage from "./navbar";
import { useUser } from "./userContext";
import { useNavigate,useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { loadStripe } from '@stripe/stripe-js';
export interface MetodoEnvio {
  id: number;
  nombre: string;
  precio: number;
}

export default function Cesta() {
  const location = useLocation();
  
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useCart();
  const navigate = useNavigate();
  const { usuario } = useUser();
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  const [envios, setEnvios] = useState<MetodoEnvio[]>([]);
  const [envioSeleccionado, setEnvioSeleccionado] = useState<number | null>(null);

  // 🔄 Obtener métodos de envío desde la API
  useEffect(() => {
    fetch("/api/pedidos/envios")
      .then(res => res.json())
      .then(data => {
        setEnvios(data);
        if (data.length > 0) setEnvioSeleccionado(data[0].id);
      });
  }, []);

  const totalProductos = carrito.reduce(
    (acc, item) => acc + item.producto.precio * item.cantidad,
    0
  );

  const envioPrecio = envios.find(e => e.id === envioSeleccionado)?.precio || 0;
  const totalFinal = Number(totalProductos) + Number(envioPrecio);

  const Inicio = () => {
    navigate("/");
  };

  const handlePagarConStripe = async () => {
  const envioSeleccionadoObj = envios.find(e => e.id === envioSeleccionado);

  if (!usuario) {
    await Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Tienes que iniciar sesión para comprar",
      confirmButtonText: "OK",
      //Esta opción evita el foco automático
      focusConfirm: false,
      customClass: {
      confirmButton: "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
      },
      buttonsStyling: false // 👈 Importante para que usen tus clases
    });
    return;
  }

  if (!envioSeleccionado) {
    await Swal.fire({
      icon: "info",
      title: "Selecciona un método de envío",
      confirmButtonText: "OK",
      //Esta opción evita el foco automático
      focusConfirm: false,
      customClass: {
      confirmButton: "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
      },
      buttonsStyling: false // 👈 Importante para que usen tus clases
    });
    return;
  }

  const productos = carrito.map(item => ({
    producto_id: item.producto.id,       // <-- aquí la ID del producto
    cantidad: item.cantidad,
    nombre:item.producto.nombre,
    precio_unit: item.producto.precio,   // coincide con lo que usas en backend
  }));

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/stripe/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productos,
        envio: envioSeleccionadoObj
          ? { ...envioSeleccionadoObj, precio: Number(envioSeleccionadoObj.precio) }
          : null,
      }),
    });

    const data = await res.json();
    const stripe = await stripePromise;

    if (stripe && data.url) {
      // Guardamos temporalmente los datos del pedido en localStorage
      localStorage.setItem("pedidoPendiente", JSON.stringify({
        usuario_id: usuario.id,
        productos,
        total: Number(totalFinal),
        envio_id: Number(envioSeleccionado),
      }));

      window.location.href = data.url;
    } else {
      Swal.fire({
        icon: "error",
        title: "Error al obtener la URL de pago",
        text: "Inténtalo de nuevo más tarde.",
        confirmButtonText: "OK",
        //Esta opción evita el foco automático
        focusConfirm: false,
        customClass: {
        confirmButton: "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
        },
        buttonsStyling: false // 👈 Importante para que usen tus clases
      });
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Error de conexión con Stripe",
      text: "Inténtalo más tarde.",
      confirmButtonText: "OK",
      //Esta opción evita el foco automático
      focusConfirm: false,
      customClass: {
      confirmButton: "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
      },
      buttonsStyling: false // 👈 Importante para que usen tus clases
    });
  }
};
useEffect(() => {
  const params = new URLSearchParams(location.search);
  const pagado = params.get("pagado");

  // ✅ Limpiar bandera si no hay parámetro pagado
  if (!pagado) {
    sessionStorage.removeItem("pedidoProcesado");
    return;
  }

  if ((pagado === "1" || pagado === "0") && carrito.length >= 0) {
    setTimeout(async () => {
      if (pagado === "1") {
        const pedidoGuardado = localStorage.getItem("pedidoPendiente");
        const yaProcesado = sessionStorage.getItem("pedidoProcesado");

        if (pedidoGuardado && !yaProcesado) {
          try {
            const datosPedido = JSON.parse(pedidoGuardado);
            const res = await fetch("/api/pedidos/", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(datosPedido),
            });

            if (res.ok) {
              localStorage.removeItem("pedidoPendiente");
              sessionStorage.setItem("pedidoProcesado", "1");
              vaciarCarrito();

              Swal.fire({
                title: '¡Pago realizado!',
                text: 'Tu compra se ha registrado con éxito.',
                icon: 'success',
                confirmButtonText: 'OK',
                focusConfirm: false,
                customClass: {
                  confirmButton: "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
                },
                buttonsStyling: false
              }).then(() => {
                navigate("/miCesta", { replace: true });
              });
            } else {
              const error = await res.json();
              console.error("Error al guardar pedido:", error);

              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El pago se realizó, pero hubo un problema al registrar el pedido.",
                confirmButtonText: "OK",
                focusConfirm: false,
                customClass: {
                  confirmButton: "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
                },
                buttonsStyling: false
              });
            }
          } catch (e) {
            console.error("Error inesperado:", e);
            Swal.fire({
              icon: "error",
              title: "Error inesperado",
              text: "No se pudo guardar el pedido.",
              confirmButtonText: "OK",
              focusConfirm: false,
              customClass: {
                confirmButton: "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
              },
              buttonsStyling: false
            });
          }
        }
      }

      if (pagado === "0") {
        localStorage.removeItem("pedidoPendiente");
        sessionStorage.removeItem("pedidoProcesado");

        Swal.fire({
          title: 'Pago cancelado',
          text: 'Has cancelado el proceso de pago.',
          icon: 'info',
          confirmButtonText: "OK",
          focusConfirm: false,
          customClass: {
            confirmButton: "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
          },
          buttonsStyling: false
        }).then(() => {
          navigate("/miCesta", { replace: true });
        });
      }
    }, 500);
  }
}, [location.search]);
  return (
    <div>
      <NavbarPage titulo="Mi cesta" />
      {carrito.length === 0 ? (
        <div className="text-center">
          <h1 className="text-gray-600 mt-20 dark:text-gray-200"><strong>Tu cesta está vacía.</strong></h1>
          <button onClick={Inicio} className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l
           hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none
           focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 mt-20 mb-20">Comprar productos</button>
        </div>
      ) : (
        <div className="">
          {carrito.map((item) => (
            <div key={item.producto.id} className="flex flex-wrap items-center justify-between border-b p-8">
              <div className="flex items-center gap-4 mt-3 mb-3">
                <img
                  src={`${import.meta.env.VITE_API_URL}/static/fotosProducto/${item.producto.imagen || "sinFoto.jpg"}`}
                  alt={item.producto.nombre}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <p className="font-semibold">{item.producto.nombre}</p>
                  <p className="text-sm text-gray-500">Cantidad: {item.cantidad}</p>
                  <p className="text-sm text-gray-500">
                    Subtotal: {Number(item.producto.precio * item.cantidad).toFixed(2)} €
                  </p>
                </div>
              </div>
              <button
                onClick={() => eliminarDelCarrito(item.producto.id)}
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none
                 focus:ring-red-30 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium 
                 rounded-lg text-sm px-5 py-2.5 ml-2 mt-3 mb-3"
              >
                Eliminar
              </button>
            </div>
          ))}

          <div className="p-8">
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2 sr-only">
              Método de envío:
            </label>
            <select
              value={envioSeleccionado ?? ""}
              onChange={(e) => setEnvioSeleccionado(Number(e.target.value))}
              className="text-sky-600 font-semibold block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            >
              {envios.map(envio => (
                <option key={envio.id} value={envio.id} className="text-sky-500 font-bold">
                  {envio.nombre} (+{Number(envio.precio).toFixed(2)} €)
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap justify-between items-center p-8">
            <p className="text-xl font-bold mt-6">
              Total: {totalFinal.toFixed(2)} €
            </p>
            <div className="space-x-4 mt-6">
              <button
                onClick={vaciarCarrito}
                className="text-red-500"
              >
                Vaciar
              </button>
              <button className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 
              focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5"
                onClick={handlePagarConStripe}>
                Comprar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
