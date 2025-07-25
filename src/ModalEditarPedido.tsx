import { useState, useEffect } from "react";
import {MetodoEnvio} from './cesta';
import {Pedido} from './Pedidos';
interface Props {
  pedido: Pedido;
  envios: MetodoEnvio[];
  onClose: () => void;
  onSave: (pedidoActualizado: Pedido) => void;
}

export default function ModalEditarPedido({ pedido, envios, onClose, onSave }: Props) {
  const [editado, setEditado] = useState<Pedido>({ ...pedido });

  useEffect(() => {
   const formatToInputDate = (fecha: string | Date) => {
    let d = new Date(fecha);

    // Si la fecha es inválida
    if (isNaN(d.getTime())) {
        d = new Date();
        d.setDate(d.getDate() + 1); // Sumar un día
    }

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
    };
    
    setEditado({ ...pedido,fecha_pedido: formatToInputDate(pedido.fecha_pedido),
    fecha_entrega: formatToInputDate(pedido.fecha_entrega),});
  }, [pedido]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditado({
      ...editado,
      [name]: name === 'envio_id' || name === 'total' ? Number(value) : value
    });
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "total") {
      let num = parseFloat(value);
      if (isNaN(num) || num < 0) num = 0.01;

      setEditado(prev => ({
        ...prev,
        total: parseFloat(num.toFixed(2)), // ✅ ahora es un number
      }));
    }
  };
  return (
    <div className="max-w-lg mx-auto p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Editar pedido</h2>
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">

        <div>
          <label htmlFor="fecha_pedido">Fecha del Inicio:</label>
          
          <input
            type="date"
            name="fecha_pedido"
            value={editado.fecha_pedido}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="fecha_entrega">Fecha del Entrega:</label>
          <input
            type="date"
            name="fecha_entrega"
            value={editado.fecha_entrega}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="estado">Estado:</label>
          <select
            name="estado"
            value={editado.estado}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="pendiente">Pendiente</option>
            <option value="enviado">Enviado</option>
            <option value="entregado">Entregado</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>

        <div>
          <label htmlFor="envio_id">Tipo de envío:</label>
          <select
            name="envio_id"
            value={editado.envio}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {envios.map((envio) => (
              <option key={envio.id} value={envio.id}>
                {envio.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="total">Total:</label>
          <input
            type="number"
            step="0.01"
            name="total"
            value={editado.total}
            onChange={handleChange}
            onBlur={handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => onSave(editado)}
          className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Guardar
        </button>
        <button
          onClick={onClose}
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
