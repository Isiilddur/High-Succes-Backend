'use strict'
const express = require('express')
const routes = require('../routes/routes')
const cors = require('cors')
const bodyParser = require('body-parser');

class Server {
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT;
        this.app.use(express.urlencoded({ limit: "50mb", parameterLimit: 500000000 }));
        this.app.use(express.json({ limit: "50mb", parameterLimit: 500000000 }));
        this.middlewares();
        this.routesConfig();

    }

    middlewares(){
        // CORS
        this.app.use(cors())
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
