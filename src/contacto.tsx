import NavbarPage from "./navbar";
import Swal from "sweetalert2";
export default function Contacto() {
  return (
    <>
    <NavbarPage titulo=""/>
    <div className="text-center mb-20 md:mb-70">
        <h1 className="text-gray-600 mt-20 mb-10 md:mb-20">¿En qué podemos ayudarte?</h1>

        <div className="flex flex-col items-center gap-4">
            <a
            href="https://www.instagram.com/gg_starz"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none 
                focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-white raton color"
            >
            <i className="fa-brands fa-instagram mr-2 text-lg"></i> Contactar por Instagram
            </a>
            <a
            href="https://www.instagram.com/fateandfeels"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-blue-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none 
                focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-white raton color"
            >
            <i className="fa-brands fa-instagram mr-2 text-lg"></i> Ayuda Esoterica
            </a>
            <a
            href="tel:+34643297606"
            onClick={(e) => {
                const isMobile = /Mobi|Android/i.test(navigator.userAgent);
                if (!isMobile) {
                e.preventDefault();
                    Swal.fire({
                        title: 'Opa...',
                        text: 'Solo disponible para moviles',
                        icon: 'info',
                        confirmButtonText: 'OK',
                        focusConfirm: false,
                        customClass: {
                        confirmButton: "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
                        },
                        buttonsStyling: false // 👈 Importante para que usen tus clases
                    });
                }
            }}
            className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300
                dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 raton color"
            >
            <i className="fa-solid fa-phone mr-2 text-lg"></i> Llamar al 643 297 606
            </a>
        </div>
    </div>
    </>
    
  );
}