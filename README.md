TÉCNICO SUPERIOR EN DESARROLLO DE APLICACIONES

MULTIPLATAFORMA (IFC302)

MÓDULO: PROYECTO

CURSO: 2024-2025

CONVOCATORIA: (junio 2025)

INIMA

**PROFESOR-COORDINADOR: Bonet Pérez Víctor**

**AUTOR: ZAHARIA GEORGE ALEXANDRU**

[**Introducción**](#_heading=) **2**

[**Relación con proyectos similares**](#_heading=) **5**

[**Tecnologías y herramientas empleadas**](#_heading=) **5**

[**Planificación temporal**](#_heading=) **6**

[**Desarrollo del proyecto**](#_heading=) **7**

**[Conclusiones](#_heading=) 5**

**Glosario 9**

**[Bibliografía](#_heading=) 10**

**[Manual](#_heading=) de instalación 10**

**Manual de usuario**

**12**

1\) Introducción

**1.1 Motivación:**

Este documento tiene como objetivo presentar la memoria del proyecto
final de la aplicación web llamada INIMA, una tienda en línea orientada
a la venta de productos saludables y de suplementación. El desarrollo
del proyecto surge de una necesidad personal: disponer de un espacio en
línea confiable que ofrezca productos beneficiosos para la salud real,
más allá de la oferta comercial habitual centrada únicamente en el
crecimiento muscular. INIMA propone un enfoque que mezcla
suplementación, medicina natural y bienestar integral.

**1.2 Definición:**

El diseño de INIMA se ha centrado en ofrecer una experiencia de usuario
sencilla, agradable y funcional. Se ha dividido en distintos módulos:
frontend, backend y base de datos. El frontend se ha desarrollado con
React y Tailwind CSS, mientras que el backend utiliza Flask con MySQL
para el almacenamiento de datos. El diseño responsive permite adaptarse
correctamente a distintos tamaños de pantalla. La web también permite
simulación de pago con stripe.

La base de datos se ha modelado en MySQL Workbench, organizando
entidades como usuarios, productos, pedidos, detalles de pedido y
métodos de envío.

**1.3 Objetivos:**

**OG1: Barra de navegación horizontal (navbar)**

OE1.1: Diseño del navbar

OE1.2: Dependiendo de la página que aparezca un filtro de búsqueda

OE1.4: Redirección a pantallas de quienes somos (cliente-modo invitado)

OE1.5: Cerrar sesión (Redirección al login y quitar de localStorage el
usuario logueado)

OE1.6: Redirección al perfil de usuario

**OG2: Sistema de login**

OE2.1: Diseño de la interfaz de login

OE2.2: botón de modo invitado

OE2.3: link para ir a la página de registro si no tienes cuenta.

**OG3: Gestión de productos (Si el usuario es admin)**

OE3.1: Creación de productos

OE3.2: Modificación de productos.

OE3.3: Borrar el producto.

**OG4: Vista de productos (Si el usuario es normal/modo invitado)**

OE4.1: Click en el producto

OE4.2: Ver detalles del producto

OE4.3: Añadir al carrito

**OG5: Vista de usuarios (Si el usuario es admin)**

OE5.1: Lista de usuarios

OE5.2: botón para ver los detalles de los usuarios

**OG6: Vista y gestión de pedidos (Si el usuario es admin)**

OE6.1: Lista de pedidos

OE6.2: botón para editar la información, fecha, tipo de envío del
pedido.

OE7.4: Vista alternativa si no hay pedidos para que no aparezca vacía la
lista.

**OG7: Vista y gestión de pedidos (Si el usuario es cliente)**

OE7.1: Lista de pedidos.

OE7.2: botón con modal para borrar/cancelar pedido.

OE7.3: botón con modal para cancelar/borrar el pedido.

OE7.4: Vista alternativa si no tienes pedidos.

**OG8: Vista y gestión de la cesta (Si el usuario es cliente)**

OE8.1: Lista de productos con un botón de borrar producto de la cesta.

OE8.2: Botón para eliminar el producto de la lista

OE8.3: lista para seleccionar métodos de envío.

OE8.4: botón para vaciar la cesta.

OE8.5: botón para comprar.

OE8.6: Vista alternativa si la cesta está vacía.

**OG9: vista y gestión de perfil (Si el usuario es cliente)**

OE9.1: Ver los datos y la foto de perfil de tu usuario.

OE9.2: Botón más modal para editar el usuario

**OG10: vista y gestión de perfil (Si el usuario es cliente)**

OE10.1: Ver los datos y la foto de perfil de tu usuario.

OE10.2: Botón más modal para editar el usuario

**OG11: Sistema de registro**

OE11.1: Diseño de la interfaz de registro.

OE11.2: formulario y subir imagen.

OE11.3: link para ir a la página de login.

**OG12: Página quienes somos**

OE12.1: Accesibilidad desde el footer/navbar (si eres cliente/invitado)

OE12.2: Diseño con fundamentos e imágenes representativas de la página
web

OE12.3: link hacía la página de contacto.

**OG13: Página contacto**

OE13.1: Accesibilidad desde el footer

OE13.2: Diseño de la página

> OE13.3: 3 botones con diferentes links, 2 para Instagram y 1 para
> llamar al número de la empresa

**OG14: Cobros simulados mediante stripe**

OE14.1: Al hacer pedido implementa un pago simulado.

**OG15: Cambio de tema claro/oscuro**

OE15.1: Tanto en el móvil como en el navegador.

2\) Relación con proyectos similares:

Existen en el mercado diversas plataformas que ofrecen productos
relacionados con el fitness y la suplementación, entre ellas:

\- Decathlon: Tienda deportiva con una amplia gama de productos
relacionados con múltiples disciplinas.\
- Prozis: Especializada en suplementación deportiva y ropa fitness.\
- MyProtein: Similar a Prozis, centrada en suplementación y productos
para el crecimiento muscular.

INIMA se diferencia al enfocarse en la salud integral, combinando
productos tradicionales como hierbas medicinales, miswak, jalea real, y
otros productos naturales con suplementación verificada científicamente.
El diseño busca transmitir seguridad y ligereza al usuario. Además, la
web ha sido desarrollada desde cero, lo que permite una mejor
personalización y estética visual ajustada a las necesidades futuras.

3\) TECNOLOGÍAS Y HERRAMIENTAS EMPLEADAS PARA EL

PROYECTO

Para la implementación del proyecto se han utilizado las siguientes
tecnologías:

Frontend:\
- React 19.1.0

\- react-photo-view 1.2.7\
- TypeScript 5.7.3 + ESLint 8.31.1\
- Tailwind CSS 4.1.6\
- React Router DOM 7.5.1\
- Font Awesome 6.7.2\
- SweetAlert2 11.21.0

\- stripe 18.1.1

Backend (realizado en python):\
- Flask 3.1.0\
- flask-cors 5.0.1\
- mysql-connector-python 9.3.0\
- python-dotenv 1.1.0

(Cobros simulados)

\- stripe 12.1.0

Otras herramientas:\
- MySQL Workbench\
- Visual Studio Code 1.100.2

El frontend y backend están separados y se comunican mediante peticiones
HTTP. La autenticación se maneja mediante el almacenamiento local de los
datos del usuario una vez iniciada la sesión. Se emplean alertas
visuales con SweetAlert2 para mejorar la experiencia del usuario.

4\) Planificación temporal del proyecto

![Gráfico El contenido generado por IA puede ser
incorrecto.](media/media/image20.png){width="5.843323490813648in"
height="4.206237970253718in"}

5\) Desarrollo del proyecto

![Interfaz de usuario gráfica El contenido generado por IA puede ser
incorrecto.](media/media/image16.png){width="6.0in"
height="3.579861111111111in"}

6\) Conclusiones

**6.1 Objetivos alcanzados**

A lo largo del desarrollo del proyecto, hemos logrado cumplir la mayoría
de los objetivos planteados en el apartado 3. Entre ellos destacan:

La implementación de una aplicación funcional que gestiona correctamente
usuarios, productos y pedidos.

La integración con una base de datos MySQL, asegurando la persistencia y
la integridad de los datos.

La creación de una interfaz de usuario intuitiva que permite la
navegación fluida y la interacción con las funcionalidades principales
del sistema.

La simulación de pagos con la tecnología Stripe.

Sin embargo, no todos los objetivos iniciales se han podido completar.
En particular, se planteó en un principio la inclusión de un sistema de
pago online, que finalmente se pospuso a petición del cliente, quien
consideró más adecuado implementarlo en una fase futura del proyecto.
Del mismo modo, algunas funcionalidades secundarias relacionadas con la
personalización avanzada de productos fueron descartadas para no
comprometer los plazos de entrega y centrarnos en la estabilidad del
sistema base.

En general, podemos decir que los objetivos generales del proyecto sí se
han cumplido, lo que indica que la planificación ha sido adecuada y la
toma de decisiones ha sido efectiva, aunque siempre hay margen de
mejora.

A continuación, se detallan los requisitos funcionales y no funcionales
del sistema:

Requisitos funcionales:\
- Registro e inicio de sesión de usuarios.\
- Visualización de productos clasificados.\
- Carrito de compra con persistencia en localStorage.\
- Realización y gestión de pedidos.\
- Panel de administración con edición de pedidos.

Requisitos no funcionales:\
- Interfaz intuitiva y accesible.\
- Persistencia de datos con MySQL.\
- Tiempo de respuesta óptimo.\
- Adaptabilidad para futuras mejoras como los tokens de sesión, filtrar
los pedidos\...

**6.2 Conclusiones del trabajo y personales**

Este proyecto ha sido sin duda una experiencia enriquecedora a nivel
técnico y personal. Nos ha permitido poner en práctica una gran parte de
los conocimientos adquiridos durante el curso, así como enfrentarnos a
nuevos retos que nos han hecho crecer como programadores.

Uno de los aspectos más positivos ha sido aprender a trabajar con
tecnologías de backend y frontend de forma integrada, mejorando la
comunicación entre distintas partes de la aplicación. También hemos
aprendido la importancia de una buena estructuración del código, del
control de versiones y de la gestión de errores.

Aunque ha habido momentos especialmente desafiantes ---como la gestión
del stock y la implementación del sistema de pedidos---, hemos sido
capaces de resolverlos gracias a la investigación, la consulta de
documentación y el trabajo en equipo.

Este proyecto nos ha dejado claro que en futuros desarrollos será
fundamental dedicar más tiempo a la fase de análisis y diseño, ya que
una buena planificación facilita enormemente la implementación
posterior.

**6.3 Vías futuras**

El proyecto actual sienta las bases para futuras mejoras y ampliaciones.
Algunas de las posibles vías de desarrollo son:

Versión con dominio: Crear una versión de la aplicación con dominio.

Sistema de pago integrado: Incluir pasarelas de pago real y funcional
como Stripe o PayPal directamente en la app para permitir compras
seguras y rápidas sin depender del modo de prueba.

Panel de administración avanzado: Con más estadísticas, gestión de
envíos y control de incidencias.

Notificaciones en tiempo real: A través de correo electrónico o
notificaciones push para avisar sobre cambios en pedidos o promociones.

Sistema de opiniones o valoraciones: Que permita a los usuarios dejar
feedback sobre los productos o servicios recibidos.

Estas mejoras no solo harían la aplicación más completa, sino que
también podrían convertirla en un producto aún más competitivo y útil
para el cliente final.

7\) Glosario:

**Frontend**: Parte visual del proyecto con la que interactúa el
usuario. En este proyecto, se ha desarrollado con React, Tailwind CSS y
Vite.

**Backend**: Lógica del servidor encargada de gestionar las peticiones,
la base de datos y la seguridad. Se ha implementado con Flask en Python.

**React**: Biblioteca de JavaScript que permite construir interfaces de
usuario mediante componentes reutilizables.

**Tailwind** **CSS**: Framework de estilos basado en clases utilitarias,
que facilita la creación de diseños responsive y personalizados.

**Flask**: Framework web de Python utilizado para crear aplicaciones del
lado del servidor de forma ligera y flexible.

8\) Bibliografía:

React: [[https://react.dev/]{.underline}](https://react.dev/)

Stripe:
[[https://docs.stripe.com/]{.underline}](https://docs.stripe.com/)

Python:
[[https://docs.python.org/3/]{.underline}](https://docs.python.org/3/)

SweetAlert2:
[[https://sweetalert2.github.io/#usage]{.underline}](https://sweetalert2.github.io/#usage)

Tailwind CSS:
[[https://v2.tailwindcss.com/docs]{.underline}](https://v2.tailwindcss.com/docs)

LocalStorage:
[[https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage]{.underline}](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

Photo Viewer:
[[https://github.com/MinJieLiu/react-photo-view]{.underline}](https://github.com/MinJieLiu/react-photo-view)

9\) Anexo A. Manual de instalación:

**Requisitos previos**

Antes de comenzar, asegúrate de tener instalado lo siguiente:

Node.js (recomendado v18 o superior):
[[https://nodejs.org/]{.underline}](https://nodejs.org/)

MySQL Server (puede usarse a través de MySQL Workbench o XAMPP, que
incluye phpMyAdmin)

Git (opcional, pero recomendado para clonar el repositorio)

Un editor de código como Visual Studio Code

**Configuración de la base de datos**

Abre MySQL Workbench o phpMyAdmin (si estás usando XAMPP).

Crea una nueva base de datos (llámala Tienda).

Importa el archivo .sql incluido en el proyecto. Este archivo se llama
tienda.sql y contiene toda la estructura de tablas necesarias.

**Instalación del Backend**

Abre una terminal (CMD o PowerShell) y navega a la carpeta del backend:

cd ruta/al/proyecto/backend

En los archivos .env (tanto en el backend como frontend) cambia las ips
que están puestas:

VITE_API_URL=[[http://(tu]{.underline}](about:blank) ip):5000

Aparte cambia mas campos como el de usuario y contraseña de la base de
datos:

DB_HOST=localhost

DB_USER=(tu usuario)

DB_PASSWORD=(tu contraseña)

DB_DATABASE=tienda

API_HOST=0.0.0.0

API_PORT=5000

Inicia el servidor backend:

Python server.py

**Instalación del Frontend**

Abre otra terminal nueva y navega a la carpeta del frontend:

cd ruta/al/proyecto/frontend

Instala las dependencias: npm install

Ejecuta la aplicación React: npm run dev

Una vez ambos servidores estén activos:

El frontend estará disponible en: "[http://(tu ip):5173"]{.underline}

El backend responderá en el puerto que hayas configurado, por ejemplo:
"[http://(tu ip):5000"]{.underline}

**Posibles problemas o código para cambiar:**

En las líneas de ".env" del proyecto (Tanto en la carpeta de backend
como la del proyecto):

VITE_API_URL=http://(Tu ip):5000

Aparte desactivar el firewall del equipo para permitir la visualización
de las imágenes que están en la carpeta de /static si queremos abrir la
web en otro dispositivo, porque hay sistemas operativos que suelen
bloquear los puertos que la aplicación usa.

10\) Anexo B. Manual de usuario:

**10.1 Cliente:**

![Interfaz de usuario gráfica, Aplicación, Sitio web El contenido
generado por IA puede ser
incorrecto.](media/media/image24.png){width="6.0in"
height="2.876388888888889in"}

Al entrar a la aplicación el usuario se encuentra en modo invitado

Pulsamos iniciar sesión arriba a la derecha:

![Interfaz de usuario gráfica, Texto, Aplicación, Chat o mensaje de
texto El contenido generado por IA puede ser
incorrecto.](media/media/image37.png){width="6.0in"
height="3.1951388888888888in"}

Si el usuario no tiene cuenta puede optar por mantenerse en modo
invitado o registrarse. Si opta por darle a registrarse le redirige a la
página de registro.

![Interfaz de usuario gráfica, Aplicación El contenido generado por IA
puede ser incorrecto.](media/media/image22.png){width="6.0in"
height="7.45625in"}

**10.2 Administrador:**

![Interfaz de usuario gráfica, Aplicación, Sitio web El contenido
generado por IA puede ser
incorrecto.](media/media/image34.png){width="6.0in"
height="2.8069444444444445in"}

Esta es la página de ver los usuarios paginados, arriba hay filtro de
búsqueda tanto por nombre como email, si el usuario administrador opta
por darle a este icono de cada fila de la tabla:

![](media/media/image26.png){width="3.510906605424322in"
height="0.5000699912510936in"}

Le aparecerá un modal con los datos del usuario, si pulsa en la foto de
perfil se le desplegara la imagen con zoom, si le da al botón de cerrar
se cierra el modal:

![Interfaz de usuario gráfica, Texto, Aplicación El contenido generado
por IA puede ser
incorrecto.](media/media/image21.png){width="2.5842290026246717in"
height="2.5309897200349956in"} ![Una captura de pantalla de un celular
con texto e imágenes El contenido generado por IA puede ser
incorrecto.](media/media/image28.png){width="3.1457720909886264in"
height="2.524627077865267in"}

Si en el navbar el usuario presiona el apartado de usuario en la
siguiente parte:

![Interfaz de usuario gráfica, Aplicación El contenido generado por IA
puede ser incorrecto.](media/media/image1.png){width="6.0in"
height="2.8625in"}

Aparece la página de editar usuario, si se pulsa editar el usuario
saldrá un modal para editarlo correctamente:

![Interfaz de usuario gráfica, Aplicación El contenido generado por IA
puede ser
incorrecto.](media/media/image19.png){width="5.448676727909011in"
height="5.75080271216098in"}

Si el usuario presiona al apartado de productos en el navbar, se
visualizará la pantalla de productos en modo administrador.

![Interfaz de usuario gráfica, Sitio web El contenido generado por IA
puede ser incorrecto.](media/media/image35.png){width="6.0in"
height="2.8652777777777776in"}

Para editar productos, el usuario tiene que pulsar en el propio
producto, tienen diferentes estados dependiendo del stock:

![Interfaz de usuario gráfica, Sitio web El contenido generado por IA
puede ser
incorrecto.](media/media/image27.png){width="2.2203619860017496in"
height="2.8404265091863516in"} ![Interfaz de usuario gráfica, Texto,
Aplicación El contenido generado por IA puede ser
incorrecto.](media/media/image39.png){width="2.0267672790901137in"
height="2.829640201224847in"}

Si le da a editar se le abrirá un modal para editar correctamente el
producto:

![Interfaz de usuario gráfica, Texto, Aplicación El contenido generado
por IA puede ser
incorrecto.](media/media/image25.png){width="2.2882272528433947in"
height="2.958915135608049in"} ![Interfaz de usuario gráfica, Texto,
Aplicación, Chat o mensaje de texto El contenido generado por IA puede
ser incorrecto.](media/media/image38.png){width="2.275188101487314in"
height="2.9506332020997377in"}

Si el usuario administrador pulsa el botón para añadir producto se le
abrirá otro modal para incluir un producto nuevo:

![Interfaz de usuario gráfica, Aplicación, Sitio web El contenido
generado por IA puede ser
incorrecto.](media/media/image33.png){width="6.0in"
height="3.876388888888889in"}

Si el usuario pulsa en la parte de pedidos se le redirigirá a esta
página:

![Interfaz de usuario gráfica, Aplicación, Sitio web El contenido
generado por IA puede ser
incorrecto.](media/media/image30.png){width="6.0in"
height="2.8666666666666667in"}

En esta página si el usuario pulsa el botón azul es para editar el
pedido:

![Interfaz de usuario gráfica, Texto, Aplicación, Chat o mensaje de
texto El contenido generado por IA puede ser
incorrecto.](media/media/image32.png){width="4.7194083552056in"
height="5.927910104986877in"}

Si el pedido se edita le aparecerá una alerta confirmando si se editó
bien o mal:

![Interfaz de usuario gráfica, Texto, Aplicación, Chat o mensaje de
texto El contenido generado por IA puede ser
incorrecto.](media/media/image36.png){width="5.365332458442695in"
height="4.11515748031496in"}

![Interfaz de usuario gráfica, Texto, Aplicación, Chat o mensaje de
texto El contenido generado por IA puede ser
incorrecto.](media/media/image7.png){width="5.354913604549432in"
height="3.8859590988626422in"}

Parte para usuario cliente:

![Interfaz de usuario gráfica, Aplicación, Sitio web El contenido
generado por IA puede ser
incorrecto.](media/media/image23.png){width="6.0in" height="2.85625in"}

Ahora si el usuario pulsa un producto, se le abrirá un modal con las
siguientes partes:

![Imagen de la pantalla de un celular con texto e imagen El contenido
generado por IA puede ser
incorrecto.](media/media/image2.png){width="3.749323053368329in"
height="4.5178619860017495in"}

Si presiona en la imagen se le abrirá gracias a la librería implementada
de \`photo viewer'

![Imagen en blanco y negro El contenido generado por IA puede ser
incorrecto.](media/media/image31.png){width="6.0in"
height="3.036111111111111in"}

Si el usuario pulsa en el botón de añadir al carrito, dependiendo de
circunstancias como:

Stock (si hay stock le dejara meter la cantidad que quede, si no hay
stock el botón de añadir al carrito se mantendrá desactivado)

![Interfaz de usuario gráfica, Aplicación El contenido generado por IA
puede ser
incorrecto.](media/media/image6.png){width="3.8881233595800526in"
height="4.797576552930884in"}

En este ejemplo si el usuario mete más de 2 productos y pulsa el botón
añadir:

![Imagen de la pantalla de un celular con letras El contenido generado
por IA puede ser
incorrecto.](media/media/image10.png){width="3.3080588363954506in"
height="3.6537642169728786in"}

Si esta todo correcto le saldrá este aviso:

![Interfaz de usuario gráfica, Aplicación El contenido generado por IA
puede ser
incorrecto.](media/media/image11.png){width="3.027602799650044in"
height="2.5208989501312336in"}

Si el usuario quiere mirar la cesta, tiene que pulsar en el menú el
apartado "cesta":

![Interfaz de usuario gráfica, Texto, Aplicación El contenido generado
por IA puede ser incorrecto.](media/media/image9.png){width="6.0in"
height="2.852777777777778in"}

En esta página, se puede seleccionar método de envío, si se pulsa el
botón eliminar el producto de la cesta se elimina correctamente, si se
pulsa el botón vaciar también se vacía por completo y si no hay
productos en la cesta aparecerá de esta manera:

![Interfaz de usuario gráfica, Texto, Aplicación El contenido generado
por IA puede ser incorrecto.](media/media/image12.png){width="6.0in"
height="1.988888888888889in"}

Si el usuario pulsa el botón comprar, aparecerá este aviso:

![Interfaz de usuario gráfica, Texto, Aplicación El contenido generado
por IA puede ser incorrecto.](media/media/image17.png){width="6.0in"
height="1.8104166666666666in"}

Y la cesta se vaciará automáticamente.

Si el usuario pulsa el apartado "pedidos" en el menú le aparecerá la
siguiente página:

![Interfaz de usuario gráfica, Aplicación, Sitio web El contenido
generado por IA puede ser
incorrecto.](media/media/image4.png){width="6.0in"
height="2.8715277777777777in"}

Si en la tabla pulsa la información puede eliminar o cancelar un pedido
dependiendo de:

Eliminar (si esta entregado o cancelado)

Cancelar (si esta enviado o pendiente)

![Interfaz de usuario gráfica, Texto, Aplicación, Chat o mensaje de
texto El contenido generado por IA puede ser
incorrecto.](media/media/image8.png){width="3.3097003499562554in"
height="1.6553860454943132in"}

![Interfaz de usuario gráfica, Texto, Aplicación, Chat o mensaje de
texto El contenido generado por IA puede ser
incorrecto.](media/media/image18.png){width="3.429877515310586in"
height="2.4945395888013997in"}

![Interfaz de usuario gráfica, Texto, Aplicación, Chat o mensaje de
texto El contenido generado por IA puede ser
incorrecto.](media/media/image15.png){width="3.429874234470691in"
height="2.2313659230096237in"}

![](media/media/image14.png){width="6.0in"
height="0.2513888888888889in"}

Si se vuelve a pulsar ahora al estar cancelado es para eliminar el
pedido:

![Interfaz de usuario gráfica, Texto, Aplicación, Chat o mensaje de
texto El contenido generado por IA puede ser
incorrecto.](media/media/image3.png){width="4.708990594925634in"
height="2.354494750656168in"}

Si el usuario pulsa el apartado del menú "Quienes somos" le llevara a la
siguiente página:

![Interfaz de usuario gráfica El contenido generado por IA puede ser
incorrecto.](media/media/image13.png){width="5.725222003499563in"
height="2.7433366141732285in"}

Si el usuario pulsa en el apartado de contactar, tanto en la propia
página de quienes somos como en el footer le llevara a la siguiente
página:

![Interfaz de usuario gráfica, Texto, Aplicación, Correo electrónico El
contenido generado por IA puede ser
incorrecto.](media/media/image29.png){width="4.240503062117235in"
height="2.018655949256343in"}

Si en el navbar el usuario presiona en la parte del usuario:

![Interfaz de usuario gráfica, Aplicación El contenido generado por IA
puede ser
incorrecto.](media/media/image1.png){width="4.7473403324584424in"
height="2.264876421697288in"}

Aparece la página de perfil y editar perfil, si se pulsa editar el
usuario saldrá un modal para editarlo correctamente:

![Interfaz de usuario gráfica, Aplicación El contenido generado por IA
puede ser
incorrecto.](media/media/image19.png){width="4.244078083989502in"
height="4.479410542432196in"}
