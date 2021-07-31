const http = require("http");
const app = require("./app");
const port = process.env.PORT || 3000; // use .env file or default to 3000

const server = http.createServer(app);

server.listen(port);