const Sequelize = require('sequelize');
const db = require('../config/DBConfig');


/* Creates a user(s) table in MySQL Database. 
   Note that Sequelize automatically pleuralizes the entity name as the table name
   !! put the name in mysql as "nutritiontables"
*/

const SavingsT = db.define('savingstable', {
    budget: {
        type: Sequelize.STRING(50)
        
    },
    budgetAmount: {
        type: Sequelize.INTEGER
    },
    expense:{
        type: Sequelize.STRING(50)
    },
    expenseAmount: {
        type: Sequelize.INTEGER
    }
});
module.exports = SavingsT;
