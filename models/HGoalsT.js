const Sequelize = require('sequelize');
const db = require('../config/DBConfig');

/* Creates a user(s) table in MySQL Database. 
   Note that Sequelize automatically pleuralizes the entity name as the table name
   !! put the name in mysql as "nutritiontables"
*/

const HGoalsT = db.define('healthgoal', {
    gcalories: {
        type: Sequelize.STRING
    },
    gcarbs: {
        type: Sequelize.STRING
    },
    gfat: {
        type: Sequelize.STRING
    },
    gprotein: {
        type: Sequelize.STRING
    },
    gdate: {
        type: Sequelize.DATEONLY
    },
    userId: {
        type: Sequelize.INTEGER
    },
    gcalburnt: {
        type: Sequelize.STRING
    },
    gweight: {
        type: Sequelize.STRING
    },
    gstepcount: {
        type: Sequelize.STRING
    },
    gduration: {
        type: Sequelize.STRING
    },
});

module.exports = HGoalsT;
