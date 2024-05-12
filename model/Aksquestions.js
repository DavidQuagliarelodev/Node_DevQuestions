const Sequelize = require('sequelize');
const connection = require('../db/database')

const Askquestion = connection.define('askquestion', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Askquestion.sync({force: false})
module.exports = Askquestion