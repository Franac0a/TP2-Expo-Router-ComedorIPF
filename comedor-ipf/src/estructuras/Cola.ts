export class Cola<T> {
  #items: T[] = [];
  #frenteIndex: number = 0;

  encolar(elemento: T) {
    this.#items.push(elemento);
  }

  desencolar(): T | undefined {
    if (this.vacia) return undefined;
    const elemento = this.#items[this.#frenteIndex];
    delete this.#items[this.#frenteIndex]; // Liberamos la referencia para el Garbage Collector
    this.#frenteIndex++;
    return elemento;
  }

  frente(): T | undefined {
    if (this.vacia) return undefined;
    return this.#items[this.#frenteIndex];
  }

  get vacia(): boolean {
    return this.#frenteIndex >= this.#items.length;
  }

  get tamanio(): number {
    return this.#items.length - this.#frenteIndex;
  }

  aArray(): T[] {
    return this.#items.slice(this.#frenteIndex);
  }
}
