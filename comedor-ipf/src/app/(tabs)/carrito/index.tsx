import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { router } from "expo-router";
import { useAppContext } from "../../../context/AppContext";
import DondeEstoy from "../../../components/DondeEstoy";

export default function CarritoIndex() {
  const { carrito, deshacerUltimo, vaciarCarrito } = useAppContext();

  const irANota = () => {
    // Ahora vamos a la ruta de la nota en lugar de ir directo a confirmar
    router.push("/carrito/nota");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tu Carrito</Text>

      {carrito.length === 0 ? (
        <View style={styles.vacioContainer}>
          <Text style={styles.textoVacio}>El carrito está vacío</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={carrito}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.nombrePlato}>{item.nombre}</Text>
                <Text style={styles.precio}>${item.precio}</Text>
              </View>
            )}
          />

          <View style={styles.botonesContainer}>
            <Pressable style={styles.botonDeshacer} onPress={deshacerUltimo}>
              <Text style={styles.textoBotonSecundario}>Deshacer Último</Text>
            </Pressable>

            <Pressable style={styles.botonVaciar} onPress={vaciarCarrito}>
              <Text style={styles.textoBotonSecundario}>Vaciar</Text>
            </Pressable>
          </View>

          <Pressable style={styles.botonConfirmar} onPress={irANota}>
            <Text style={styles.textoBoton}>Continuar Pedido</Text>
          </Pressable>
        </>
      )}

      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f0f0f0" },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#8b0000",
  },
  vacioContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  textoVacio: { fontSize: 18, color: "#666" },
  item: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nombrePlato: { fontSize: 16, fontWeight: "bold" },
  precio: { fontSize: 16, color: "#4CAF50" },
  botonesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    marginTop: 10,
  },
  botonDeshacer: {
    backgroundColor: "#FF9800",
    padding: 12,
    borderRadius: 8,
    flex: 0.48,
    alignItems: "center",
  },
  botonVaciar: {
    backgroundColor: "#F44336",
    padding: 12,
    borderRadius: 8,
    flex: 0.48,
    alignItems: "center",
  },
  botonConfirmar: {
    backgroundColor: "#8b0000",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  textoBoton: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  textoBotonSecundario: { color: "#fff", fontSize: 14, fontWeight: "bold" },
});
