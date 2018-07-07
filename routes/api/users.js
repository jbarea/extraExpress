const router = require('express').Router();
const Users = require('../../models/users');

router.get('/',(req,res)=>{
    res.send(req.params);
})