import { useState } from "react";
import { Producto } from "./Productos";

interface Props {
  productos: Producto[];
  onClickProducto: (producto: Producto) => void;
}

export default function GridProductos({ productos ,onClickProducto }: Props) {
  
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;
  const totalPaginas = Math.ceil(productos.length / productosPorPagina);
  const API_URL = import.meta.env.VITE_API_URL;
  const productosPaginados = productos.slice(
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

  return (
    <>
    
    
    <div className="max-w-6xl mx-auto px-4 mt-10">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6 xl:gap-7">
        {productosPaginados.map((p) => (
          <div
            key={p.id}
            onClick={() => onClickProducto(p)}
            className="dark:bg-none dark:border-neutral-500 cursor-pointer shadow-xl/40 rounded-lg p-4 dark:shadow-lg/30 dark:shadow-white hover:shadow-xl transition"
          >
            <img
              src={p.imagen ? `${API_URL}/static/fotosProducto/${p.imagen}` : `${API_URL}/static/fotosProducto/sinFoto.jpg`}
              alt={p.nombre}
              className="w-full aspect-[4/3] object-cover rounded mb-3"
            />
            <h3 className="text-sm md:text-lg xl:text-lg font-semibold text-slate-500 dark:text-white">{p.nombre}</h3>
            <p className={`text-gray-500 text-lg  ${p.stock <= 5 ?"bg-amber-200":"bg-cyan-200"} w-fit px-2 font-semibold italic precio mt-3`}>{p.stock <= 5 ?(<><i className="fa-solid fa-circle-exclamation text-amber-600"></i></>):(<></>)} {p.precio}€</p>
          </div>
        ))}
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
    </div>

    </>
  );
}
