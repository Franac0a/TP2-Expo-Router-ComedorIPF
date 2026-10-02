import { View, Text, StyleSheet, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useAppContext } from "../context/AppContext";
import DondeEstoy from "../components/DondeEstoy";

export default function Confirmar() {
  const { carrito, confirmarPedido } = useAppContext();
  // Atrapamos la nota que viene desde /carrito/nota
  const { nota } = useLocalSearchParams();

  const procesarPedido = () => {
    // Si la nota existe la mandamos, sino mandamos un string vacío
    const numeroTurno = confirmarPedido((nota as string) || "");
    router.replace(`/turno/${numeroTurno}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Resumen de tu pedido</Text>
      <Text style={styles.texto}>Cantidad de platos: {carrito.length}</Text>

      {/* Mostramos la nota solo si el usuario escribió algo */}
      {nota ? (
        <View style={styles.cajaNota}>
          <Text style={styles.textoNotaLabel}>Nota para cocina:</Text>
          <Text style={styles.textoNota}>{nota}</Text>
        </View>
      ) : null}

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
        <Text style={styles.textoBoton}>Confirmar y Enviar</Text>
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
  cajaNota: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  textoNotaLabel: { fontWeight: "bold", marginBottom: 5, color: "#333" },
  textoNota: { fontStyle: "italic", color: "#555" },
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
