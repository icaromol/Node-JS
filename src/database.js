import fs from "node:fs/promises";
const DATABASE_PATH = new URL("db.json", import.meta.url);

export class Database {
  #database = {}; // Para o banco de dados ficar privado é só adicionar #.

  constructor() {
    fs.readFile(DATABASE_PATH, "utf8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => this.#persist());
  }

  // Adicionar o # ao método persist para que ele não possa ser acessado em outros arquivos.
  #persist() {
    fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database));
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();
  }

  select(table) {
    return this.#database[table] ?? []; // Se não houver nada, retorna o array vazio.
  }
}

/*
// Criando databases modelo.
{
  "products"= [{}, {}, {}]
  "users"= [{}, {}]
}
*/
