import { View, Text } from "react-native";
import { usePathname, useSegments, useLocalSearchParams } from "expo-router";

// Podés poner esto en false cuando entregues el trabajo
const DEBUG = true;

export default function DondeEstoy() {
  const pathname = usePathname();
  const segments = useSegments();
  const params = useLocalSearchParams();

  if (!DEBUG) return null;

  return (
    <View
      style={{
        padding: 10,
        backgroundColor: "#ffe4e1",
        marginTop: "auto",
        borderTopWidth: 1,
        borderColor: "#ccc",
      }}
    >
      <Text style={{ fontWeight: "bold", color: "#8b0000" }}>
        📍 DEBUG: ¿Dónde estoy?
      </Text>
      <Text style={{ fontSize: 12 }}>Path: {pathname}</Text>
      <Text style={{ fontSize: 12 }}>
        Segmentos: {JSON.stringify(segments)}
      </Text>
      <Text style={{ fontSize: 12 }}>Parámetros: {JSON.stringify(params)}</Text>
    </View>
  );
}
