import { Redirect } from "expo-router";

export default function PedidoViejo() {
  // Redirige automáticamente a la pestaña del carrito
  return <Redirect href="/carrito" />;
}
