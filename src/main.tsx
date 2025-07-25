import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'flowbite';
import { UserProvider } from './userContext.tsx';
import { CartProvider } from './cartContext.tsx';
createRoot(document.getElementById('root')!).render(
    <UserProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </UserProvider>
  ,
)
