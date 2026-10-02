import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { useAppContext } from "../context/AppContext";
import DondeEstoy from "../components/DondeEstoy";

export default function Login() {
  const { login } = useAppContext();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (usuario.toLowerCase() === "cocina" && password === "1234") {
      login(); // Cambia el estado global de la sesión a true
      router.replace("/(cocina)"); // Vamos a la ruta protegida
    } else {
      Alert.alert(
        "Error",
        "Usuario o contraseña incorrectos. (Probá con cocina / 1234)",
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Acceso a Cocina</Text>
      <Text style={styles.subtitulo}>
        Ingreso exclusivo para personal del IPF
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario (ej: cocina)"
        value={usuario}
        onChangeText={setUsuario}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña (ej: 1234)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable style={styles.boton} onPress={handleLogin}>
        <Text style={styles.textoBoton}>Iniciar Sesión</Text>
      </Pressable>

      <Pressable style={styles.botonVolver} onPress={() => router.back()}>
        <Text style={styles.textoBotonBlanco}>Volver al Menú</Text>
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
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 16,
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
    marginBottom: 20,
  },
  textoBoton: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  textoBotonBlanco: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
