const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';
const dbName = 'pruebaClase';

MongoClient.connect(url, {
            useNewUrlParser: true
        }, function (err, client) {
            if (err) return console.error(new Error(err));
            console.log('Te has conectado a mongoDB');

            const db = client.db(dbName);
        })