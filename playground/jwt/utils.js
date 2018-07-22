const moment = require('moment');
const defaultExpTime = Math.floor(moment.now() / 1000 + ((moment().add(1,'s') - moment.now())/1000 ));
const genPayload = ({id,user,access,exp=defaultExpTime})=>{
    return {
        id,
        user,
        access,
        iss: 'Admin',
        iat: moment.now(),
        exp //moment().add(1,'s')//para sumar 5 seg al timestamp actual. Con w serian 5 semanas, etc...
    }
}

module.exports = { genPayload };