const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';
const dbName = 'pruebaClase';

let state =  {
    client: null
}

exports.connect = function(done) {
    if(state.client) return document();

    MongoClient.connect(url, {useNewUrlParser: true}, function(err,client){
        if (err) return done(err);

        state.client = client;
        done();
    })
}

exports.get = function () {
    return state.client.db('pruebaClase')
}

exports.close = function (done) {
    if(state.client) {
        state.client.close(function (err,res){
        if (err) return done(err);
            state.close = null;
            state.mode = null;
            done();
        })
    }
}    