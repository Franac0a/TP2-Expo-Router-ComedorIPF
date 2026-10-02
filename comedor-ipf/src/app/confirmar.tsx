import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { useAppContext } from "../context/AppContext";
import DondeEstoy from "../components/DondeEstoy";

export default function Confirmar() {
  const { carrito, confirmarPedido } = useAppContext();
  // Estado para guardar el texto de la nota
  const [nota, setNota] = useState("");

  const procesarPedido = () => {
    // Le pasamos el estado exacto de lo que escribió el usuario
    const numeroTurno = confirmarPedido(nota);
    router.replace(`/turno/${numeroTurno}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Resumen de tu pedido</Text>
      <Text style={styles.texto}>Cantidad de platos: {carrito.length}</Text>

      {/* Campo para ingresar la nota */}
      <TextInput
        style={styles.inputNota}
        placeholder="Aclaraciones para la cocina (ej. sin aderezos)..."
        value={nota}
        onChangeText={setNota}
        multiline
        maxLength={150}
      />

      <View style={styles.cajaAlerta}>
        <Text style={styles.textoAlerta}>
          Al confirmar, tu pedido será enviado a la cocina y se te asignará un
          número de turno.
        </Text>
      </View>

      <Pressable
        style={[
          styles.botonConfirmar,
          carrito.length === 0 && styles.botonDeshabilitado,
        ]}
        onPress={procesarPedido}
        disabled={carrito.length === 0}
      >
        <Text style={styles.textoBoton}>Enviar a Cocina</Text>
      </Pressable>

      <DondeEstoy />
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  texto: { fontSize: 18, marginBottom: 20, textAlign: "center" },
  inputNota: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    minHeight: 80,
    textAlignVertical: "top",
  },
  cajaAlerta: {
    backgroundColor: "#ffe4e1",
    padding: 15,
    borderRadius: 8,
    marginBottom: 30,
  },
  textoAlerta: { color: "#8b0000", textAlign: "center", fontWeight: "500" },
  botonConfirmar: {
    backgroundColor: "#8b0000",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  botonDeshabilitado: { backgroundColor: "#aaa" },
  textoBoton: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
