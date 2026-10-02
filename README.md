# Comedor IPF - App de Pedidos

src/app/
├── (tabs)/
│ ├── \_layout.tsx (Navegación principal inferior)
│ ├── index.tsx  
│ ├── menu/
│ │ ├── \_layout.tsx (Stack anidado para mantener los tabs visibles)
│ │ ├── index.tsx
│ │ └── [id].tsx
│ └── carrito/
│ ├── \_layout.tsx (Stack anidado para el flujo de pago)
│ ├── index.tsx
│ └── nota.tsx (Vista superpuesta como Modal)
├── ayuda/
│ ├── index.tsx
│ └── [...slug].tsx (Catch-all para artículos de ayuda)
├── categorias/
│ └── [categoria].tsx
├── cocina/
│ ├── \_layout.tsx (Menú lateral - Drawer)
│ ├── index.tsx
│ └── atendidos.tsx
├── \_layout.tsx (Stack Raíz - Gestiona seguridad y modales)
├── +not-found.tsx
├── buscar.tsx
├── confirmar.tsx (Pantalla Modal)
├── login.tsx (Pantalla Modal)
├── pedido.tsx (Redirección)
└── turno/
└── [numero].tsx

2. Configuración de Layouts y Navegadores
   Stack Raíz (src/app/\_layout.tsx): Contenedor principal de la aplicación. Configura las pantallas de login y confirmar para que se abran con una animación modal. Además, se encarga de proteger la entrada a la ruta /cocina leyendo el estado de sesión; si el usuario no está logueado, bloquea el acceso.

Pestañas (src/app/(tabs)/\_layout.tsx): Utiliza un <Tabs> para gestionar el acceso rápido a las tres secciones más usadas por los clientes (Inicio, Menú y Carrito). Incluye la lógica para renderizar el "badge" (burbuja roja) que reacciona en tiempo real a la cantidad de ítems en el carrito.

Menú Anidado (src/app/(tabs)/menu/\_layout.tsx): Implementa un <Stack> interno dentro de la pestaña del menú. Esto permite que el usuario pueda entrar a ver los detalles de un plato específico sin perder la barra de navegación de abajo.

Carrito Anidado (src/app/(tabs)/carrito/\_layout.tsx): Funciona igual que el menú, utilizando un <Stack> para mostrar la lista de compras y levantar la pantalla de notas para la cocina por encima del flujo normal.

Panel de Cocina (src/app/cocina/\_layout.tsx): Emplea un componente <Drawer> para ofrecer un menú lateral exclusivo para los empleados, separando la experiencia de trabajo operativo de la interfaz visual del cliente.

3. Justificación del Flujo de Confirmación (replace vs push)
   En el paso final del pedido (transición de /confirmar hacia /turno/[numero]), se implementó explícitamente el método router.replace en lugar de push.

El método push apila la pantalla nueva sobre la anterior. Si hiciéramos esto, el usuario podría utilizar la flecha de retroceso o el gesto de deslizar para volver a la pantalla de confirmación. Dado que en este punto el carrito ya fue vaciado y el pedido enviado, volver atrás generaría un estado visualmente inconsistente y podría provocar el re-envío accidental de pedidos vacíos o duplicados.

Al utilizar replace, eliminamos la pantalla de confirmación del historial activo. Esto sitúa la pantalla del turno directamente encima de la pila, forzando un flujo unidireccional seguro que protege la integridad de los datos.

4. Deep Links y Entorno de Pruebas
   El sistema está configurado para responder a esquemas de URL personalizados. Para probar los enlaces profundos directamente hacia una pantalla con la aplicación corriendo en desarrollo, se pueden ejecutar los siguientes comandos en la terminal:

Acceso directo a un plato:
npx uri-scheme open "comedoripf://menu/7" --android

Acceso directo a una búsqueda filtrada:
npx uri-scheme open "comedoripf://buscar?q=tarta&categoria=almuerzo" --android

5. Accesos del Personal
   Para ingresar a la ruta protegida del <Drawer> y gestionar la cola de pedidos, se debe utilizar la siguiente cuenta de prueba:

Usuario: cocina

Contraseña: 1234

6. Capturas de Pantalla

A continuación se demuestra el funcionamiento del sistema:

- **Pantalla 404 (Ruta inexistente):**
  ![Error 404](./capturas/404.jpeg)

- **Carrito con funcionalidad de deshacer:**

https://github.com/user-attachments/assets/c13a5487-36d0-4894-8ee7-056a8b5e93a8

- **Turno asignado:**
  <img width="739" height="1600" alt="Turno asignado" src="https://github.com/user-attachments/assets/d66aab05-9a2f-4e76-aac7-8f6596489a25" />

- **Login / Logout de Cocina y atendiendo pedidos (Cola):**

https://github.com/user-attachments/assets/eb48bc42-d169-4809-b7c8-d686a7e18973

Aplicación desarrollada con Expo Router para la gestión de pedidos del comedor del Instituto Politécnico Formosa.
