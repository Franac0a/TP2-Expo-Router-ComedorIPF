import { Stack } from "expo-router";
import { AppProvider, useAppContext } from "../context/AppContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Separamos la navegación para poder usar el hook useAppContext()
function NavegacionRaiz() {
  const { conSesion } = useAppContext();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Grupo principal de pestañas (Tabs) */}
      <Stack.Screen name="(tabs)" />

      {/* Pantallas normales del Stack Raíz con su encabezado visible */}
      <Stack.Screen
        name="categorias/[categoria]"
        options={{ headerShown: true, title: "Categorías" }}
      />
      <Stack.Screen
        name="buscar"
        options={{ headerShown: true, title: "Buscar" }}
      />
      <Stack.Screen
        name="turno/[numero]"
        options={{ headerShown: true, title: "Tu Turno" }}
      />
      <Stack.Screen
        name="ayuda/index"
        options={{ headerShown: true, title: "Ayuda" }}
      />
      <Stack.Screen
        name="ayuda/[...slug]"
        options={{ headerShown: true, title: "Artículo" }}
      />

      {/* Pantallas tipo Modal */}
      <Stack.Screen
        name="confirmar"
        options={{
          presentation: "modal",
          headerShown: true,
          title: "Confirmar Pedido",
        }}
      />

      {/* Rutas Protegidas (Requisito G2.8) */}
      <Stack.Protected guard={!conSesion}>
        <Stack.Screen
          name="login"
          options={{
            presentation: "modal",
            headerShown: true,
            title: "Acceso Cocina",
          }}
        />
      </Stack.Protected>

      <Stack.Protected guard={conSesion}>
        <Stack.Screen name="(cocina)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function LayoutRaiz() {
  return (
    // GestureHandlerRootView es obligatorio en SDK 57 para que el Drawer funcione bien
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <NavegacionRaiz />
      </AppProvider>
    </GestureHandlerRootView>
  );
}
