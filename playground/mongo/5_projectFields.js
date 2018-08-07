const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';
const dbName = 'pruebaClase';

MongoClient.connect(url, {
            useNewUrlParser: true
        }, function (err, client) {
            if (err) return console.error(new Error(err));
            console.log('Te has conectado a mongoDB');

            const db = client.db(dbName);

            const collection = db.collection('projectFields');
            db.createCollection('projectFields').then(()=>{
                [{
                        item: "journal",
                        status: "A",
                        size: {
                            h: 14,
                            w: 21,
                            uom: "cm"
                        },
                        instock: [{
                            warehouse: "A",
                            qty: 5
                        }]
                    },
                    {
                        item: "notebook",
                        status: "A",
                        size: {
                            h: 8.5,
                            w: 11,
                            uom: "in"
                        },
                        instock: [{
                            warehouse: "C",
                            qty: 5
                        }]
                    },
                    {
                        item: "paper",
                        status: "D",
                        size: {
                            h: 8.5,
                            w: 11,
                            uom: "in"
                        },
                        instock: [{
                            warehouse: "A",
                            qty: 60
                        }]
                    },
                    {
                        item: "planner",
                        status: "D",
                        size: {
                            h: 22.85,
                            w: 30,
                            uom: "cm"
                        },
                        instock: [{
                            warehouse: "A",
                            qty: 40
                        }]
                    },
                    {
                        item: "postcard",
                        status: "A",
                        size: {
                            h: 10,
                            w: 15.25,
                            uom: "cm"
                        },
                        instock: [{
                                warehouse: "B",
                                qty: 15
                            },
                            {
                                warehouse: "C",
                                qty: 35
                            }
                        ]
                    }
                ].then(function(){
                    collection.find({
                        status: "A"
                    })
                })
            })
        }
    )