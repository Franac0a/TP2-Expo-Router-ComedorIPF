import { View, Text, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams, router, Stack } from "expo-router";
import { useAppContext } from "../../context/AppContext";

export default function TurnoDetalle() {
  const { numero } = useLocalSearchParams();
  const { colaPedidosArray } = useAppContext();

  // Buscamos cuántos pedidos están antes que este en la cola
  const indiceActual = colaPedidosArray.findIndex(
    (p) => p.numero === Number(numero),
  );
  const pedidosAdelante = indiceActual >= 0 ? indiceActual : 0;

  const finalizarYVolver = () => {
    // router.dismissAll() destruye el historial acumulado (como la confirmación y la nota)
    if (router.canDismiss()) {
      router.dismissAll();
    }
    // Reseteamos el tab del carrito a su inicio y luego vamos a la pantalla principal
    router.navigate("/(tabs)/carrito");
    setTimeout(() => {
      router.navigate("/");
    }, 10);
  };

  return (
    <View style={styles.container}>
      {/* Esto es clave para iOS: apaga el swipe para volver atrás */}
      <Stack.Screen
        options={{
          title: "Pedido Confirmado",
          headerBackVisible: false,
          gestureEnabled: false,
        }}
      />

      <Text style={styles.titulo}>¡Tu pedido fue enviado!</Text>

      <View style={styles.tarjetaTurno}>
        <Text style={styles.textoTurno}>Turno</Text>
        <Text style={styles.numeroTurno}>#{numero}</Text>
      </View>

      <Text style={styles.espera}>
        Pedidos delante tuyo en la cocina: {pedidosAdelante}
      </Text>

      <Pressable style={styles.botonVolver} onPress={finalizarYVolver}>
        <Text style={styles.textoBoton}>Volver al Inicio</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
    textAlign: "center",
  },
  tarjetaTurno: {
    backgroundColor: "#fff",
    padding: 40,
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#8b0000",
    marginBottom: 30,
    width: "80%",
  },
  textoTurno: { fontSize: 24, color: "#666", marginBottom: 10 },
  numeroTurno: { fontSize: 60, fontWeight: "bold", color: "#8b0000" },
  espera: {
    fontSize: 18,
    color: "#555",
    marginBottom: 40,
    textAlign: "center",
  },
  botonVolver: {
    backgroundColor: "#333",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  textoBoton: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
