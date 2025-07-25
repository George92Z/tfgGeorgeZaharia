import { useState } from "react";

interface Props {
  onFiltrar: (nombre?: string) => void;
}

export default function FiltroProductos({ onFiltrar }: Props) {
  const [textoNombre, setTextoNombre] = useState("");

  const manejarInputNombre = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextoNombre(e.target.value);
  };

  const manejarBuscar = () => {
    onFiltrar(textoNombre.trim() || undefined);
  };

  const limpiarFiltro = () => {
    setTextoNombre("");
    onFiltrar(undefined);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-6 mt-6">
      <div className="flex items-center w-full sm:w-auto">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={textoNombre}
          onChange={manejarInputNombre}
          className="p-2 rounded md:w-115"
        />
        <button
          type="button"
          onClick={manejarBuscar}
          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          <i className="fa fa-search"></i>
        </button>
      </div>

      {textoNombre && (
        <button
          type="button"
          onClick={limpiarFiltro}
          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          x
        </button>
      )}
    </div>
  );
}
