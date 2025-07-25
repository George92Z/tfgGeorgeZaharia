import { useState } from "react";
import { useUser } from "./userContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "./cartContext";
interface Props {
  titulo: string;
  children?: React.ReactNode;
}

export default function NavbarPage({ titulo, children }: Props) {
  const { usuario, logout } = useUser();
  const { vaciarCarrito } = useCart();
  console.log(usuario);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // <- estado para abrir/cerrar
  const clickUsuario = () => {
    navigate("/perfil");
  };
  const Pedidos = () => {
    navigate("/pedidosAdmin")
  }
  const Inicio = () => {
    navigate("/")
  };
  const misPedidos = () => {
    navigate("/misPedidos")
  };
  const home = () => {
    navigate("/home")
  };
  const miCesta = () =>{
    navigate("/miCesta")
  }
  const About = () => {
        navigate("/quienes-somos")
  };
  return (

    
    <nav className="bg-gradient-to-t from-white via-cyan-400 to-cyan-600 border-gray-200 mt-0
    dark:bg-gradient-to-b dark:from-cyan-900 dark:via-0% dark:to-black">
      <div className="w-screen flex flex-wrap items-center align-middle justify-between mx-auto p-4">
        <div className="relative">
          <img
            src={`${import.meta.env.VITE_API_URL}/static/fotosUsuario/logo.png`}
            className="h-23"
            onClick={() => {
              if (usuario && usuario.rol === 1) {
                home();
              } else {
                Inicio();
              }
            }}
          />
          <p className="self-center text-2xl font-semibold whitespace-nowrap logoTitle text-white textBorder absolute top-15 rotate-338 left-8 z-10">Inima</p>
        </div>
          
        
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 md:hidden"
          aria-expanded={isOpen}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`} id="navbar-default">
          
          <ul className="items-start md:items-center font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 mb-2 md:mb-0">

            <li className="w-full md:w-auto">
              <div className="flex flex-col md:flex-row items-center md:items-center gap-4">
                {children}
              </div>
            </li>


            {
              usuario?.rol === 1
                ? (
                  <>
                    {/* Menú de administrador */}
                    <li>
                      <a onClick={home} className={`block text-2xl md:text-lg rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 ${titulo === "Usuarios" ? "colorActive ratonActive": "color raton"}`}>Inicio </a>
                    </li>
                    <li>
                      <a onClick={Inicio} className={`block text-2xl md:text-lg rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 ${titulo === "Inicio" ? "colorActive ratonActive": "color raton"}`}>Productos</a>
                    </li>
                    <li>
                      <a onClick={Pedidos} className={`block text-2xl md:text-lg rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 ${titulo === "Pedidos" ? "colorActive ratonActive": "color raton"}`}>Pedidos</a>
                    </li>
                  </>
                )
                : (
                  <>
                    {/* Menú de cliente */}
                    <li>
                      <a onClick={About} className={`block text-2xl md:text-lg rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 ${titulo === "Quienes somos" ? "colorActive ratonActive": "color raton"}`}>Quienes somos</a>
                    </li>
                    <li>
                      <a onClick={Inicio} className={`block text-2xl md:text-lg rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 ${titulo === "Inicio" ? "colorActive ratonActive": "color raton"}`}>Inicio</a>
                    </li>
                    <li>
                      <a onClick={miCesta} className={`block text-2xl md:text-lg rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 ${titulo === "Mi cesta" ? "colorActive ratonActive": "color raton"}`}>Cesta</a>
                    </li>
                    <li>
                      <a onClick={misPedidos} className={`block text-2xl md:text-lg rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 mb-2 md:mb-0 ${titulo === "Mis pedidos" ? "colorActive ratonActive": "color raton"}`}>Mis pedidos</a>
                    </li>
                  </>
                )
            }
            
            
            <li>
              {!usuario ? (
                <button
                  onClick={() => navigate("/login")}
                  className="mt-2 mb-2 md:mr-10 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br dark:focus:ring-cyan-800  font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Iniciar sesión
                </button>
              ) : (
                <a className="block">{usuario && (
                    <div className="flex items-center gap-3  mt-4 mb-0 md:mr-2 md:mb-2 md:mt-0 scale-120 ml-4 md:scale-100 md:ml-0">
                      <div onClick={clickUsuario} className="flex items-center gap-2 cursor-pointer">
                        <img
                          src={`${import.meta.env.VITE_API_URL}/static/fotosUsuario/${encodeURIComponent(usuario.foto || "fotoUsuario.jpg")}`}
                          onError={(e) => {
                            e.currentTarget.onerror = null; // Evita bucle infinito
                            e.currentTarget.src = `${import.meta.env.VITE_API_URL}/static/fotosUsuario/fotoUsuario.jpg`;
                          }}
                          alt="Foto del usuario"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium md:text-white text-sky-300">{usuario.nombre}</p>
                          <p className="text-sm text-sky-300 md:text-white">{usuario.email.substring(0, 8) + "..."}</p>
                        </div>
                      </div>
                      <button onClick={() => {
                        logout();
                        vaciarCarrito();
                        }} 
                        className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 
                        focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 
                        font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        <i className="fa-solid fa-right-from-bracket"></i>
                      </button>
                    </div>
                  )}
                </a>
              )}
            
              
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

