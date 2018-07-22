//const jwt = require('jsonwebtoken');
const {sign,verify} = require('jsonwebtoken');
const genPayload = require('./utils').genPayload;
const secretKey = 'secret';
const access = 'auth';

const user = {
    id: 555,
    user: 'ivan@geekshubsacademy.com'
}
//lo que hay entre las primeras llaves es lo que se conoce como payload
//con el antiguo const seria jwt.sign

const token = sign(genPayload({
    ...user,
    access
}), secretKey).toString();

// console.log(token +'\n');
// verify(token, secretKey, (err, decoded)=>{
//     if(err) return console.error(new Error(err));
//     console.log(decoded);
// })

const dentroDeTiempo = 0, fueraDeTiempo = 1001;
setTimeout(()=>{
    try {
        const decoded = verify(token, secretKey);
        console.log(decoded);
    } catch (err) {
        console.error(new Error(err));
    }
}, dentroDeTiempo);
