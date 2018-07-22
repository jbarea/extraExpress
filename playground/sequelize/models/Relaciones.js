const Sequelize = require('sequelize');
const CONN = require('../connection/mysqlconn');

const Artist = CONN.define('artist',{name: Sequelize.STRING});
const Band = CONN.define('band',{name: Sequelize.STRING});

Artist.belongsTo(Band);
Artist.hasOne(Band, {as: 'lead'});

Artist.sync({force: true});
Band.sync({force: true});
CONN.query("SET GLOBAL FOREIGN_KEY_CHECKS=0");