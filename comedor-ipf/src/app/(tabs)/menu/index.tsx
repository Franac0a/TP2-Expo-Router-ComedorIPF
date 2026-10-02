import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { MENUS, Plato } from "../../../data/platos";
import DondeEstoy from "../../../components/DondeEstoy";

export default function ListaMenu() {
  // Función para renderizar cada plato en la lista
  const renderPlato = ({ item }: { item: Plato }) => (
    // Cumpliendo el requisito C4.a: Link usando href como objeto
    <Link
      href={{
        pathname: "/(tabs)/menu/[id]",
        params: { id: item.id },
      }}
      asChild
    >
      <Pressable style={styles.tarjeta}>
        <View>
          <Text style={styles.nombre}>{item.nombre}</Text>
          <Text style={styles.categoria}>Categoría: {item.categoria}</Text>
        </View>
        <Text style={styles.precio}>${item.precio}</Text>
      </Pressable>
    </Link>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={MENUS}
        keyExtractor={(item) => item.id}
        renderItem={renderPlato}
        contentContainerStyle={{ padding: 15 }}
      />
      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  tarjeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  nombre: { fontSize: 16, fontWeight: "bold" },
  categoria: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    textTransform: "capitalize",
  },
  precio: { fontSize: 16, fontWeight: "bold", color: "#8b0000" },
});
