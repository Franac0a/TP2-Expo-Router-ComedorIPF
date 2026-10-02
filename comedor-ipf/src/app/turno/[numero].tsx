import { View, Text, StyleSheet, Pressable } from "react-native";
import { Stack, useLocalSearchParams, router } from "expo-router";
import DondeEstoy from "../../components/DondeEstoy";

export default function PantallaTurno() {
  // Obtenemos el número dinámico de la URL
  const { numero } = useLocalSearchParams<{ numero: string }>();

  return (
    <View style={styles.container}>
      {/* Esto oculta la flecha de atrás y bloquea el gesto de volver */}
      <Stack.Screen
        options={{
          headerBackVisible: false,
          gestureEnabled: false,
          title: "Tu Turno",
        }}
      />

      <Text style={styles.titulo}>¡Pedido Confirmado!</Text>

      <View style={styles.circuloTurno}>
        <Text style={styles.textoTurno}>{numero}</Text>
      </View>

      <Text style={styles.instrucciones}>
        Por favor, aguardá a que tu número aparezca en pantalla para retirar tu
        comida en el mostrador.
      </Text>

      <Pressable
        style={styles.botonVolver}
        onPress={() => router.navigate("/")} // Volvemos al inicio limpiando todo
      >
        <Text style={styles.textoBoton}>Volver al Inicio</Text>
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
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#4CAF50",
  },
  circuloTurno: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    borderWidth: 4,
    borderColor: "#8b0000",
  },
  textoTurno: { fontSize: 60, fontWeight: "bold", color: "#8b0000" },
  instrucciones: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  botonVolver: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  textoBoton: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
