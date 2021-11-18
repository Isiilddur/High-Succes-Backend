'use strict'
const express = require('express')
const routes = require('../routes/routes')

class Server {
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT;
        this.routesConfig();
    }

    routesConfig(){

        this.app.use('/api/v1', routes)
        this.app.get('/', (req, res) => {
          res.send('Todo Cool!');
        })
    }

    startListen(){
        this.app.listen(process.env.PORT, () => {
            console.log(`Aplicación corriendo en puerto ${this.PORT}`)
        })
    }
}

module.exports = Server;