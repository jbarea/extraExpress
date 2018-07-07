const express = require('express');
const router = express.Router();
const path = require('path');

const middlewareClase = (req, res) => {
    if(req.query.send){
        res.send('Se ha enviado');
    }else{
        res.status(500).send('Error');
    }
};

router.get('/:lang(es|en)',(req,res)=>{
    res.send(req.params);
})

//si hacemos un ?send=true desde el navegador cuando llamemos a middleware mostrara el mensaje se ha enviado
router.get('/middleware', middlewareClase, (req, res) => {
    res.send(req.params);
})

router.get('/getHeaders',(req,res)=>{
    res.setHeader('x-auth','tokenJWT');
    res.sendFile(path.join(__dirname,'../public/getHeaders/index.html'));
})

router.get('/webWorkers',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/webWorkers/index.html'))
})

router.get('/socket', (req,res) => {
    res.sendFile(path.join(__dirname,'../public/socket/index.html'));
})

module.exports = router;