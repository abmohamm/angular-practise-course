const http = require('http');
const debug = require('debug');
const app = require('./node-backend-app/app');

const port = process.env.PORT || "3000";

     const normalizePort = val => {
        var port = parseInt(val,10);

        if(isNaN(port)){
            return val;
        }
        if(port >= 0) {
            return port;
        }
        return false;
    };

    const onError = error => {
        if(error.syscall !== "listen") {
            throw error;
        }
        const bind = typeof addr === "string" ? "pipe" + addr : "port " + port;
        switch(error.code){
            case "EACCES" :
                console.log(bind + " requires elevated privileges ");
                process.exit(1);
                break;
            case "EADDRINUSE" :
                console.log(bind + " is already is use ");
                process.exit(1);
                break;
            default :
                throw error;
        }
    };

    const onListening = () => {
        const addr = server.address();
        const bind = typeof addr === "string" ? "pipe" + addr : "port " + port;
        debug("Listening on : " + bind);
    };

    const ports = normalizePort(port);
    app.set("port", ports);

    const server = http.createServer(app);
    server.on("error", onError);
    server.on("listening", onListening);
    server.listen(port);
    // const server = http.createServer((request,response) => {
    // response.end('This is my first response!!!');
    // });
