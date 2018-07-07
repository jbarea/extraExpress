require('./config/config.js');
const express = require('express');
const app = express();
const http = require('http');
const socketIO = require('socket.io');


const server = http.createServer(app);
const io = socketIO(server);
const PORT = process.env.PORT;

app.use('/public',express.static('./public'));



app.use('/', require('./routes/index.js'));

io.on('connection',(socket)=>{
    console.log('New user connect ' + socket.id);

    socket.emit('serverNewMessage', {
        from: 'Admin',
        text: 'Welcome to socket.io',
        createdAt: Date.now()
    })

    socket.on('clientNewMessage', (message)=>{
        //console.log(message);
        //socket.emit('serverNewMessage', message);
        //este io.emit es para cuando queremos emitir no a un socket concreto sino a todos los sockets conectados
        io.emit('clientNewMessage', {
            ...message,
            createdAt: Date.now()
        })

        //socket.broadcast.emit() se usa para mandar mensajes de broadcast
    })

    socket.on('disconnect', ()=>{
        console.log('Un usuario se ha desconectado');
    })
})

//antes estaba como app.listen
server.listen(PORT, () => {
    console.log(`=>http://localhost:${PORT}`);
})

module.exports = app;//esto es para poder lanzar app.js desde supertest.test.js