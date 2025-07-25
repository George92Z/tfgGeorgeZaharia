import { Usuario } from "./home";
import { useState } from "react";
interface Props {
  usuarios: Usuario[];
  onEditar: (usuario: Usuario) => void;
}

export default function TablaUsuarios({ usuarios, onEditar }: Props) {
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 10;
  const totalPaginas = Math.ceil(usuarios.length / elementosPorPagina);

  const usuariosPaginados = usuarios.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
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

  return (
    <>
    <div className='max-w-4xl mx-auto px-4'>
      <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-1 bg-gray-50 dark:bg-gray-800">Nombre</th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Email</th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosPaginados.map(u => (
              <tr key={u.id} className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-6 py-1">{u.nombre}</td>
                <td className="px-6 py-0 bg-gray-50 dark:bg-gray-800">{u.email.substring(0, 8) + "..."}</td>
                <td className="px-6 py-1 flex items-center justify-center">
                  <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5" onClick={() => onEditar(u)}><i className="fa-solid fa-user-plus"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-10 mb-10">
          <button  type="button"
                className="text-gray-900 bg-white border border-gray-300 me-1 ms-1"
          onClick={() => setPaginaActual(p => Math.max(p - 1, 1))} disabled={paginaActual === 1}>
              <i className="fa-solid fa-arrow-left text-black"></i> 
          </button>

        {renderNumerosDePagina()}

        <button  type="button"
                className="text-gray-900 bg-white border border-gray-300 me-1 ms-1"
        onClick={() => setPaginaActual(p => Math.min(p + 1, totalPaginas))} disabled={paginaActual === totalPaginas}>
            <i className="fa-solid fa-arrow-right text-black"></i> 
        </button>
      </div>
    </div>
      
      
    </>
    
  );
}

