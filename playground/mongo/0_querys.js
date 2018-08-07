const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';
const dbName = 'pruebaClase';

MongoClient.connect(url,{useNewUrlParser: true}, function (err,client) {
    if(err) return console.error(new Error(err));
    console.log('Te has conectado a mongoDB');

    const db = client.db(dbName);

    findDocumentsBios(db, (err,res) =>{//parametros que recibira son un error o un resultado
        if(err) return console.error(err);

        console.log(res);
        client.close();
    })

    // updateDocumentsBios(db, (err,res)=>{
    //     if(err) return console.error(err);
    //     console.log(res);
    // })

    // db.collection('bios').insertOne({
    //     _id: 11,
    //     name: {
    //         first: "Juan",
    //         last: "Antonio"
    //     }
    // })

    // db.collection('bios').remove({
    //     _id: 11
    // })

    findsOrlimit(db,(err,res)=>{
        if (!err) return console.log(err)

        console.log(res)
    })
})

const findsOrlimit = function(db){
    db.collection('bios')
    .find({
        $or: [
            {"name.first": "John"},
            {"name.last": "Dahl"}
        ]
    })
    .project({
        name: 1, number: 1, awards: 1, birth: 1, awards: {$slice: -1}
    })
    .sort({
        birth: -1
    })
    .skip(7)
    .limit(2)
    .toArray(((err,res)=>{
        if (err) return console.log(err)
        
        console.log(res)
    }))
}
const updateDocumentsBios = (db,callback) => {
    const collection = db.collection('bios');

    collection.findOneAndUpdate(//busca y cuando encuentra el resultado los muestra antes de cambiarlo(actualizacion)
        {_id: 9},
        {
            $set: {
                age: 55,
                city: 'Valencia'
            }
        },
        function(err,res){
            callback(err,res);
        }
    );
}

const findDocumentsBios = (db, callback) => {
    const collection = db.collection('bios');
    //callback(null, 'funciona');
    collection.find(
        // {
        //     $or: [
        //         {_id: {$gt: 8}},
        //         {_id: {$lt: 2}}
        //     ]
        // }
        {
            $or: [
                {
                    'name.first': 'John' //aqui estamos refiriendonos a first del elemento name, por lo que no usamos las dobles comillas
                },
                {
                    'name.last': 'Nygaard'
                },
                {
                    contribs: {
                        //$all: ['COBOL']
                        $size: 4, //para alguien que haya contribuido en 4 proyectos
                        $nin: ['Fortran']
                    }
                }
                
            ]
        }
    ).toArray(function(err,docs){
        callback(err,docs);
    });
}
