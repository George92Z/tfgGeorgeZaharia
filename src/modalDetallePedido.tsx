// ModalDetallesPedido.tsx
import { Producto } from "./Pedidos";

interface Props {
  pedidoId: number;
  productos: Producto[];
  onClose: () => void;
}

export default function ModalDetallesPedido({ pedidoId, productos, onClose }: Props) {
  return (
    <>
      <h2 className="text-xl font-bold mb-4">Detalles del pedido #{pedidoId}</h2>

      {/* Productos con scroll */}
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
      {productos.map((p) => (
          <div key={p.id} className="flex items-center gap-4 border-b pb-3">
          <img
              src={`${import.meta.env.VITE_API_URL}/static/fotosProducto/${p.imagen || "sinFoto.jpg"}`}
              alt={p.nombre}
              className="w-14 h-14 object-cover rounded"
          />
          <div className="flex-1 overflow-hidden">
              <p className="font-medium truncate">{p.nombre}</p>
              <p className="text-sm text-gray-500">Cantidad: {p.cantidad}</p>
              <p className="text-sm text-gray-500">
              Precio: {Number(p.precio).toFixed(2)} € — Subtotal: {(p.precio * p.cantidad).toFixed(2)} €
              </p>
          </div>
          </div>
      ))}
      </div>

      <button
      className="mt-6 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
      onClick={onClose}
      >
      Cerrar
      </button>
    </>
   
            
  );
}