const Sequelize = require('sequelize');
const conection = new Sequelize('devquestions', 'root', 'Gisele12@', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports  = conection;