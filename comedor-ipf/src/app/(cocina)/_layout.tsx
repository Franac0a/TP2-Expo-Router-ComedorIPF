import { Redirect } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAppContext } from "../../context/AppContext";

export default function CocinaLayout() {
  // Traemos el estado de la sesión
  const { conSesion } = useAppContext();

  // Si no hay sesión, Expo Router corta la navegación y lo manda a login
  if (!conSesion) {
    return <Redirect href="/login" />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Pedidos Pendientes",
            title: "Cola de Pedidos",
          }}
        />
        <Drawer.Screen
          name="atendidos"
          options={{
            drawerLabel: "Historial de Atendidos",
            title: "Pedidos Completados",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
