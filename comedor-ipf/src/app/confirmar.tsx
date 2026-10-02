import { View, Text, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import { useAppContext } from "../context/AppContext";
import DondeEstoy from "../components/DondeEstoy";

export default function Confirmar() {
  // Agregá deshacerUltimo al destructuring de tu contexto
  const { carrito, deshacerUltimo } = useAppContext();

  const procesarPedido = () => {
    const numeroTurno = Math.floor(Math.random() * 100) + 1;

    // Vaciamos tu Pila (LIFO) sacando todos los elementos uno por uno
    const cantidad = carrito.length;
    for (let i = 0; i < cantidad; i++) {
      deshacerUltimo();
    }

    router.replace(`/turno/${numeroTurno}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Resumen de tu pedido</Text>
      <Text style={styles.texto}>Cantidad de platos: {carrito.length}</Text>

      <View style={styles.cajaAlerta}>
        <Text style={styles.textoAlerta}>
          Al confirmar, tu pedido será enviado a la cocina y se te asignará un
          número de turno.
        </Text>
      </View>

      <Pressable style={styles.botonConfirmar} onPress={procesarPedido}>
        <Text style={styles.textoBoton}>Enviar a Cocina</Text>
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
    justifyContent: "center",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  texto: { fontSize: 18, marginBottom: 30, textAlign: "center" },
  cajaAlerta: {
    backgroundColor: "#ffe4e1",
    padding: 15,
    borderRadius: 8,
    marginBottom: 30,
  },
  textoAlerta: { color: "#8b0000", textAlign: "center", fontWeight: "500" },
  botonConfirmar: {
    backgroundColor: "#8b0000",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  textoBoton: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
