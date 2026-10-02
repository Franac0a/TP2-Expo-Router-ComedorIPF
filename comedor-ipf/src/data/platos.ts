export type Categoria = "desayuno" | "almuerzo" | "bebidas" | "kiosco";

export interface Plato {
  id: string;
  nombre: string;
  precio: number;
  descripcion: string;
  categoria: Categoria;
}

export const MENUS: Plato[] = [
  // Desayuno
  {
    id: "1",
    nombre: "Café con leche y medialunas",
    precio: 1500,
    descripcion: "Clásico desayuno con 2 medialunas de manteca.",
    categoria: "desayuno",
  },
  {
    id: "2",
    nombre: "Tostado de JyQ",
    precio: 2200,
    descripcion: "Tostado en pan de miga.",
    categoria: "desayuno",
  },
  {
    id: "3",
    nombre: "Mate cocido con torta frita",
    precio: 1200,
    descripcion: "Ideal para días de lluvia.",
    categoria: "desayuno",
  },
  // Almuerzo
  {
    id: "4",
    nombre: "Milanesa con puré",
    precio: 4500,
    descripcion: "Milanesa de ternera con puré de papas.",
    categoria: "almuerzo",
  },
  {
    id: "5",
    nombre: "Fideos con tuco",
    precio: 3800,
    descripcion: "Tallarines caseros con salsa fileto.",
    categoria: "almuerzo",
  },
  {
    id: "6",
    nombre: "Ensalada completa",
    precio: 3500,
    descripcion: "Lechuga, tomate, huevo, zanahoria y pollo.",
    categoria: "almuerzo",
  },
  // Bebidas
  {
    id: "7",
    nombre: "Agua mineral",
    precio: 800,
    descripcion: "Botella de 500ml sin gas.",
    categoria: "bebidas",
  },
  {
    id: "8",
    nombre: "Gaseosa Cola",
    precio: 1200,
    descripcion: "Lata de 354ml.",
    categoria: "bebidas",
  },
  {
    id: "9",
    nombre: "Jugo de naranja natural",
    precio: 1500,
    descripcion: "Exprimido en el momento.",
    categoria: "bebidas",
  },
  // Kiosco
  {
    id: "10",
    nombre: "Alfajor de maicena",
    precio: 900,
    descripcion: "Relleno con mucho dulce de leche.",
    categoria: "kiosco",
  },
  {
    id: "11",
    nombre: "Turrón",
    precio: 400,
    descripcion: "Oblea rellena.",
    categoria: "kiosco",
  },
  {
    id: "12",
    nombre: "Papas fritas de paquete",
    precio: 1600,
    descripcion: "Snack salado clásico.",
    categoria: "kiosco",
  },
];
