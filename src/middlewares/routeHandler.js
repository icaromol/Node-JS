import { extractQueryParams } from "../utils/extract-query-params.js";
import { routes } from "../routes.js";
import { Database } from "../database.js";
import { jsonBodyHandler } from "../middlewares/jsonBodyHandler.js";

const database = new Database();

export async function routeHandler(request, response) {
  const route = routes.find((route) => {
    return route.method === request.method && route.path.test(request.url);
  });

  if (route) {
    const routeParams = request.url.match(route.path);

    const { query, ...params } = routeParams.groups;

    extractQueryParams(query);

    request.params = params;
    request.query = query ? extractQueryParams(query) : {};

    // Processa o corpo da requisição (se necessário)
    if (["POST", "PUT", "PATCH"].includes(request.method)) {
      request.body = await jsonBodyHandler(request);
    }

    return route.controller({ request, response, database });
  }

  return response.writeHead(404).end("Rota não encontrada.");
}
