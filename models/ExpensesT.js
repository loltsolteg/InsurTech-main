const Sequelize = require('sequelize');
const db = require('../config/DBConfig');


/* Creates a user(s) table in MySQL Database. 
   Note that Sequelize automatically pleuralizes the entity name as the table name
   !! put the name in mysql as "nutritiontables"
*/

const ExpensesT = db.define('expensetable', {
    expense: {
        type: Sequelize.STRING(50)
        
    },
    amount: {
        type: Sequelize.FLOAT
    }
});
module.exports = ExpensesT;
