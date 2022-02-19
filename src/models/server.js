'use strict'
const express = require('express')
const routes = require('../routes/routes')
const cors = require('cors')

class Server {
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT;
        this.middlewares();
        this.routesConfig();

    }

    middlewares(){
        // CORS
        this.app.use(cors())
        this.app.use(express.bodyParser({limit: '50mb'}));
        // Read and Parse of body
        this.app.use(express.json())
    }

    routesConfig(){
        this.app.use('/api/v1', routes)
    }

    startListen(){
        this.app.listen(process.env.PORT, () => {
            console.log(`Aplicación corriendo en puerto ${this.PORT}`)
        })
    }
}

module.exports = Server;
