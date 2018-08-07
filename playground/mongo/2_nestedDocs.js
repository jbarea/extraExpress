const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';
const dbName = 'pruebaClase';

MongoClient.connect(url, {
    useNewUrlParser: true
}, function (err, client) {
    if (err) return console.error(new Error(err));
    console.log('Te has conectado a mongoDB');

    const db = client.db(dbName);
    const collectionName = 'InventoryNestedDocs';
    const collection = db.collection(collectionName);

    db.createCollection(collectionName).then(() => {
        collection.drop().then(() => {
            collection.insertMany(
                [{
                        item: "journal",
                        qty: 25,
                        size: {
                            h: 14,
                            w: 21,
                            uom: "cm"
                        },
                        status: "A"
                    },
                    {
                        item: "notebook",
                        qty: 50,
                        size: {
                            h: 8.5,
                            w: 11,
                            uom: "in"
                        },
                        status: "A"
                    },
                    {
                        item: "paper",
                        qty: 100,
                        size: {
                            h: 8.5,
                            w: 11,
                            uom: "in"
                        },
                        status: "D"
                    },
                    {
                        item: "planner",
                        qty: 75,
                        size: {
                            h: 22.85,
                            w: 30,
                            uom: "cm"
                        },
                        status: "D"
                    },
                    {
                        item: "postcard",
                        qty: 45,
                        size: {
                            h: 10,
                            w: 15.25,
                            uom: "cm"
                        },
                        status: "A"
                    }
                ]
            ).then(() => {
                collection.find({
                    //toEqual
                    //size: {h:14, w: 21, uom: 'cm'}

                    //Buscar un campo en concreto (funciona con comillas simples)
                    //"size.uom": "cm"

                    //Igual pero con comparacion
                    //"size.h": {$gt: 15}

                    //Cumpla con todas las siguientes condiciones
                    "size.h": {$lt:15},
                    "size.uom": "in",
                    status: 'D'
                }).toArray(function (err, docs) {
                    if (err) return console.error(err);
                    console.log(docs);
                })
            })
        })
    })

});