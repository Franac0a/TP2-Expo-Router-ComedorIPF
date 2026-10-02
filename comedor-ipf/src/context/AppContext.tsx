import React, { createContext, useContext, useState, ReactNode } from "react";
import { Pila } from "../estructuras/Pila";
import { Cola } from "../estructuras/Cola";
import { Plato } from "../data/platos";

// Definimos cómo es un Pedido
export interface Pedido {
  numero: number;
  items: Plato[];
  nota: string;
}

// Interfaz de todo lo que estará disponible en la app
interface AppContextType {
  conSesion: boolean;
  login: () => void;
  logout: () => void;

  carrito: Plato[];
  agregarAlCarrito: (plato: Plato) => void;
  deshacerUltimo: () => void;
  vaciarCarrito: () => void;

  colaPedidosArray: Pedido[];
  confirmarPedido: (nota: string) => number;
  atenderSiguiente: () => void;

  pedidosAtendidosArray: Pedido[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // --- SESIÓN ---
  const [conSesion, setConSesion] = useState(false);
  const login = () => setConSesion(true);
  const logout = () => setConSesion(false);

  // --- CARRITO (Pila de acciones) ---
  // Guardamos la instancia de la Pila que creaste
  const [pilaCarrito] = useState(() => new Pila<Plato>());
  // Un estado espejo en forma de array para que React sepa cuándo re-dibujar la pantalla
  const [carrito, setCarrito] = useState<Plato[]>([]);

  const agregarAlCarrito = (plato: Plato) => {
    pilaCarrito.push(plato);
    setCarrito(pilaCarrito.aArray()); // aArray() es el método que creaste
  };

  const deshacerUltimo = () => {
    pilaCarrito.pop();
    setCarrito(pilaCarrito.aArray());
  };

  const vaciarCarrito = () => {
    while (!pilaCarrito.vacia) {
      pilaCarrito.pop();
    }
    setCarrito([]);
  };

  // --- COLA DE PEDIDOS Y PILA DE ATENDIDOS ---
  const [colaPedidos] = useState(() => new Cola<Pedido>());
  const [colaPedidosArray, setColaPedidosArray] = useState<Pedido[]>([]);

  const [pilaAtendidos] = useState(() => new Pila<Pedido>());
  const [pedidosAtendidosArray, setPedidosAtendidosArray] = useState<Pedido[]>(
    [],
  );

  const [contadorTurnos, setContadorTurnos] = useState(1);

  const confirmarPedido = (nota: string) => {
    const nuevoPedido: Pedido = {
      numero: contadorTurnos,
      items: pilaCarrito.aArray(),
      nota,
    };

    colaPedidos.encolar(nuevoPedido);
    setColaPedidosArray(colaPedidos.aArray());
    setContadorTurnos((prev) => prev + 1);
    vaciarCarrito();

    return nuevoPedido.numero; // Devolvemos el turno para usarlo en la navegación
  };

  const atenderSiguiente = () => {
    const pedidoAtendido = colaPedidos.desencolar();
    if (pedidoAtendido) {
      setColaPedidosArray(colaPedidos.aArray());
      pilaAtendidos.push(pedidoAtendido);
      setPedidosAtendidosArray(pilaAtendidos.aArray());
    }
  };

  return (
    <AppContext.Provider
      value={{
        conSesion,
        login,
        logout,
        carrito,
        agregarAlCarrito,
        deshacerUltimo,
        vaciarCarrito,
        colaPedidosArray,
        confirmarPedido,
        atenderSiguiente,
        pedidosAtendidosArray,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Hook personalizado para usar el contexto fácilmente
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext debe usarse dentro de un AppProvider");
  }
  return context;
}
