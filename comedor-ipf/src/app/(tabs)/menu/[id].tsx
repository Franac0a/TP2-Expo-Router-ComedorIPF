import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { MENUS } from "../../../data/platos";
import { useAppContext } from "../../../context/AppContext";
import DondeEstoy from "../../../components/DondeEstoy";

export default function DetallePlato() {
  // Obtenemos el ID de la URL
  const { id } = useLocalSearchParams<{ id: string }>();

  // Traemos la función de tu Contexto Global
  const { agregarAlCarrito } = useAppContext();

  // Buscamos el plato
  const plato = MENUS.find((p) => p.id === id);

  // Requisito G2.6: Validar y mostrar mensaje si no existe[cite: 9]
  if (!plato) {
    return (
      <View style={styles.containerCentro}>
        <Stack.Screen options={{ title: "Error" }} />
        <Text style={styles.error}>El plato solicitado no existe.</Text>
        <Pressable onPress={() => router.back()} style={styles.botonVolver}>
          <Text style={styles.textoBotonBlanco}>Volver al menú</Text>
        </Pressable>
        <DondeEstoy />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Requisito G1: Título del header dinámico según el plato[cite: 8] */}
      <Stack.Screen options={{ title: plato.nombre }} />

      <View style={styles.tarjeta}>
        <Text style={styles.nombre}>{plato.nombre}</Text>
        <Text style={styles.categoria}>Sección: {plato.categoria}</Text>
        <Text style={styles.descripcion}>{plato.descripcion}</Text>
        <Text style={styles.precio}>${plato.precio}</Text>
      </View>

      <Pressable
        style={styles.botonAgregar}
        onPress={() => {
          agregarAlCarrito(plato);
          Alert.alert("¡Agregado!", `${plato.nombre} se sumó a tu carrito.`);
        }}
      >
        <Text style={styles.textoBotonBlanco}>Agregar al carrito</Text>
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
    justifyContent: "space-between",
  },
  containerCentro: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  tarjeta: { flex: 1 },
  nombre: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  categoria: {
    fontSize: 14,
    color: "#666",
    textTransform: "capitalize",
    marginBottom: 15,
  },
  descripcion: { fontSize: 16, lineHeight: 24, marginBottom: 20 },
  precio: { fontSize: 28, fontWeight: "bold", color: "#8b0000" },
  error: { fontSize: 18, color: "red", marginBottom: 20 },
  botonAgregar: {
    backgroundColor: "#8b0000",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  botonVolver: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  textoBotonBlanco: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
