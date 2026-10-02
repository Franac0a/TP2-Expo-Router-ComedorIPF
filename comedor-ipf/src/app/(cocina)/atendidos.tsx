import { View, Text, StyleSheet, FlatList } from "react-native";
import { useAppContext } from "../../context/AppContext";

export default function CocinaAtendidos() {
  // Traemos el historial desde el contexto (reemplazá el nombre si usaste otro)
  const { pedidosAtendidosArray = [] } = useAppContext();

  // Invertimos el arreglo para cumplir la regla: "del más reciente al más antiguo"
  const historialInvertido = [...pedidosAtendidosArray].reverse();

  return (
    <View style={styles.container}>
      {historialInvertido.length === 0 ? (
        <View style={styles.vacioContainer}>
          <Text style={styles.textoVacio}>
            Aún no se despachó ningún pedido.
          </Text>
        </View>
      ) : (
        <FlatList
          data={historialInvertido}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.tarjetaPedido}>
              <Text style={styles.numeroTurno}>
                Turno Despachado: {item.numero}
              </Text>

              <View style={styles.listaPlatos}>
                {item.items.map((plato: any, index: number) => (
                  <Text key={index} style={styles.platoTexto}>
                    • {plato.nombre}
                  </Text>
                ))}
              </View>
              {item.nota ? (
                <Text style={styles.nota}>Nota: {item.nota}</Text>
              ) : null}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f0f0", padding: 20 },
  vacioContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  textoVacio: { fontSize: 18, color: "#666" },
  tarjetaPedido: {
    backgroundColor: "#e8f5e9",
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#a5d6a7",
  },
  numeroTurno: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2e7d32",
  },
  listaPlatos: { marginBottom: 10, paddingLeft: 5 },
  platoTexto: { fontSize: 16, color: "#333", marginBottom: 4 },
  nota: { fontSize: 15, color: "#8b0000", marginTop: 5, fontStyle: "italic" },
});
