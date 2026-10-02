import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import { useLocalSearchParams, router, Link } from "expo-router";
// Ajustá la ruta de importación si es necesario
import { MENUS } from "../data/platos";
import DondeEstoy from "../components/DondeEstoy";

const CATEGORIAS = ["desayuno", "almuerzo", "bebidas", "kiosco"];

export default function Buscar() {
  // Leemos q y categoria directamente de la URL
  const { q = "", categoria = "" } = useLocalSearchParams<{
    q: string;
    categoria: string;
  }>();

  // Actualizamos la URL en tiempo real al escribir
  const actualizarBusqueda = (nuevoTexto: string) => {
    router.setParams({ q: nuevoTexto, categoria });
  };

  // Actualizamos la URL al tocar una categoría (si toca la misma, la desactiva)
  const actualizarCategoria = (cat: string) => {
    const nuevaCategoria = categoria === cat ? "" : cat;
    router.setParams({ q, categoria: nuevaCategoria });
  };

  // Filtramos la base de datos basándonos en los parámetros de la URL
  const platosFiltrados = MENUS.filter((plato) => {
    const coincideTexto = plato.nombre.toLowerCase().includes(q.toLowerCase());
    const coincideCategoria = categoria
      ? plato.categoria.toLowerCase() === categoria.toLowerCase()
      : true;
    return coincideTexto && coincideCategoria;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Búsqueda Avanzada</Text>

      {/* Input vinculado al parámetro "q" */}
      <TextInput
        style={styles.input}
        placeholder="Ej: hamburguesa, café..."
        value={q}
        onChangeText={actualizarBusqueda}
      />

      {/* Botones vinculados al parámetro "categoria" */}
      <View style={styles.filtrosContainer}>
        {CATEGORIAS.map((cat) => (
          <Pressable
            key={cat}
            style={[
              styles.botonFiltro,
              categoria === cat && styles.botonFiltroActivo,
            ]}
            onPress={() => actualizarCategoria(cat)}
          >
            <Text
              style={[
                styles.textoFiltro,
                categoria === cat && styles.textoFiltroActivo,
              ]}
            >
              {cat}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Lista de resultados filtrados */}
      <FlatList
        data={platosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link
            href={{ pathname: "/(tabs)/menu/[id]", params: { id: item.id } }}
            asChild
          >
            <Pressable style={styles.tarjeta}>
              <View>
                <Text style={styles.nombrePlato}>{item.nombre}</Text>
                <Text style={styles.categoriaPlato}>{item.categoria}</Text>
              </View>
              <Text style={styles.precioPlato}>${item.precio}</Text>
            </Pressable>
          </Link>
        )}
        ListEmptyComponent={
          <Text style={styles.vacio}>
            No se encontraron platos que coincidan.
          </Text>
        }
      />

      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 15, color: "#333" },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  filtrosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  botonFiltro: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  botonFiltroActivo: { backgroundColor: "#8b0000", borderColor: "#8b0000" },
  textoFiltro: { color: "#333", textTransform: "capitalize" },
  textoFiltroActivo: { color: "#fff", fontWeight: "bold" },
  tarjeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  nombrePlato: { fontSize: 16, fontWeight: "bold" },
  categoriaPlato: {
    fontSize: 12,
    color: "#666",
    textTransform: "capitalize",
    marginTop: 4,
  },
  precioPlato: { fontSize: 16, fontWeight: "bold", color: "#4CAF50" },
  vacio: { textAlign: "center", marginTop: 40, fontSize: 16, color: "#777" },
});
