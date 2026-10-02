import { View, Text, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import { useAppContext } from "../context/AppContext";
import DondeEstoy from "../components/DondeEstoy";

export default function Login() {
  // Traemos la función para iniciar sesión de tu contexto
  const { login } = useAppContext();

  const handleLogin = () => {
    login(); // Cambia el estado global de la sesión a true
    router.replace("./(cocina)"); // Vamos a la ruta protegida
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Acceso a Cocina</Text>
      <Text style={styles.subtitulo}>
        Ingreso exclusivo para personal del IPF
      </Text>

      <Pressable style={styles.boton} onPress={handleLogin}>
        <Text style={styles.textoBoton}>Iniciar Sesión</Text>
      </Pressable>

      <Pressable style={styles.botonVolver} onPress={() => router.back()}>
        <Text style={styles.textoBotonBlanco}>Volver</Text>
      </Pressable>

      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
  },
  boton: {
    backgroundColor: "#8b0000",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  botonVolver: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  textoBoton: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  textoBotonBlanco: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
