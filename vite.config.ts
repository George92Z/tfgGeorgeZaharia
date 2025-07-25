import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  
  plugins: [react(), tailwindcss(),],
  server: {
    //esto es una parte para el servidor
    host: true, // Permite el acceso desde cualquier IP de la red
    port: 5173, 
         // Cambia el puerto si lo necesitas
    //esto es una parte para el proxy para que no tenga problema con mirar en otros dispositivos
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  }
})
