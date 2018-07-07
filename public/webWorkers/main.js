//alert();
var worker;
function startWorker(){
   if(typeof(Worker) !== 'undefined'){
       if(typeof worker==='undefined'){
           worker = new Worker('/public/webWorkers/worker.js');
           console.log('Creando worker') 
           worker.onmessage = function (e) {
               onMsg(e);
           }

           worker.onerror=function(e){
               onError(e);
           }

           worker.postMessage('5000000');
       }
   }else{
       alert('Tu navegador no soporta workers!!!')
   }
}

function onMsg(ev){
    console.log(ev);
    //console.log(JSON.parse(ev.data));
    document.getElementById('result').textContent = ev.data;
}

function onError(ev){
    console.log(ev);
    document.getElementById('error').textContent = [
        'ERROR: Line', ev.lineno, 'in', ev.filename, ':', ev.message
    ]
}

function stopWorker(){
    if(typeof worker!=='undefined'){
        worker.terminate();
    }
}

// worker.addEventListener('message',function(e){
//     //alert(e.data);
//     console.log(JSON.parse(e.data));
// },false)