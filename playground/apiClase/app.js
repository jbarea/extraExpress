const express = require('express');
const app = express();
const uuid = require('uuid')
const bodyParser = require('body-parser');
const _ = require('lodash');

app.use(bodyParser.json());

const personas = [];

app.post('/api/user',(req,res)=>{
    const persona = {
        ..._.pick(req.body, ['name']),
        _id: uuid(),
        token: uuid(),
        timestamp: _.now()
    }
    personas.push(persona);
    res.setHeader('x-auth', persona.token);
    res.send(_.pick(persona,['name','timestamp']));
})

const authenticate = (req, res, next) => { //este es un middleware
    const token = req.headers['x-auth'];

    const filtrado = personas.filter(persona => persona.token === token)

    if (filtrado.length >= 1) {
        req.user = filtrado[0]
        next();
    } else {
        res.status(401).send({
            error: 401,
            message: 'User not found'
        });
    }
}

app.get('/api/user',authenticate,(req,res)=>{
    // const filtrado = personas.filter((persona) => persona.name === req.params.name)[0]
    // res.send(filtrado);
    res.send(req.user);
})

app.get('/api/user/:name',(req,res)=>{
    const filtrado =personas.filter((persona) => persona.name === req.params.name)
    const respuesta={
        filtrado,
        timestamp: Date.now()
    }
    res.send(respuesta);
})

app.delete('/api/user', (req,res) => {

})

app.listen(8080, () => {
    console.log('http://localhost:8080');
});
