const Sequelize = require('sequelize');
const CONN = require('../connection/mysqlconn');

const User = CONN.define('user',{
    firstName: Sequelize.STRING,
    lastName: {
        type: Sequelize.STRING
    }
})

User.sync({force: false}).then(()=>{
    // return User.create({
    //     firstName: 'John',
    //     lastName: 'Ruiz'
    // })
})
.then(res=>{
    //console.log(res);
    // User.findAll().then(res => {
    //     console.log(res);
    // });
})

module.exports = User;