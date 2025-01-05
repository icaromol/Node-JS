import { parseRoutePath } from "./utils/parseRoutePath.js";

export const routes = [
  {
    method: "GET",
    path: "/products",
    controller: ({ request, response, database }) => {
      const products = database.select("products");
      return response.end(JSON.stringify(products));
    },
  },
  {
    method: "POST",
    path: "/products",
    controller: ({ request, response, database }) => {
      const { name, price } = request.body || {};

      database.insert("products", { name, price });
      return response.writeHead(201).end();
    },
  },
  {
    method: "DELETE",
    path: "/products/:id",
    controller: ({ request, response }) => {
      return response
        .writeHead(200)
        .end("Produto removido. ID: " + request.params.id);
    },
  },
].map((route) => ({
  ...route, // Copia todas as propriedades do objeto atual.
  path: parseRoutePath(route.path), // Sobrescreve o campo "path".
}));
