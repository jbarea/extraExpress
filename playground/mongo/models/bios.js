const db = require('../connection/mongodb');

const collection = () => db.get().collection('bios');

const Bios = {};

Bios.findAll = () => new Promise((resolve,reject) => {
    collection().find().toArray((err,docs) => {
        if (err) return reject(err);

        resolve(docs)
    })
})

module.exports = Bios;