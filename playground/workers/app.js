const { Worker } = require('worker_threads');
const request = require('request');

console.log('Este es el hilo principal');

const empezarWorker = (path, callback)=>{
    let w = new Worker(path, {workerData: null});

    w.on('message', msg =>{
        callback(null,msg);
    })

    w.on('error', callback);
    w.on('exit', code => {
        if (code != 0) console.error(new Error(`El worker se ha parado, codigo de salida : ${code}`));
    })

    return w;

}

let miWorker = empezarWorker(`${__dirname}/js/codigoworker.js`, (error,resultado)=>{
    if (error) return console.error(error);

    console.log('[[Proceso con gran carga computacional terminado]]');
    console.log('El primer valor es: ' + resultado.val);
    console.log('Ha tardado ' + (resultado.timeDiff / 1000) + 'segundos');

});

request.get('http://www.google.com', (err,response)=>{
    if(err) return console.error(err);
    console.log('Total de bytes recibidos: ', response.body.length);
})