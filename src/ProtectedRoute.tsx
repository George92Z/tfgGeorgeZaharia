import { useUser } from "./userContext";
import { useNavigate,  } from "react-router-dom";
export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { usuario } = useUser();
    const navigate = useNavigate();
    if (!usuario) {
        navigate("/");
    }

    if (usuario?.rol != 1) {
        navigate("/");
    }

  return children;
}