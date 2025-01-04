export function parseRoutePath(path) {
  // Expressão regular para identificar parâmetros de rota no formato ":parametro".
  const routeParametersRegex = /:([a-zA-Z]+)/g;

  // Substitui os parâmetros de rota por expressões regulares nomeadas.
  // Exemplo: "/products/:id" -> "/products/(?<id>[a-z0-9-_]+)"
  const params = path.replaceAll(routeParametersRegex, "(?<$1>[a-z0-9-_]+)");

  // Cria uma expressão regular para o caminho completo, incluindo uma query string opcional.
  // Exemplo: "/products/(?<id>[a-z0-9-_]+)(?<query>\\?+(.*))?$"
  const pathRegex = new RegExp(`${params}(?<query>\\?+(.*))?$`);

  // Retorna a expressão regular gerada.
  return pathRegex;
}
