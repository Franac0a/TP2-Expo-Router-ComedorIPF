import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { useAppContext } from "../../../context/AppContext";
import DondeEstoy from "../../../components/DondeEstoy";

export default function CarritoIndex() {
  const { carrito, deshacerUltimo } = useAppContext();

  // Sumamos los precios de todos los platos apilados
  const total = carrito.reduce((suma, plato) => suma + plato.precio, 0);

  return (
    <View style={styles.container}>
      {carrito.length === 0 ? (
        <View style={styles.vacioContainer}>
          <Text style={styles.textoVacio}>Tu carrito está vacío</Text>
          <Link href="/menu" asChild>
            <Pressable style={styles.botonConfirmar}>
              <Text style={styles.textoBoton}>Ir al Menú</Text>
            </Pressable>
          </Link>
        </View>
      ) : (
        <>
          <FlatList
            data={carrito}
            // Le sumamos el index a la key por si agrega dos veces el mismo plato
            keyExtractor={(item, index) => item.id + "-" + index}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.nombre}>{item.nombre}</Text>
                <Text style={styles.precio}>${item.precio}</Text>
              </View>
            )}
            contentContainerStyle={{ padding: 15 }}
          />

          <View style={styles.footer}>
            <Text style={styles.totalTexto}>Total: ${total}</Text>
            <View style={styles.botonesContainer}>
              {/* Botón Deshacer: Hace pop() en tu Pila */}
              <Pressable
                style={[
                  styles.botonDeshacer,
                  carrito.length === 0 && styles.botonDeshabilitado,
                ]}
                onPress={deshacerUltimo}
                disabled={carrito.length === 0}
              >
                <Text style={styles.textoBoton}>Deshacer Último</Text>
              </Pressable>

              <Link href="../confirmar" asChild>
                <Pressable style={styles.botonConfirmar}>
                  <Text style={styles.textoBoton}>Confirmar</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </>
      )}
      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  vacioContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  textoVacio: { fontSize: 18, color: "#666", marginBottom: 20 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  nombre: { fontSize: 16 },
  precio: { fontSize: 16, fontWeight: "bold" },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#f9f9f9",
  },
  totalTexto: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "right",
  },
  botonesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  botonDeshacer: {
    flex: 1,
    backgroundColor: "#555",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  botonDeshabilitado: { backgroundColor: "#aaa" },
  botonConfirmar: {
    flex: 1,
    backgroundColor: "#8b0000",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  textoBoton: { color: "#fff", fontSize: 14, fontWeight: "bold" },
});
