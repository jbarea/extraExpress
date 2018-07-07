//alert()

var socket = io();

socket.on('connect', function(){
    console.log('Te has conectado');

    socket.emit('clientNewMessage', {
        from: 'Client',
        text: 'Client message',
        createdAt: Date.now()
    })
})

socket.on('disconnect', function(){
    console.log('Te has desconectado del servidor');
})

socket.on('serverNewMessage', function(message){
    console.log('New Message: ', message);
})