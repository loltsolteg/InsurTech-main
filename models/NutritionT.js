const Sequelize = require('sequelize');
const db = require('../config/DBConfig');

/* Creates a user(s) table in MySQL Database. 
   Note that Sequelize automatically pleuralizes the entity name as the table name
   !! put the name in mysql as "nutritiontables"
*/

const NutritionT = db.define('nutritiontable', {
    meal: {
        type: Sequelize.STRING(10)
    },
    food: {
        type: Sequelize.STRING(300)
    },
    calories: {
        type: Sequelize.INTEGER
    },
    carbs: {
        type: Sequelize.FLOAT
    },
    fat: {
        type: Sequelize.FLOAT
    },
    protein: {
        type: Sequelize.FLOAT
    },
    date: {
        type: Sequelize.DATEONLY
    },
    userId: {
        type: Sequelize.INTEGER
    }

    
});

module.exports = NutritionT;
