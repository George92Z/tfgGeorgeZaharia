import { useEffect, useState } from "react";
import { Usuario } from "./home";
import './App.css'
interface Props {
  usuario: Usuario;
  onClose: () => void;
  onSave: (usuario: Usuario) => void;
}

export default function ModalUsuario({ usuario, onClose, onSave }: Props) {
  const [editado, setEditado] = useState<Usuario>({ ...usuario });

  // ✅ Cuando cambia el usuario seleccionado → reinicia el formulario
  useEffect(() => {
    console.log("🧠 habilitado llega como:", usuario.activo);
    setEditado({ ...usuario });
    setIsActive(usuario.activo); // sincroniza el estado activo también
    
  }, [usuario]);
  
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditado({ ...editado, [e.target.name]: e.target.value });
  };
  const [isActive, setIsActive] = useState<boolean>(editado.activo);
    
    
  const text = isActive? 'Usuario en alta' : 'Usuario deshabilitado'; //cambiar el texto dependiendo del booleano
  const buttonClassName = isActive? 
  'text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' : 'text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2';
  console.log(isActive)
  const handleClick = () => {
    setIsActive(!isActive);
    setEditado(prev => ({ ...prev, activo: !isActive }));
  };
  return (
    <>
      

        

      <div className="mt-10">
        <div className="mt-6">
          <label htmlFor="nombre">Nombre: </label>
          <input name="nombre" placeholder="Nombre" value={editado.nombre} onChange={handleChange}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </div>
        <div className="mt-6">
          <label htmlFor="nombre">Email: </label>
          <input name="email" placeholder="Email" value={editado.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div className="mt-6">
          <label htmlFor="edad">Edad: </label>
          <input name="edad" placeholder="Edad" value={editado.edad.toString()} onChange={handleChange}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div className="mt-6">
          <label htmlFor="nombre">Contraseña: </label>
          <input type="password" name="contrasenia" placeholder="Contraseña" value={editado.contrasenia.toString()} onChange={handleChange}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
      </div>
      <div className="tabla">
        <button className={`${buttonClassName} mt-5 mb-5`} onClick={handleClick}>{text}</button>
      </div>
      <div className="flex justify-center">
        <button className="me-5" onClick={() => onSave(editado)}>Guardar</button>
        <button className="ms-5" onClick={onClose}>Cancelar</button>
      </div>

      
    </>
  );
}