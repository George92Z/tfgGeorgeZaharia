import { Usuario } from "./home";
import { useState } from "react";
interface Props {
  usuarios: Usuario[];
  onEditar: (usuario: Usuario) => void;
}

export default function TablaUsuarios({ usuarios, onEditar }: Props) {
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 3;
  const totalPaginas = Math.ceil(usuarios.length / elementosPorPagina);

  const usuariosPaginados = usuarios.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );
  const renderNumerosDePagina = () => {
    const maxNumeros = 4; // máximo de páginas centrales visibles
    const numeros = [];
  
    if (totalPaginas <= maxNumeros + 2) {
      // Si hay pocas páginas, mostramos todas
      for (let i = 1; i <= totalPaginas; i++) {
        numeros.push(i);
      }
    } else {
      numeros.push(1); // Siempre mostrar el primero
  
      if (paginaActual > 3) {
        numeros.push("...");
      }
  
      const start = Math.max(2, paginaActual - 1);
      const end = Math.min(totalPaginas - 1, paginaActual + 1);
  
      for (let i = start; i <= end; i++) {
        numeros.push(i);
      }
  
      if (paginaActual < totalPaginas - 2) {
        numeros.push("...");
      }
  
      numeros.push(totalPaginas); // Siempre mostrar el último
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

  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Nombre</th>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Email</th>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuariosPaginados.map(u => (
            <tr key={u.id} className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-6 py-4">{u.nombre}</td>
              <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">{u.email}</td>
              <td className="px-6 py-4">
                <button type="button" className="text-gray-900 bg-grey border border-gray-300 me-2 mb-2" onClick={() => onEditar(u)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center-safe mt-10">
        <button  type="button"
              className="text-gray-900 bg-white border border-gray-300 me-1 ms-1"
        onClick={() => setPaginaActual(p => Math.max(p - 1, 1))} disabled={paginaActual === 1}>
            Anterior 
        </button>

      {renderNumerosDePagina()}

      <button  type="button"
              className="text-gray-900 bg-white border border-gray-300 me-1 ms-1"
       onClick={() => setPaginaActual(p => Math.min(p + 1, totalPaginas))} disabled={paginaActual === totalPaginas}>
          Siguiente
      </button>
    </div>
    </>
    
  );
}

