export class Pila<T> {
  #items: T[] = [];

  push(elemento: T) {
    this.#items.push(elemento);
  }

  pop(): T | undefined {
    return this.#items.pop();
  }

  tope(): T | undefined {
    return this.#items[this.#items.length - 1];
  }

  get vacia(): boolean {
    return this.#items.length === 0;
  }

  get tamanio(): number {
    return this.#items.length;
  }

  // Requisito G2.1: devolver una copia para poder renderizarla en React[cite: 9]
  aArray(): T[] {
    return [...this.#items];
  }
}
