'use strict';
const config = require('./config.json')

const env = process.env.NODE_ENV || 'development';
console.log('process.env.NODE_ENV', env);

if (env === 'development' || env === 'production') {
    process.env = {
        ...process.env,
        ...config[env]
    }
    console.log(process.env.PORT);
}