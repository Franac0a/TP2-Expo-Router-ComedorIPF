import { Link, usePathname } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function NotFoundScreen() {
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Oops! Error 404</Text>
      <Text style={styles.text}>La ruta solicitada no existe:</Text>
      <Text style={styles.path}>{pathname}</Text>
      <Link href="/" style={styles.link}>
        Volver al inicio
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  text: { fontSize: 16 },
  path: { fontSize: 18, color: "red", marginVertical: 15 },
  link: { fontSize: 16, color: "blue", textDecorationLine: "underline" },
});
