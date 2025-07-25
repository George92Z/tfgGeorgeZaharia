import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Producto } from "./Productos";
import Swal from 'sweetalert2';
export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

interface CartContextType {
  carrito: ItemCarrito[];
  añadirAlCarrito: (producto: Producto, cantidad: number) => void;
  eliminarDelCarrito: (productoId: number) => void;
  vaciarCarrito: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [carrito, setCarrito] = useState<ItemCarrito[]>(() => {
  const guardado = localStorage.getItem("carrito");
  if (guardado) {
    try {
      const datos: ItemCarrito[] = JSON.parse(guardado);
      return datos.map((item) => ({
        producto: {
          ...item.producto,
          precio: Number(item.producto.precio),
          stock: Number(item.producto.stock),
        },
        cantidad: Number(item.cantidad),
      }));
    } catch {
      localStorage.removeItem("carrito");
    }
  }
  return [];
});

  // Cargar desde localStorage al iniciar
 useEffect(() => {
  const guardado = localStorage.getItem("carrito");
  if (guardado) {
    try {
      const datos: ItemCarrito[] = JSON.parse(guardado);
      const carritoParseado = datos.map((item) => ({
        producto: {
          ...item.producto,
          precio: Number(item.producto.precio),
          stock: Number(item.producto.stock),
        },
        cantidad: Number(item.cantidad),
      }));
      setCarrito(carritoParseado);
    } catch (err) {
      console.error("Error al parsear el carrito:", err);
      localStorage.removeItem("carrito");
    }
  }
}, []);
  // Guardar en localStorage cada vez que se actualiza
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const añadirAlCarrito = (producto: Producto, cantidad: number) => {
  const existente = carrito.find(item => item.producto.id === producto.id);
  const cantidadActual = existente ? existente.cantidad : 0;
  const cantidadTotal = cantidadActual + cantidad;
  if (cantidadTotal > producto.stock) {
    setTimeout(() => {
        Swal.fire({
          icon: "warning",
          title: "Stock insuficiente",
          html: `Ya tienes <strong>${cantidadActual}/${producto.stock}</strong> unidades en la cesta. No puedes añadir más.`,
          focusConfirm: false,
          customClass: {
            confirmButton: "text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
          },
          buttonsStyling: false,
        });
      }, 0);
    return; // ❌ No añadir nada
  }

  // ✅ Si no supera el stock, actualizar el carrito
  setCarrito(prev => {
    if (existente) {
      return prev.map(item =>
        item.producto.id === producto.id
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      );
    }

    return [...prev, { producto, cantidad }];
  });
};

  const eliminarDelCarrito = (productoId: number) => {
    setCarrito(prev => prev.filter(item => item.producto.id !== productoId));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    Swal.fire({
      title: "Cesta vaciada!",
      icon: "success",
      focusConfirm: false,
      customClass: {
      confirmButton: "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
      },
      buttonsStyling: false // 👈 Importante para que usen tus clases
    });
  };

  return (
    <CartContext.Provider value={{ carrito, añadirAlCarrito, eliminarDelCarrito, vaciarCarrito }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de un CartProvider");
  return context;
}
