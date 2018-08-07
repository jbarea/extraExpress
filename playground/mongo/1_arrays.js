const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';
const dbName = 'pruebaClase';

MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
            if (err) return console.error(new Error(err));
            console.log('Te has conectado a mongoDB');

            const db = client.db(dbName);

            const collection = db.collection('inventoryArrays');
            db.createCollection('inventoryArrays').then(()=>{
                collection.drop().then(() => {
                    collection.insertMany(
                        [{
                                item: "journal",
                                qty: 25,
                                tags: ["blank", "red"],
                                dim_cm: [14, 21]
                            },
                            {
                                item: "notebook",
                                qty: 50,
                                tags: ["red", "blank"],
                                dim_cm: [14, 21]
                            },
                            {
                                item: "paper",
                                qty: 100,
                                tags: ["red", "blank", "plain"],
                                dim_cm: [14, 21]
                            },
                            {
                                item: "planner",
                                qty: 75,
                                tags: ["blank", "red"],
                                dim_cm: [22.85, 30]
                            },
                            {
                                item: "postcard",
                                qty: 45,
                                tags: ["blue"],
                                dim_cm: [10, 15.25]
                            }
                        ]
                    ).then(() => {
                        collection.find({
                            //toEqual
                            // tags: ["red", "blank"]

                            //toMatch
                            //tags: {$all: ['red','blank']}

                            //toContain busca en todos los campos que contengan 'red'
                            //tags: 'red'

                            //toContain <arr>.dim_cm < 25
                            //dim_cm: {$gt: 25}

                            //Como el anterior pero actua como un OR
                            //cualquiera de los valores cumplen, pero se tienenque cumplir los dos.
                            //dim_cm: {$gt: 15, $lt: 12}

                            //Busca un valor concreto que cumpla todas las condiciones
                            //dim_cm: {$elemMatch: {$gt: 22, $lt: 30}}

                            //Query a un indice concreto de un array
                            //"dim_cm.0": 22.85 

                            //.lenght
                            tags: {$size: 3}
                        }).toArray(function(err,docs){
                            if(err) return console.error(err);
                            console.log(docs);
                        })
                    })
                })
            })
            
});