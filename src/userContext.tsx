import { createContext, useContext, useState, useEffect } from "react";
import { Usuario } from "./home";

interface UserContextType {
  usuario: Usuario | null;
  access: (usuario: Usuario) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({
  usuario: null,
  access: () => {},
  logout: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
  const stored = localStorage.getItem("usuario");
  if (stored && stored !== "undefined") {
    try {
      const parsed = JSON.parse(stored);
      parsed.id = Number(parsed.id);
      parsed.rol = Number(parsed.rol);
      setUsuario(parsed);
    } catch (error) {
      console.error("Error al parsear el usuario desde localStorage:", error);
      localStorage.removeItem("usuario");
    }
  }
}, []);

  const access = (usuario: Usuario) => {
    localStorage.setItem("usuario", JSON.stringify(usuario));
    setUsuario(usuario);
  };

  const logout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    window.location.href = "/login";
  };

  return (
    <UserContext.Provider value={{ usuario, access, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
