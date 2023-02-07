const Sequelize = require('sequelize');
const db = require('../config/DBConfig');

/* Creates a user(s) table in MySQL Database. 
   Note that Sequelize automatically pleuralizes the entity name as the table name
   !! put the name in mysql as "heightreporttables"
*/

const HeightT = db.define('heightreporttables', {
    userid: {
        type: Sequelize.INTEGER
    },
    height: {
        type: Sequelize.INTEGER
    },
    date: {
        type: Sequelize.DATE
    },
    time: {
        type: Sequelize.TIME
    }
});

module.exports = HeightT;
