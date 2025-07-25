import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { useUser } from "./userContext";
import Swal from 'sweetalert2';
function Register() {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [direccion, setDireccion] = useState("");
    const { access } = useUser();
    const [foto, setFoto] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const navigate = useNavigate();

    const clickar = () => {
        navigate("/login");
    };

    const handleRegister = () => {
        // Validación básica
        if (!nombre || !email || !pwd) {
             Swal.fire({
                icon: "warning",
                title: "Opaaaaa",
                text: "Por favor, rellena todos los campos obligatorios!",
                focusConfirm: false,
                customClass: {
                confirmButton: "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
                },
                buttonsStyling: false // 👈 Importante para que usen tus clases
            });
            return;
        }

        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("email", email);
        formData.append("pwd", pwd);
        formData.append("direccion", direccion);
        if (foto) {
            formData.append("foto", foto);
        }

        fetch("api/usuarios/register", {
            method: "POST",
            body: formData
        })
        .then(async (res) => {
            const data = await res.json();

            if (!res.ok) {
                // Mostrar alerta y lanzar error para cortar la cadena
                Swal.fire({
                    icon: "warning",
                    title: "Opaaaaa",
                    text: `${data.error || "Error desconocido"}`,
                    focusConfirm: false,
                    customClass: {
                    confirmButton: "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
                    },
                    buttonsStyling: false // 👈 Importante para que usen tus clases
                        });

                        throw new Error(data.error || "Error en el registro");
                    }

            return data;
        })
        .then((usuario) => {
            Swal.fire({
                title: 'Muy bien!',
                text: 'Tu cuenta ya se ha creado.',
                icon: 'success',
                focusConfirm: false,
                customClass: {
                confirmButton: "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
                },
                buttonsStyling: false // 👈 Importante para que usen tus clases
                });

            access(usuario); // ✅ Solo se ejecuta si todo salió bien
            navigate("/");
        })
        .catch((error) => {
            console.error("Error en el registro:", error);
            // No necesitas mostrar alerta aquí si ya se mostró arriba
        });
  
    };
    return (
        <>
            <div className="mt-10  mb-5">
                <div className="flex flex-center items-center align-baseline space-x-3 rtl:space-x-reverse">
                    <img src={`${import.meta.env.VITE_API_URL}/static/fotosUsuario/logo.png`} className="h-30 me-0" />
                    <span className="mifuente text-sky-600 dark:text-sky-200 ms-0">Inima</span>
                </div>

                <div className="mt-2">
                    <label htmlFor="nombre">Nombre: </label>
                    <input
                        name="nombre"
                        placeholder="Introduce tu nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white w-full p-2.5"
                    />
                </div>

                <div className="mt-6">
                    <label htmlFor="email">Email: </label>
                    <input
                        name="email"
                        placeholder="Introduce tu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white p-2.5"
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white block w-full p-2.5"
                    />
                </div>

                <div className="mt-6">
                    <label htmlFor="direccion">Dirección: </label>
                    <input
                        name="direccion"
                        placeholder="Introduce tu dirección"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white block w-full p-2.5"
                    />
                </div>

                <div
                    className="flex items-center justify-center w-full mt-6"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files?.[0];
                        if (file) {
                        setFoto(file);
                        setPreview(URL.createObjectURL(file));
                        }
                    }}
                    >
                    <label
                        htmlFor="foto"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer 
                        bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-800 dark:border-gray-600 dark:hover:border-gray-500"
                    >
                        {preview ? (
                        <img
                            src={preview}
                            alt="Previsualización"
                            className="h-full object-contain rounded-lg"
                        />
                        ) : (
                        <div className="flex flex-col items-center justify-center pt-2 pb-6">
                            <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                            >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Haz clic para subir</span> o arrastra aquí
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, JPEG, GIF, AVIF</p>
                        </div>
                        )}
                        <input
                        id="foto"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                            setFoto(file);
                            setPreview(URL.createObjectURL(file));
                            }
                        }}
                        />
                    </label>
                    </div>

                <div className="text-center mt-8">
                    <button
                        onClick={handleRegister}
                        type="button"
                        className="text-gray-900 bg-gradient-to-r from-green-200 to-green-400 hover:bg-gradient-to-l hover:from-green-200 hover:to-green-400 focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        Registrarse
                    </button>
                </div>

                <p className="text-center">¿Ya tienes cuenta? <span onClick={clickar} className="raton">Iniciar sesión</span></p>
            </div>
        </>
    );
}

export default Register;
