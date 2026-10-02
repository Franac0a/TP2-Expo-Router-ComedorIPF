import { Redirect, Stack } from "expo-router";
import { useAppContext } from "../../context/AppContext";

export default function CocinaLayout() {
  // Traemos el estado de la sesión (asegurate de usar el nombre correcto de tu contexto)
  const { conSesion } = useAppContext();

  // Si no hay sesión, Expo Router corta la navegación y lo manda a login
  if (!conSesion) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      {/* Ocultamos el header para armar una vista de panel de control limpia */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
