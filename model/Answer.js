const Sequelize = require('sequelize');
const connection = require('../db/database');


const Answer = connection.define("answer",{
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    questionid: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Answer.sync({force: false})
module.exports = Answer