import { Redirect } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Pressable, Text } from "react-native";
import { useAppContext } from "../../context/AppContext";

export default function CocinaLayout() {
  const { conSesion, logout } = useAppContext();

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
