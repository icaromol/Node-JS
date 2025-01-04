import { parseRoutePath } from "./utils/parseRoutePath.js";

export const routes = [
  {
    method: "GET",
    path: "/products",
    controller: (request, response) => {
      return response.end(JSON.stringify(request.query));
    },
  },
  {
    method: "POST",
    path: "/products",
    controller: (request, response) => {
      return response.writeHead(201).end(JSON.stringify(request.body));
    },
  },
  {
    method: "DELETE",
    path: "/products/:id",
    controller: (request, response) => {
      return response
        .writeHead(200)
        .end("Produto removido. ID: " + request.params.id);
    },
  },
].map((route) => ({
  ...route, // Copia todas as propriedades do objeto atual.
  path: parseRoutePath(route.path), // Sobrescreve o campo "path".
}));
