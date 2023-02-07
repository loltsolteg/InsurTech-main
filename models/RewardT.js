const Sequelize = require('sequelize');
const db = require('../config/DBConfig');


/* Creates a reward table in MySQL Database. 
   Note that Sequelize automatically pleuralizes the entity name as the table name
   !! put the name in mysql as "rewardtable"
*/

const RewardT = db.define('rewards', {
    id:{
        type: Sequelize.DataTypes.UUIDV4,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.DECIMAL(10,0)
    },
    points: {
        type: Sequelize.INTEGER
    },
    category: {
        type: Sequelize.STRING
    },
    code: {
        type: Sequelize.STRING
    }
});

module.exports = RewardT;
