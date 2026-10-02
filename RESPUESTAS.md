# Trabajo Práctico N° 2 — Expo Router: rutas, navegación, pilas y colas

Alumno: Benitez Franco

## Parte A · Estructuras de datos: la pila y la cola

### A1. Conceptos

a) _LIFO_ proviene de "Last In, First Out" (Último en entrar, primero en salir), siendo el principio que rige a las pilas.
_FIFO_ proviene de "First In, First Out" (Primero en entrar, primero en salir), que es el mecanismo clásico de una cola.

b) En un sistema LIFO, tanto el ingreso como la salida de datos ocurren por el mismo extremo (conocido como el tope de la pila). En cambio, en un sistema FIFO, el elemento nuevo se inserta por el final de la estructura y se extrae por el extremo opuesto (el frente).

c) Un ejemplo cotidiano de LIFO es el historial de navegación de un celular: la última ventana que abriste es la primera que se cierra al tocar "Volver". Cada pantalla que se abre se apila y al presionar el botón se retira la última pantalla de la pila.
Un ejemplo de FIFO es la fila de atención en un banco, o en una app cuando queremos subir varias fotos; la primera que se seleccionó es la primera que se procesa y se manda.

### A2. Seguimiento de una pila

Cada console log imprimiría:

"Perfil"

"Perfil"

"Productos"

false

Y al final la pila quedaría así:

```javascript
#items = ['Inicio', 'Productos'];
```

### A3. Seguimiento de una cola

La clase cola imprimiría:

'Beto'

'Beto'

false

Mientras que al final sería:

```javascript
#items = ['Caro','Dani']
```

### A4. Análisis de la implementación

a) El prefijo # convierte a la propiedad en privada. Esto es vital para el encapsulamiento, ya que impide que código externo manipule directamente el arreglo (por ejemplo, insertando elementos en el medio) y rompa el comportamiento estructurado de la pila.

b) El método .shift() es ineficiente en arreglos grandes porque elimina el elemento de la posición 0 y luego reasigna los índices moviendo todos los demás elementos un lugar hacia la izquierda. Las colas optimizadas resuelven esto manteniendo una variable privada que guarda el índice del frente; al desencolar, simplemente le suman 1 a ese índice para ignorar el primer elemento, sin reordenar el resto de los datos de lugar.

c) Utilizan métodos diferentes porque responden a lógicas de extracción inversas. La pila requiere sacar el elemento más reciente (el que está al final del arreglo), por lo que usa .pop(). La cola debe atender al elemento más antiguo (ubicado al principio del arreglo), por lo que necesita métodos como .shift().

### A5. Programación: una cola eficiente

Implementación:

```javascript
class ColaEficiente {
#items = [];
#frenteIndex = 0; // Se guarda en un campo privado el índice del frente

encolar(x) {
this.#items.push(x);
}

desencolar() {
if (this.vacia) return undefined;

// Guardo el valor actual del frente para devolverlo después
const elemento = this.&#35;items[this.&#35;frenteIndex];

// En lugar de usar shift(), avanzamos el índice un lugar
this.&#35;frenteIndex++;

return elemento;
}

frente() {
if (this.vacia) return undefined;
return this.#items[this.#frenteIndex];
}

get vacia() {
// La cola está vacía si el puntero del frente alcanzó la longitud total del array
return this.#frenteIndex === this.#items.length;
}

get tamanio() {
// El tamaño es el total de elementos en el array menos los que ya salieron
return this.#items.length - this.#frenteIndex;
}
}
```

### A6. Pila y cola dentro de Expo Router

a) El historial de navegación del Stack opera bajo el modelo _LIFO_. La pantalla que el usuario visualiza es el _"tope"_ de la pila. Cuando se ejecuta la acción de retroceso, el router realiza un _.pop()_, eliminando la pantalla actual para renderizar la que se encontraba debajo.

b) Las acciones encoladas del sistema de navegación utilizan una lógica _FIFO_. Si el usuario interactúa rápidamente con varios enlaces, las solicitudes de navegación se ordenan por llegada y se ejecutan respetando estrictamente ese mismo orden.

## Parte B · Rutas basadas en archivos

### B1. Del archivo a la URL

| Archivo                              | URL que genera / función                                                                             |
| :----------------------------------- | :--------------------------------------------------------------------------------------------------- |
| `src/app/(tabs)/index.tsx`           | /                                                                                                    |
| `src/app/acerca.tsx`                 | /acerca                                                                                              |
| `src/app/(tabs)/perfil.tsx`          | /perfil                                                                                              |
| `src/app/(tabs)/productos/index.tsx` | /productos/                                                                                          |
| `src/app/(tabs)/productos/[id].tsx`  | productos/[id] (ej: productos/2)                                                                     |
| `src/app/docs/[...slug].tsx`         | /docs/[slug] (Atrapa varios segmentos, ej: /docs/a/b/c)                                              |
| `src/app/_layout.tsx`                | No genera una pantalla ruteable; actúa como contenedor global                                        |
| `src/app/+not-found.tsx`             | Renderiza la pantalla de error 404 al visitar rutas inexistentes                                     |
| `src/app/Boton.tsx`                  | Error de convención: es un componente, no debería estar en /app porque generaría una ruta no deseada |

### B2. De la URL al archivo

| URL                                                | Archivo                                                      |
| :------------------------------------------------- | :----------------------------------------------------------- |
| `/categorias/bebidas` (y cualquier otra categoría) | src/app/categorias/[categoria].tsx                           |
| `/buscar?q=mate&categoria=kiosco`                  | src/app/buscar.tsx                                           |
| `/ayuda/pagos/tarjeta` y `/ayuda/horarios`         | src/app/ayuda/pagos/tarjeta.tsx y src/app/ayuda/horarios.tsx |
| `/ayuda` (con una pantalla propia)                 | src/app/ayuda/index.tsx                                      |

### B3. Verdadero o falso

Indicá V o F y justificá las falsas.

a) Con Expo Router, cada pantalla nueva se debe registrar en una tabla de configuración. _F_

Falso. No hace falta llenar ninguna configuración manual. Expo Router escanea la carpeta y genera las rutas basándose en la estructura física de los archivos dentro de /app.

b) Los archivos \_layout.tsx son pantallas que el usuario puede visitar. _F_

Falso. Son contenedores (wrappers) de diseño que dictan cómo se van a agrupar o proteger las pantallas que están en su nivel, no son pantallas finales para el usuario.

c) Una carpeta entre paréntesis, como (tabs), no aparece en la URL. _V_

d) Para agregar una librería conviene usar npm install, porque siempre trae la última versión. _F_

Falso. La instrucción recomendada es npx expo install. Si se usa npm directo, podríamos bajar versiones incompatibles con nuestra compilación específica de Expo Go.

e) En package.json, "main": "expo-router/entry" reemplaza al viejo App.tsx. _V_

f) La ruta /\_sitemap lista todas las rutas de la app y sirve para depurar. _V_

g) Si existen docs/index.tsx y docs/[...slug].tsx, la URL /docs muestra docs/index.tsx. _V_

h) En SDK 57, expo-router usa el mismo número de versión mayor que el SDK (57). _V_

## Parte C · Navegar: <Link>, router y la pila

### C1. Métodos de router

| Método                    | Qué le hace a la pila                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------- |
| `router.push(href)`       | Añade incondicionalmente una nueva pantalla al tope del historial                     |
| `router.navigate(href)`   | Apila la ruta, salvo que la pantalla solicitada ya sea la actual, evitando duplicados |
| `router.replace(href)`    | Sobrescribe la pantalla actual (el tope) sin modificar el historial previo            |
| `router.back()`           | Elimina la pantalla actual (desapila) regresando a la inmediata anterior              |
| `router.dismissTo(href)`  | Vacía las pantallas intermedias saltando hacia atrás hasta la ruta indicada           |
| `router.dismissAll()`     | Destruye todo el historial apilado devolviendo al usuario a la primera pantalla       |
| `router.canGoBack()`      | Evalúa si existen pantallas previas en el historial (devuelve un booleano)            |
| `router.setParams({...})` | Actualiza los datos o propiedades en la URL de la pantalla activa sin navegar         |

### C2. Simulación de la pila

| #   | Instrucción                           | Pila resultante                                                                     |
| --- | ------------------------------------- | ----------------------------------------------------------------------------------- |
| 1   | `router.push("/productos/1")`         | /productos, /productos/1                                                            |
| 2   | `router.push("/productos/2")`         | /productos, /productos/1, /productos/2                                              |
| 3   | `router.navigate("/productos/5")`     | /productos, /productos/1, /productos/2, /productos/5                                |
| 4   | `router.push("/perfil")`              | /productos, /productos/1, /productos/2, /productos/5, /perfil                       |
| 5   | `router.replace("/buscar")`           | /productos, /productos/1, /productos/2, /productos/5, /buscar                       |
| 6   | `router.back()`                       | /productos, /productos/1, /productos/2, /productos/5                                |
| 7   | `router.dismissTo("/productos")`      | /productos                                                                          |
| 8   | `router.canGoBack()` → ¿qué devuelve? | False, no es posible volver hacia atrás porque la pila quedó solo con el nodo raíz. |

### C3. ¿Link o router?

Para cada situación, elegí <Link> o router e indicá el método o prop que usarías. Justificá.

a) El usuario toca la tarjeta de un producto en una lista.

<Link> (prop href). Justificación: Es una interacción directa y visual del usuario. Tocar un elemento y viajar a otra pantalla es el caso de uso principal de este componente.

b) Se guarda un formulario, la API responde OK y hay que mostrar la pantalla de éxito.

router. Lo usaría con .push() o .navigate(), porque el viaje depende directamente de recibir un status 200 de la API; se ejecuta imperativamente por código solo si sale bien.

c) Botón “Cancelar” dentro de un modal.

router. Con el método .back(), porque la tarea es sencilla: desmontar el modal y recuperar el foco de la pantalla de fondo.

d) Después de un login exitoso hay que ir a la pantalla principal.

router. Utilizaría el método .replace(). De esta manera, el usuario no puede volver atrás (hacia el login) accidentalmente, ya que la ruta se reemplazó en el historial.

e) Volver desde el detalle de un pedido directamente a la lista de pedidos, que quedó tres pantallas más abajo.

router. En conjunto con el método .dismissTo(href). Es ideal para limpiar la pila intermedia y hacer que el usuario aterrice directamente en esa vista lejana.

### C4. Escribí el código

a) Un <Link> que abra el producto con id 8 usando href como objeto:

```tsx
<Link href={{ pathname: "/productos/[id]", params: { id: 8 } }}>
  ver producto 8
</Link>
```

b) Un <Link> a /perfil que siempre apile, aunque la pantalla ya exista:

```tsx
<Link href="/perfil" push>
  Ir al perfil
</Link>
```

c) Un botón (Pressable) propio que funcione como link a /carrito usando asChild:

```tsx
<Link href="/carrito" asChild>
  <Pressable>
    <Text>ir al carrito</Text>
  </Pressable>
</Link>
```

### C5. Pensar

Al convertirse en una etiqueta real <a>, permite al usuario abrir el link en una pestaña nueva o copiar ese enlace web estándar.

En el celular, manejar la navegación como si fueran URLs sirve para habilitar los Deep Links (enlaces profundos). Esto permite que, si alguien pasa un link por WhatsApp, el sistema operativo sepa exactamente qué pantalla de tu app debe abrir directamente en lo profundo de la navegación, en lugar de obligar al usuario a iniciar siempre desde la vista principal.

## Parte D · Navegadores: Stack, Tabs y Drawer

### D1. Comparación

|                                      | Stack                                                               | Tabs                                                   | Drawer                                                         |
| ------------------------------------ | ------------------------------------------------------------------- | ------------------------------------------------------ | -------------------------------------------------------------- |
| ¿Apila pantallas?                    | sí                                                                  | no                                                     | no                                                             |
| ¿Cómo cambia de pantalla el usuario? | tocando un enlace/botón que apila, o atrás para desapilar           | tocando los iconos de la barra inferior de pestañas    | abriendo el menú con el icono, o deslizando desde el borde     |
| ¿Desde dónde se importa en SDK 57?   | expo-router                                                         | expo-router                                            | expo-router/drawer                                             |
| Un caso de uso típico                | flujos jerárquicos de navegación (productos -> detalles -> carrito) | rutas principales de la app (inicio, búsqueda, perfil) | vistas secundarias con muchas opciones, menús de configuración |

### D2. Cada tab tiene su pila

La pantalla que el usuario visualiza es el Detalle del producto 4. Esto ocurre porque React Navigation preserva en memoria el estado y la pila local de cada pestaña. Al regresar al tab de productos, se restaura el contexto exacto (el tope de la pila) donde el usuario había dejado la navegación. Un ejemplo claro se ve en aplicaciones como Mercado Libre.

### D3. ¿Dónde va cada pantalla?

a) El detalle de un producto, que debe mantener visible la barra de pestañas. tab (en un stack anidado)
b) Un modal para confirmar una compra, que debe tapar la barra de pestañas. Stack raíz
c) La pantalla de login que se abre como modal. Stack raíz
d) La pantalla “Mis pedidos anteriores” dentro de la sección Perfil. tab (en un stack anidado)

### D4. Configurar el Stack

a) La diferencia es que screenOptions se usa a nivel general en un layout para aplicar ese estilo a todas las pantallas de ese grupo, mientras que options actúa únicamente sobre ese <Stack.Screen> en particular.

b) Sí. Las rutas existen con el simple hecho de crear el archivo físico. Solo declaramos el <Stack.Screen> en el layout cuando deseamos aplicar propiedades visuales o configuraciones extra a la cabecera.

c) Las configuraciones de presentación incluyen: card (normal), modal (de abajo hacia arriba completa), transparentModal (modal con fondo translúcido) y formSheet. Para lograr una hoja inferior al 50% se utiliza formSheet complementado con el comportamiento de iOS mediante sheetAllowedDetents={['medium']}.

e) Usando el componente dinámico dentro del JSX de la propia pantalla:

```jsx
<Stack.Screen name="Producto 7" options={{ title: "Detalle" }} />
```

### D5. Tabs y Drawer en SDK 57

a) Las pestañas tradicionales dibujadas mediante JavaScript ahora se importan desde expo-router/js-tabs. La alternativa son las "Native Tabs" (Tabs experimentales directamente desde expo-router), que apelan a la interfaz de usuario nativa del sistema proporcionando mejor rendimiento (como UITabBar en iOS).

b) Requiere las bibliotecas @react-navigation/drawer y react-native-gesture-handler. En el nivel raíz de la app se debe incluir el contenedor <GestureHandlerRootView> para habilitar correctamente la detección del tacto y deslizamiento.

c) Sí, hace falta instalarlo. Para mantener la librería base lo más ligera posible, el código del Drawer no viene preinstalado. expo-router/drawer es solo un adaptador que depende físicamente de los binarios de la implementación oficial de @react-navigation/drawer.

d) El método se procesa de manera ascendente. El router interno activo es quien intenta desapilar su propia pila; si su historial ya no tiene más pantallas previas para retroceder, le transfiere la acción hacia arriba al enrutador padre (el Stack general).

## Parte E · Rutas dinámicas, parámetros y hooks

### E1. Encontrá el error

El fallo es de tipos de datos. En las URLs, los parámetros siempre se transfieren como texto (string). Al usar el operador de igualdad estricta (===) evaluaba un "3" de la URL contra el 3 numérico de la base de datos, arrojando siempre falso.

Corrección: Hay que transformar el texto a número antes de buscarlo.

```tsx
export default function DetalleProducto() {
  const { id } = useLocalSearchParams<{ id: string }>();
  // Transformar a número
  const idNum = Number(id);

  const producto = productos.find((p) => p.id === idNum);

  if (idNum === 3) console.log("Es el chipá");
  if (!producto) return <Text>No existe el producto {id}</Text>;

  return <Text>{producto.nombre}</Text>;
}
```

### E2. Catch-all

| URL                          | slug                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| `/docs/react`                | ['react']                                                    |
| `/docs/react/hooks/useState` | ['react', 'hooks', 'useState']                               |
| `/docs`                      | undefined (O bien redirige a un 404 si falta docs/index.tsx) |

### E3. Anatomía de una URL

a) El scheme (esquema) es: rutasipf://, la ruta: /buscar, y los parámetros de consulta: q=mate y categoria=bebidas.

b) useLocalSearchParams() devolverá el objeto: {"q":"mate","categoria":"bebidas"}

c) No, no hace falta. Los corchetes se usan estrictamente para capturar directorios dinámicos. Los datos después del signo de interrogación son parámetros de consulta detectados automáticamente por el hook sin modificar los nombres físicos de los archivos.

d) La primera razón es para mantener limpio el historial; usar push apilaría copias idénticas arruinando el botón de regreso del usuario, obligándolo a retroceder letra por letra.
La segunda es por rendimiento: router.setParams simplemente actualiza los valores en tiempo real sobre la misma vista, evitando montar pantallas enteras con cada pulsación de letra, haciendo la escritura fluida.

### E4. ¿Dónde estoy?

| Hook                   | En /productos/3               | En /buscar?q=chipa |
| ---------------------- | ----------------------------- | ------------------ |
| usePathname()          | /productos/3                  | /buscar            |
| useSegments()          | ["(tabs)","productos","[id]"] | ["buscar"]         |
| useLocalSearchParams() | {"id":"3"}                    | {"q":"chipa"}      |

### E5. Local vs global

a)

La diferencia es que useLocalSearchParams lee de manera aislada los parámetros vigentes en la pantalla específica actual. useGlobalSearchParams accede a todas las variables activas en toda la jerarquía paralela.

La opción por defecto es la local. Se prefiere por seguridad, ya que mantiene el componente independiente y evita colisiones de datos si distintas pantallas comparten el mismo nombre de parámetro.

b) useFocusEffect

Sirve para ejecutar un efecto o lógica secundaria solo cuando el usuario posa los ojos sobre la pantalla (cuando recibe el foco y se vuelve activa).

Un ejemplo clásico es re-consultar una base de datos cuando volvemos a una pantalla que había quedado abierta en segundo plano, asegurando la actualización.

c) Pantalla de producto inexistente (/productos/mate)
No, el sistema no reporta un error nativo. Expo Router empareja la URL con el comodín [id] y carga el layout correctamente. Pertenece a la lógica del desarrollador interceptar que "mate" no existe en su base de datos y forzar la visualización de un error 404 o mensaje correspondiente.

## Parte F · Redirecciones, rutas protegidas y deep links

### F1. Redirect

a) El componente <Redirect> ejecuta automáticamente una navegación de forma declarativa al momento de montarse. Actúa como el equivalente gráfico a invocar por código la instrucción router.replace().

b) Una redirección debe reemplazar para borrar la ruta origen del historial. Si utilizáramos una lógica de apilar (push), el usuario retrocedería hacia la pantalla contenedora de la redirección al presionar "Volver", lo cual lo expulsaría cíclicamente de nuevo hacia adelante, atrapándolo en un bucle cerrado.

### F2. Stack.Protected

```tsx
function NavegacionRaiz() {
  const { usuario } = useAuth();
  const conSesion = usuario !== null;
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Protected guard={conSesion}>
        <Stack.Screen name="privado" />
      </Stack.Protected>
      <Stack.Protected guard={!conSesion}>
        <Stack.Screen name="login" options={{ presentation: "modal" }} />
      </Stack.Protected>
    </Stack>
  );
}
```

a) Cuando guard evalúa a false, el router desmonta por completo el registro de la pantalla en la aplicación, volviéndola inaccesible e inexistente desde cualquier entorno de navegación hasta que cambie el estado.

b) Al iniciar sesión, el estado conSesion cambia a true, por ende, el guard del login pasa a ser false. Esto provoca que el <Stack.Protected> desmonte automáticamente la vista de login del stack, destruyendo el modal en tiempo real.

c)

Esa alerta de consola ocurre si el código base solicita navegar a un destino (por ejemplo al tocar un <Link>) que en ese exacto momento se encuentra desmontado y no registrado porque su guard es false.

Se soluciona condicionando la interfaz visual, es decir, ocultando los enlaces de ingreso a secciones restringidas hasta que se pase la validación de acceso.

d) El principal beneficio de Stack.Protected es la centralización. Agrupa todo el control de acceso en un solo lugar (el nivel del enrutamiento global o \_layout), relevando al desarrollador de tener que repetir la lógica de validación componente por componente.

### F3. 404, anchor y rutas tipadas

a) El archivo +not-found.tsx indica qué componente renderizar cuando un usuario navega hacia un enlace perdido, es decir, genera la pantalla de intercepción general para el clásico error 404. Se ubica en la raíz del directorio de rutas.

b) Informa al sistema qué ruta asume la responsabilidad base del Layout cuando se aterriza vía deep link. Así mismo, orienta el punto de retorno del botón "Atrás". Se inyecta exportando variables específicas en los archivos de configuración de diseño (los \_layout.tsx).

c) TypeScript marcará error en el editor indicando que la ruta no es válida. Expo Router las genera dinámicamente en segundo plano al compilar, leyendo la estructura de la carpeta app/. Se guardan usualmente en la carpeta oculta del proyecto (típicamente en .expo/types/router.d.ts).

### F4. Deep links

| Dónde                        | URL                                 |
| ---------------------------- | ----------------------------------- |
| App instalada (build propia) | `comedoripf://menu/7`               |
| Expo Go en desarrollo        | `exp://192.168.1.20:8081/--/menu/7` |
| Web (npx expo start --web)   | `http://localhost:8081/menu/7`      |

¿Qué significa la parte /--/ en la URL de Expo Go?
Ese bloque funciona como un delimitador estructural. Le advierte al teléfono que la primera parte de la directiva corresponde a la apertura del contenedor (la app Expo Go) y el código sobrante representa el estado interno (/menu/7) al cual deberá apuntar el ruteo lógico una vez levantada la plataforma.

¿Por qué el scheme propio no funciona dentro de Expo Go?
Porque los "schemes" personalizados (como comedoripf) se ligan en lo profundo del sistema operativo del teléfono al instalar un binario de producción. Dado que el programador está emulando todo en caliente sobre el software contenedor estándar "Expo Go", solo se reconoce la firma predeterminada oficial de dicha herramienta de desarrollo (exp://).
