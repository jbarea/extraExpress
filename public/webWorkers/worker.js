//postMessage('Mensaje de prueba');

// self.postMessage = function (message) {
//     var length = parseInt(message.data);
//  console.log('probando worker')
//     var start = Date.now();
//     var elGranArray = Array(lenght).fill().map(function(){return random (2,10000)});
//     //postMessage('Funcionando!!!');
//     console.log('probando worker2')
//     postMessage('Ha tardado ' + ((Date.now() - start)/1000) + '. El indice 0 es: '+ elGranArray[0])
// }
function random(min, max) {
    return Math.random() * (max - min) + min;
}

self.onmessage = function (message) {
    var length = parseInt(message.data);

    var start = Date.now();
    var elGranArray = Array(length).fill().map(function () {
        return random(2, 10000)
    })
    elGranArray.sort(function (a, b) {
        return a - b;
    })
    postMessage('Ha tardado ' + ((Date.now() - start) / 1000) + 's. El indice 0 es: ' + elGranArray[0]);
}
// var obj = {
//     foo: 'bar',
//     test: true
// }

