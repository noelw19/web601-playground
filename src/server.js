const http = require('http');

const routes = require('./routes');

const PORT = 5000;

const server = http.createServer(routes.handler);

server.listen(PORT, () => {
    console.log("server listening at port: " + PORT);
});