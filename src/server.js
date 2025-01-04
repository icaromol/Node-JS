import http from "http";
import { routeHandler } from "./middlewares/routeHandler.js";

const server = http.createServer((request, response) => {
  routeHandler(request, response);
});

server.listen(3333, () => {
  console.log("Servidor rodando na porta 3333");
});
