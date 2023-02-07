const Sequelize = require('sequelize');
const db = require('../config/DBConfig');

/* Creates a user(s) table in MySQL Database. 
   Note that Sequelize automatically pleuralizes the entity name as the table name
   !! put the name in mysql as "weightreporttables"
*/

const WeightT = db.define('weightreporttables', {
    userid: {
        type: Sequelize.INTEGER
    },
    weight: {
        type: Sequelize.INTEGER
    },
    date: {
        type: Sequelize.DATE
    },
    time: {
        type: Sequelize.TIME
    }
});

module.exports = WeightT;
