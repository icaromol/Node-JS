export function extractQueryParams(queryString) {
  if (!queryString) {
    return {};
  }

  return queryString
    .substring(1) // Remove o "?" do início da string.
    .split("&") // Divide os pares chave-valor separados por "&".
    .reduce((queryParams, param) => {
      const [key, value] = param.split("="); // Separa chave e valor.
      queryParams[key] = decodeURIComponent(value); // Decodifica e armazena no objeto.
      return queryParams;
    }, {});
}
