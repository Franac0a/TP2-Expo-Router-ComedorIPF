import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import DondeEstoy from "../../components/DondeEstoy";

export default function Inicio() {
  return (
    <View style={styles.container}>
      <Text style={styles.saludo}>¡Hola! Bienvenido al Comedor IPF</Text>

      <View style={styles.grid}>
        <Link href="/(tabs)/menu/index" style={styles.tarjeta}>
          Ir al Menú
        </Link>
        <Link href="/buscar" style={styles.tarjeta}>
          Buscar Plato
        </Link>
        <Link href="/ayuda/index" style={styles.tarjeta}>
          Ayuda
        </Link>
        <Link href="/login" style={styles.tarjetaCocina}>
          Acceso Cocina
        </Link>
      </View>

      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  saludo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  grid: { gap: 15, flex: 1 },
  tarjeta: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    textAlign: "center",
    borderRadius: 8,
    fontSize: 16,
    fontWeight: "bold",
    overflow: "hidden",
  },
  tarjetaCocina: {
    backgroundColor: "#ffe4e1",
    padding: 20,
    textAlign: "center",
    borderRadius: 8,
    fontSize: 16,
    fontWeight: "bold",
    overflow: "hidden",
    color: "#8b0000",
  },
});
