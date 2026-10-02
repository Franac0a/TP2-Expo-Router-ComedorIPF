import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { router } from "expo-router";
import { useAppContext } from "../../context/AppContext";
import DondeEstoy from "../../components/DondeEstoy";

export default function CocinaIndex() {
  const { colaPedidosArray, atenderSiguiente, logout } = useAppContext();

  const handleLogout = () => {
    logout();
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Panel de Cocina</Text>
        <Pressable style={styles.botonSalir} onPress={handleLogout}>
          <Text style={styles.textoBotonSalir}>Cerrar Sesión</Text>
        </Pressable>
      </View>

      <Text style={styles.subtitulo}>
        Pedidos pendientes: {colaPedidosArray.length}
      </Text>

      {colaPedidosArray.length === 0 ? (
        <View style={styles.vacioContainer}>
          <Text style={styles.textoVacio}>
            No hay pedidos en cola. ¡A descansar!
          </Text>
        </View>
      ) : (
        <FlatList
          data={colaPedidosArray}
          keyExtractor={(item) => item.numero.toString()}
          renderItem={({ item }) => (
            <View style={styles.tarjetaPedido}>
              <View style={{ flex: 1 }}>
                <Text style={styles.numeroTurno}>Turno: {item.numero}</Text>

                {/* Listamos los nombres de los platos */}
                <View style={styles.listaPlatos}>
                  {item.items.map((plato, index) => (
                    <Text key={index} style={styles.platoTexto}>
                      • {plato.nombre}
                    </Text>
                  ))}
                </View>

                {item.nota ? (
                  <Text style={styles.nota}>Nota: {item.nota}</Text>
                ) : null}
              </View>
            </View>
          )}
        />
      )}

      {/* Botón para Desencolar (FIFO) */}
      <Pressable
        style={[
          styles.botonDespachar,
          colaPedidosArray.length === 0 && styles.botonDeshabilitado,
        ]}
        onPress={atenderSiguiente}
        disabled={colaPedidosArray.length === 0}
      >
        <Text style={styles.textoBoton}>Atender Siguiente (FIFO)</Text>
      </Pressable>

      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f0f0", padding: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  titulo: { fontSize: 28, fontWeight: "bold", color: "#8b0000" },
  subtitulo: { fontSize: 18, marginBottom: 10, fontWeight: "bold" },
  botonSalir: { backgroundColor: "#333", padding: 10, borderRadius: 5 },
  textoBotonSalir: { color: "#fff", fontWeight: "bold" },
  vacioContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  textoVacio: { fontSize: 18, color: "#666" },
  tarjetaPedido: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
  },
  numeroTurno: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  listaPlatos: { marginBottom: 10, paddingLeft: 5 },
  platoTexto: { fontSize: 16, color: "#333", marginBottom: 4 },
  nota: {
    fontSize: 15,
    color: "#8b0000",
    marginTop: 5,
    fontStyle: "italic",
    fontWeight: "500",
  },
  botonDespachar: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  botonDeshabilitado: { backgroundColor: "#aaa" },
  textoBoton: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
