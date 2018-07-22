const Sequelize = require('sequelize');
const CONN = new Sequelize('claseBootcamp','root','',{
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

//module.exports.CONN2 = new Sequelize('mysql://root:@localhost:3306/claseBootcamp');

// module.exports.CONN2.authenticate().then(()=>{
//     console.log('La conexion ha funcionado');
// }).catch(err=>{
//     console.error(new Error(err));
// });


module.exports = CONN;
