const { Worker, isMainThread, workerData } = require('worker_threads');

let valorActual = 0;
let intervalos = [100,1000,500];

const contador = (id, i)=>{
    console.log(`worker ID: [${id}] Contador: ${i}`);
    return i;
}

if(isMainThread){
    console.log('Este es el hilo principal');

    for(let i = 0; i < 2; i++){
        let w = new Worker(__filename, {workerData: i});
    }

    setInterval((a)=>{
        valorActual = contador(a, valorActual + 1);
        return valorActual;
    } ,intervalos[2], 'MainThread')
}else{
    console.log('Este no lo es');

    setInterval((a) => {
        valorActual = contador(a, valorActual + 1);
        return valorActual;
    }, intervalos[workerData], workerData)
}