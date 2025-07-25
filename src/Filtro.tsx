import { useState } from "react";

interface FiltroUsuariosProps {
  onFiltrar: (filtros?: { nombre?: string; email?: string }) => void;
}

function Filtro({ onFiltrar }: FiltroUsuariosProps) {
  const [textoNombre, setTextoNombre] = useState("");
  const [textoEmail, setTextoEmail] = useState("");

  const manejarInputNombre = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextoNombre(e.target.value);
  };

  const manejarInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextoEmail(e.target.value);
  };

  const buscarNombre = () => {
    onFiltrar({
      nombre: textoNombre.trim() || undefined,
      email: textoEmail.trim() || undefined,
    });
  };

  const buscarEmail = () => {
    onFiltrar({
      nombre: textoNombre.trim() || undefined,
      email: textoEmail.trim() || undefined,
    });
  };

  const limpiarFiltros = () => {
    setTextoNombre("");
    setTextoEmail("");
    onFiltrar(); // fetch sin filtros
  };

  return (
    <div className="flex flex-wrap ">
      {/* Buscar por Nombre */}
      <div className="flex items-center w-full sm:w-auto mb-3 md:mb-0">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={textoNombre}
          onChange={manejarInputNombre}
          className="border rounded w-full sm:w-72"
        />
        <button
          type="button"
          onClick={buscarNombre}
          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
           <i className="fa fa-search"></i>
        </button>
      </div>

      {/* Buscar por Email */}
      <div className="flex items-center w-full sm:w-auto mb-3 md:mb-0 ml-0 md:ml-2">
        <input
          type="text"
          placeholder="Buscar por email"
          value={textoEmail}
          onChange={manejarInputEmail}
          className="border rounded w-full sm:w-72"
        />
        <button
          type="button"
          onClick={buscarEmail}
          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
           <i className="fa fa-search"></i>
        </button>
      </div>

      {/* Limpiar */}
      {(textoNombre || textoEmail) && (
        <button
          onClick={limpiarFiltros}
          className="ml-2 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          x
        </button>
      )}
    </div>
  );
}

export default Filtro;
