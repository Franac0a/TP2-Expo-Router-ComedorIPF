# Comedor IPF - App de Pedidos 🍔

Aplicación desarrollada con Expo Router (SDK 57) para la gestión de pedidos del comedor del Instituto Politécnico Formosa.

## 1. Árbol de Rutas y Layouts

A continuación se detalla la estructura de la carpeta `src/app` y los navegadores utilizados en cada `_layout.tsx`:

- **`src/app/_layout.tsx`**: Stack raíz. Contiene la configuración global, define las pantallas modales (`confirmar`, `login`) y protege la ruta `(cocina)` mediante `Stack.Protected`.
- **`src/app/(tabs)/_layout.tsx`**: Tabs (Pestañas). Maneja la navegación principal inferior entre `index` (Inicio), `menu` (Menú) y `carrito`.
- **`src/app/(tabs)/menu/_layout.tsx`**: Stack anidado. Permite navegar desde la lista de platos al detalle del plato manteniendo la barra de pestañas visible.
- **[Pendiente documentar carpeta cocina y carrito]**

## 2. Justificación de Navegación: `replace` VS `push`

En el flujo de confirmación de pedido (`/confirmar` -> `/turno/[numero]`), se decidió utilizar el método **`router.[COMPLETAR]`** en lugar de `push` porque...
_(Dejar espacio para explicar por qué no queremos que el usuario vuelva atrás a la pantalla de pago o confirmación)_

## 3. Deep Link de Prueba

Para abrir un plato directamente en Expo Go desde la terminal o el navegador del celular, utilizar el siguiente enlace:
`comedoripf://menu/7`
_(Nota: El plato 7 corresponde a "Agua mineral" según nuestra base de datos local)._

## 4. Capturas de Pantalla

A continuación se demuestra el funcionamiento del sistema:

- **Pantalla 404 (Ruta inexistente):**
  ![Error 404](./capturas/404.jpeg)

- **Carrito con funcionalidad de deshacer:**
  [Espacio para captura]

- **Turno asignado:**
  [Espacio para captura]# Comedor IPF - App de Pedidos 🍔

Aplicación desarrollada con Expo Router (SDK 57) para la gestión de pedidos del comedor del Instituto Politécnico Formosa.

## 1. Árbol de Rutas y Layouts

A continuación se detalla la estructura de la carpeta `src/app` y los navegadores utilizados en cada `_layout.tsx`:

- **`src/app/_layout.tsx`**: Stack raíz. Contiene la configuración global, define las pantallas modales (`confirmar`, `login`) y protege la ruta `(cocina)` mediante `Stack.Protected`.
- **`src/app/(tabs)/_layout.tsx`**: Tabs (Pestañas). Maneja la navegación principal inferior entre `index` (Inicio), `menu` (Menú) y `carrito`.
- **`src/app/(tabs)/menu/_layout.tsx`**: Stack anidado. Permite navegar desde la lista de platos al detalle del plato manteniendo la barra de pestañas visible.
- **[Pendiente documentar carpeta cocina y carrito]**

## 2. Justificación de Navegación: `replace` VS `push`

En el flujo de confirmación de pedido (`/confirmar` -> `/turno/[numero]`), se decidió utilizar el método **`router.[COMPLETAR]`** en lugar de `push` porque...
_(Dejar espacio para explicar por qué no queremos que el usuario vuelva atrás a la pantalla de pago o confirmación)_

## 3. Deep Link de Prueba

Para abrir un plato directamente en Expo Go desde la terminal o el navegador del celular, utilizar el siguiente enlace:
`comedoripf://menu/7`
_(Nota: El plato 7 corresponde a "Agua mineral" según nuestra base de datos local)._

## 4. Capturas de Pantalla

A continuación se demuestra el funcionamiento del sistema:

- **Pantalla 404 (Ruta inexistente):**
  ![Error 404](./capturas/404.jpeg)

- **Carrito con funcionalidad de deshacer:**
  [Espacio para captura]

- **Turno asignado:**
  [Espacio para captura]

- **Cocina atendiendo pedidos (Cola):**
  [Espacio para captura]

- **Login / Logout de Cocina:**
  [Espacio para captura]

- **Cocina atendiendo pedidos (Cola):**
  [Espacio para captura]

- **Login / Logout de Cocina:**
  [Espacio para captura]
