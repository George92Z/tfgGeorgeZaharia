import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
interface Props {
  ruta: string;
  children?: React.ReactElement;
}
export default function Photo({ruta,children}:Props) {
  return (
    <PhotoProvider>
      <PhotoView src={ruta}>{/*Obviamente en vez de poner children react.ReactNode el codigo de la libreria solo espera 1 elemento (img) por lo que tenemos que poner children reactElement */}
        {children}
      </PhotoView>
    </PhotoProvider>
  );
}