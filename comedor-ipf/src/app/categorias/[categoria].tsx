import { View, Text, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

export default function CategoriaDetalle() {
  // Capturamos el nombre de la categoría que viene en la URL
  const { categoria } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      {/* Mostramos el nombre de la categoría dinámicamente */}
      <Text style={styles.titulo}>Categoría: {categoria}</Text>

      <Text style={styles.texto}>
        Acá se mostrarían los platos correspondientes a esta categoría.
      </Text>

      {/* Botón para regresar sin romper el historial de navegación */}
      <Pressable style={styles.botonVolver} onPress={() => router.back()}>
        <Text style={styles.textoBoton}>Volver</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginBottom: 15,
    color: "#8b0000",
  },
  texto: { fontSize: 16, textAlign: "center", color: "#555", marginBottom: 30 },
  botonVolver: {
    backgroundColor: "#333",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  textoBoton: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
