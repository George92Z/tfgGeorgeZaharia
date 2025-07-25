import { useState } from "react";
import { useNavigate,  } from "react-router-dom";
import "./index.css";
import { useUser } from "./userContext";
import Swal from 'sweetalert2';
function Login() {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const navigate = useNavigate();
    const { access } = useUser();
    const clickar = () => {
        navigate("/register");
    };


    const handleLogin = () => {
        console.log(JSON.stringify({ email, pwd }));

        fetch("/api/usuarios/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, pwd }),
        })
        .then(async (res) => {
            if (!res.ok) {
                await Swal.fire({
                icon: "info",
                title: "Oops...",
                text: "Login incorrecto, inténtalo otra vez",
                focusConfirm: false,
                customClass: {
                confirmButton: "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
                },
                buttonsStyling: false //Importante para que usen tus clases
                });
                return;
            }
            return res.json();
        })
        .then((usuario) => {
            //Guardar usuario en localStorage
            access(usuario);
            if (usuario.rol === 1) {
                navigate("/home");
            } else {
                navigate("/");
            }
        })
        .catch(async () => {
           
        });
    };

    return (
        <>
            <div className="mt-10">
               
                <div className="flex flex-center items-center align-baseline space-x-3 rtl:space-x-reverse">
                    <img src={`${import.meta.env.VITE_API_URL}/static/fotosUsuario/logo.png`} className="h-30 me-0" />
                    <span className="mifuente text-sky-600 dark:text-sky-200 ms-0">Inima</span>
                </div>
                <div className="mt-6">
                    <label htmlFor="email">Email: </label>
                    <input
                        name="email"
                        placeholder="Introduce tu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <div className="mt-6">
                    <label htmlFor="pwd">Contraseña: </label>
                    <input
                        name="pwd"
                        type="password"
                        placeholder="Introduce tu contraseña"
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <div className="text-center mt-8">
                    <button
                        onClick={handleLogin}
                        type="button"
                        className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        Iniciar sesión
                    </button>
                </div>
                <p className="text-center mt-5">¿No tienes cuenta? <span onClick={clickar} className="raton">Regístrate</span>
                <br/>
                    o
                 <br />
                 <button className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br dark:focus:ring-cyan-800  font-medium rounded-lg text-sm px-5 py-2.5 mt-5" onClick={() => navigate("/")} >Modo invitado</button>
                </p>
            </div>
        </>
    );
}

export default Login;
