import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function Footer() {
    const navigate = useNavigate();
    const Inicio = () => {
        navigate("/")
    };
    const Contacto = () => {
        navigate("/Contacto")
    };
    const About = () => {
        navigate("/quienes-somos")
    };
    const location = useLocation();
    const hideFooter = ["/login", "/register"].includes(location.pathname);

    if (hideFooter) return null;
  return (
   <footer className="shadow-sm bg-gradient-to-b from-white via-cyan-400 to-cyan-600
  dark:bg-gradient-to-t dark:from-cyan-900 dark:via-0% dark:to-black">
    <div className="w-full max-w-screen-xl mx-auto px-4 md:py-8">
        <div className="sm:flex sm:items-center mt-10 sm:justify-between">
            <h1 onClick={Inicio} className="flex items-center align-middle sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src={`${import.meta.env.VITE_API_URL}/static/fotosUsuario/logo.png`} className="h-14" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap mifuente text-white">Inima</span>
            </h1>
            <ul className="flex flex-wrap items-center mb-0 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a onClick={About} className="hover:underline me-4 md:me-6 colorFooter ratonFooter">Quienes somos</a>
                </li>
                <li>
                    <a onClick={Contacto} className="hover:underline colorFooter ratonFooter">Contact</a>
                </li>
            </ul>
        </div>
        <hr className="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-2" />
        <span className="block text-sm text-white sm:text-center dark:text-gray-400 mb-4">© 2025 <a href="https://flowbite.com/" className="hover:underline colorFooter ratonFooter">Inima™</a>. All Rights Reserved.</span>
    </div>
</footer>
  );
}
