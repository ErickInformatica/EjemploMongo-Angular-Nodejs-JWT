'use strict'

const mongoose = require("mongoose");
const app = require('./app');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/IN6BM').then(()=>{
    console.log('Esta corriendo la base de datos');

    app.set('port', process.env.PORT || 3000);
    app.listen(app.get('port'), ()=>{
        console.log(`Servidor corriendo en el puerto '${ app.get('port')}'`);
    });
}).catch(err => console.log(err));