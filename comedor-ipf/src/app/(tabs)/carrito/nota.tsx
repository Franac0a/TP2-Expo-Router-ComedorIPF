import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

export default function NotaCarrito() {
  const [nota, setNota] = useState("");

  const avanzarAConfirmacion = () => {
    router.push({ pathname: "/confirmar", params: { nota } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Aclaraciones para la cocina</Text>

      <TextInput
        style={styles.inputNota}
        placeholder="Ej: sin sal, poca mayonesa..."
        value={nota}
        onChangeText={setNota}
        multiline
        maxLength={150}
      />

      <Pressable style={styles.boton} onPress={avanzarAConfirmacion}>
        <Text style={styles.textoBoton}>Ir a Confirmar Pedido</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputNota: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    marginBottom: 30,
    minHeight: 100,
    textAlignVertical: "top",
    fontSize: 16,
  },
  boton: {
    backgroundColor: "#8b0000",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  textoBoton: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
