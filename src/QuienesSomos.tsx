import NavbarPage from "./navbar";
import Photo from "./Photo";
export default function QuienesSomos() {
  return (
    <>
      <NavbarPage titulo="Quienes somos" />
      <div className="max-w-4xl mx-auto px-4 py-10 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="grid gap-4">
                    <div>
                        <Photo ruta={`${import.meta.env.VITE_API_URL}/static/fotosWeb/descarga.jpeg`}>
                           <img className="h-auto max-w-full rounded-lg" src={`${import.meta.env.VITE_API_URL}/static/fotosWeb/descarga.jpeg`} alt=""/>
                        </Photo>
                    </div>
                    <div>
                        <p className="text-lg text-gray-400">
                            Nos apasiona la tradición
                        </p>
                    </div>
                    <div>
                        <Photo ruta={`${import.meta.env.VITE_API_URL}/static/fotosWeb/Rumania1.jpeg`}>
                           <img className="h-auto max-w-full rounded-lg" src={`${import.meta.env.VITE_API_URL}/static/fotosWeb/Rumania1.jpeg`} alt=""/>
                        </Photo>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div>
                        <p className="text-lg text-gray-400">
                            Nos importa mucho la salud del corazón
                        </p>
                    </div>
                    <div>
                        <Photo ruta={`${import.meta.env.VITE_API_URL}/static/fotosWeb/BlueWaterHeart.jpeg`}>
                           <img className="h-auto max-w-full rounded-lg" src={`${import.meta.env.VITE_API_URL}/static/fotosWeb/BlueWaterHeart.jpeg`} alt=""/>
                        </Photo>
                    </div>
                    <div>
                        <p className="text-lg text-gray-400">
                           Ayuda esoterica
                        </p>
                    </div>
                    <div>
                        <Photo ruta={`${import.meta.env.VITE_API_URL}/static/fotosWeb/Tormenta.avif`}>
                           <img className="h-auto max-w-full rounded-lg" src={`${import.meta.env.VITE_API_URL}/static/fotosWeb/Tormenta.avif`} alt=""/>
                        </Photo>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div>
                        <Photo ruta={`${import.meta.env.VITE_API_URL}/static/fotosWeb/hills.jpeg`}>
                           <img className="h-auto max-w-full rounded-lg" src={`${import.meta.env.VITE_API_URL}/static/fotosWeb/hills.jpeg`} alt=""/>
                        </Photo>
                        
                    </div>
                    <div>
                        <p className="text-lg text-gray-400">
                            Buscamos ayudarte
                        </p>
                    </div>
                    <div>
                        <Photo ruta={`${import.meta.env.VITE_API_URL}/static/fotosWeb/ojoTurco.jpg`}>
                           <img className="h-auto max-w-full rounded-lg" src={`${import.meta.env.VITE_API_URL}/static/fotosWeb/ojoTurco.jpg`} alt=""/>
                        </Photo>
                    </div>
                    <div>
                        <p className="text-lg text-gray-400">
                           No dudes en <a href="/Contacto">contactarnos</a>
                        </p>
                    </div>
                    
                </div>
                <div className="grid gap-4">
                    <div>
                        <Photo ruta={`${import.meta.env.VITE_API_URL}/static/fotosWeb/Aitch.jpeg`}>
                           <img className="h-auto max-w-full rounded-lg" src={`${import.meta.env.VITE_API_URL}/static/fotosWeb/Aitch.jpeg`} alt=""/>
                        </Photo>
                    </div>
                    <div>
                        <p className="text-lg text-gray-400">
                            Corazón sano, vida sana.
                        </p>
                    </div>
                    <div>
                        <Photo ruta={`${import.meta.env.VITE_API_URL}/static/fotosWeb/blueBerries.jpeg`}>
                           <img className="h-auto max-w-full rounded-lg" src={`${import.meta.env.VITE_API_URL}/static/fotosWeb/blueBerries.jpeg`} alt=""/>
                        </Photo>
                    </div>
                    <div>
                        <p className="text-lg text-gray-400">
                            Vendemos productos realmente buenos para ti.
                        </p>
                    </div>
                </div>
            </div>
      </div>
    </>
  );
}