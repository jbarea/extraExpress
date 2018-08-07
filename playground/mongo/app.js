const express = require('express');
    app = express();
    db = require('./connection/mongodb');
    Bios = require('./models/bios');

app.get('/', (req,res) => {
    db.get().collection('bios').find().toArray(function(err,docs){
        res.send(docs);
    })
})

app.get('/bios', (req,res)=>{
    Bios.findAll().then(docs => {
        res.send(docs);
    })
})
db.connect(function (err) {
    if(err) {
        console.log('Unable to connect to MongoDB');
        process.exit(1);
    }else{
        app.listen(3000, function () {
            console.log('Servidor iniciado en http://localhost:3000');
        })
    }
})