const express = require('express');
const router = express.Router();
const moment = require('moment');

const alertMessage = require('../helpers/messenger'); // Bring in alert messenger

//gets model/NutritionT
const NutritionT = require('../models/NutritionT');

//gets model/HGoalsT
const HGoalsT = require('../models/HGoalsT');

//gets model/HeightT
const HeightT = require('../models/heightT');
const sequelize = require('../config/DBConfig');

// always reference to /health in your view links before you get('/insertroutehere')

// Activates views/health/healthAssistant.handlebars
router.get('/showHealthAssistant', (req, res) => {
    res.render('health/healthAssistant');
});

//tracking page routes to nutrition+fitness pgs
// healthAssistant -> healthTracking
router.get('/tracking/', (req, res) => {
    res.render('health/tracking/healthTracking');
});

//-------------------------------------------------------//
//tracking -> nutrition today

router.get('/tracking/nutrition', (req, res) => {
    //display todaydate as DD/MM/YYYY
    const todaydate = moment().format('DD/MM/YYYY');
    let tdate = moment().format('YYYY-MM-DD');
    NutritionT.findAll({
        where: {
            date: tdate
        },
        order: [
        ],
        raw: true
    })
        .then((nutritionT) => {
            res.render('health/tracking/nutritionTracking', {
                nutritionT: nutritionT,
                todaydate: todaydate,
            });
        })
        .catch(err => console.log(err));
});

//nutrition view all
router.get('/tracking/nutrition/viewAll', (req, res) => {

    let tdate = moment().format('YYYY-MM-DD');
    NutritionT.findAll({
        where: {

        },
        order: [
            ['date', 'DESC']
        ],
        raw: true
    })
        .then((nutritionT) => {
            res.render('health/tracking/nutritionTViewAll', {
                nutritionT: nutritionT,
            });
        })
        .catch(err => console.log(err));
});

router.get('/tracking/nutrition/addMeal', (req, res) => {
        //display todaydate as DD/MM/YYYY
        const todaydate = moment().format('DD/MM/YYYY');

    res.render('health/tracking/ntAddMeal',{
        todaydate: todaydate
    });
});
// Adds new nt meal from health/tracking/ntAddMeal
router.post('/tracking/ntAddMeal', (req, res) => {
    let meal = req.body.meal;
    let food = req.body.food;
    let calories = req.body.calories;
    let carbs = req.body.carbs;
    let fat = req.body.fat;
    let protein = req.body.protein;
    //gets current date in YYYY-MM-DD for db format
    let date = moment().format('YYYY-MM-DD');
    let userId = 1; //to be change to logged in userId
    

    // Multi-value components return array of strings or undefined
    NutritionT.create({
        meal,
        food,
        calories,
        carbs,
        fat,
        protein,
        date,
        userId
    }).then((nutritionT) => {
        //redirects to the URL derived from the specified path
        res.redirect('/health/tracking/nutrition');
    })
        .catch(err => console.log(err))
});

//same as nutritiontracking view but showing edit and delete icons to click 
router.get('/tracking/nutrition/showEditMeals', (req, res) => {
    let tdate = moment().format('YYYY-MM-DD');
    const todaydate = moment().format('DD/MM/YYYY');

    NutritionT.findAll({
        where: {
            date: tdate
        },
        order: [
        ],
        raw: true
    })
        .then((nutritionT) => {
            res.render('health/tracking/ntShowEditMeals', {
                nutritionT: nutritionT,
                todaydate: todaydate
            });
        })
        .catch(err => console.log(err));
});
router.get('/tracking/ntEditMeal/:id', (req, res) => {
    const todaydate = moment().format('DD/MM/YYYY');

    NutritionT.findOne({
        where: {
            id: req.params.id
        },
        order: [
        ],
        raw: true
    })
        .then((nutritionT) => {
            res.render('health/tracking/ntEditMeal', {
                nutritionT: nutritionT,
                todaydate: todaydate
            });
        })
        .catch(err => console.log(err));
});
// Save edited meal
router.put('/tracking/saveEditedMeal/:id', (req, res) => {
    let meal = req.body.meal;
    let food = req.body.food;
    let calories = req.body.calories;
    let carbs = req.body.carbs;
    let fat = req.body.fat;
    let protein = req.body.protein;
    let date = req.body.date;

    NutritionT.update({
        meal,
        food,
        calories,
        carbs,
        fat,
        protein,
        date
    }, {
        where: {
            id: req.params.id
        }
    }).then((nutritionT) => {
        res.redirect('/health/tracking/nutrition');
    }).catch(err => console.log(err))
});
// Delete the nutritionT meal
router.get('/tracking/ntDeleteMeal/:id', (req, res) => {
    NutritionT.findOne({
        where: {
            id: req.params.id
        }
    }).then((nutritionT) => {
        let meal = nutritionT.meal; // to store the nutritionT meal to display in success message
        // if(req.user.id === nutritionT.id){
        NutritionT.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => { //Re-direct to the meal list page with the appropriate success message
            // alertMessage(res, 'success', meal + ' Meal deleted', 'fa-solid fa-trash', true);
            res.redirect('/health/tracking/nutrition');
        })
        // }else{
        //     alertMessage(res, 'danger', 'Unauthorised access', 'fas fa-exclamation-circle', true);
        //     // res.redirect('/logout');
        // }
    }).catch(err => console.log(err)); // To catch no nutritionT ID
});

//-------------------------------------------------------//
// healthAssistant -> healthReport
//healthAssistant page routes to healthReport page
router.get('/report/', (req, res) => {
    HeightT.findAll({
        where: {
        },
        order: [
        ],
        raw: true
    })
        .then((heightT) => {
            res.render('health/report/healthRecord', {
                heightT: heightT
            });
        })
        .catch(err => console.log(err));
});

//-------------------------------------------------------//
//report -> healthRecord
router.get('/report/addHeight', (req, res) => {
    res.render('health/report/hrAddHeight');
});
router.post('/report/hrAddHeight', (req, res) => {
    let userid = 1;
    let height = req.body.height;
    let date = req.body.date;
    let time = req.body.time;

    HeightT.create({
        userid,
        height,
        date,
        time
    }).then((height) => {
        //redirects to the URL derived from the specified path
        res.redirect('/health/report/');
    })
        .catch(err => console.log(err))
});

router.get('/report/hrEditHeight/:id', (req, res) => {
    HeightT.findOne({
        where: {
            id: req.params.id
        },
        order: [
        ],
        raw: true
    })
        .then((heightT) => {
            res.render('health/report/hrEditHeight', {
                heightT: heightT
            });
        })
        .catch(err => console.log(err));
});

router.put('/report/editedHeight/:id', (req, res) => {
    let userid = 1;
    let height = req.body.height;
    let date = req.body.date;
    let time = req.body.time;

    HeightT.update({
        userid,
        height,
        date,
        time
    }, {
        where: {
            id: req.params.id
        }
    }).then((heightT) => {
        res.redirect('/health/report/');
    }).catch(err => console.log(err))
});

router.get('/report/deleteHeight', (req, res) => {
    HeightT.findAll({
        where: {
        },
        order: [
        ],
        raw: true
    })
        .then((heightT) => {
            res.render('health/report/hrDeleteHeight', {
                heightT: heightT
            });
        })
        .catch(err => console.log(err));
});

router.get('/report/hrDeleteHeight/:id', (req, res) => {
    HeightT.findOne({
        where: {
            id: req.params.id
        }
    }).then((heightT) => {
        HeightT.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => {
            res.redirect('/health/report');
        })
    }).catch(err => console.log(err));
});

//-------------------------------------------------------//
//tracking page routes to goal pg
// healthAssistant -> healthGoals
router.get('/goals/', (req, res) => {
    //display todaydate as DD/MM/YYYY
    const todaydate = moment().format('DD/MM/YYYY');
    let tdate = moment().format('YYYY-MM-DD');

    HGoalsT.findAll({
        where: {
            gdate: tdate
        },
        order: [
        ],
        raw: true
    })
        .then((hgoalsT) => {

            NutritionT.findAll({
                attributes: {
                    include: [
                        [sequelize.fn('SUM', sequelize.col('calories')), 'sumCal'],
                        [sequelize.fn('AVG', sequelize.col('carbs')), 'avgCarbs'],
                        [sequelize.fn('AVG', sequelize.col('fat')), 'avgFat'],
                        [sequelize.fn('AVG', sequelize.col('protein')), 'avgProtein'],
                    ]
                },
                where: {
                    date: tdate
                },
                order: [
                ],
                raw: true,
            }).then((nutritionT) => {
                res.render('health/goals/healthGoals', {
                    nutritionT: nutritionT,
                    hgoalsT: hgoalsT,
                    todaydate: todaydate,
                    
                });
            })
                .catch(err => console.log(err));
        });
});


router.get('/goals/addGoal', (req, res) => {
    res.render('health/goals/hgAddGoal');
});

// Adds new health goal
router.post('/goals/hgAddGoal', (req, res) => {
    let gcalories = req.body.calories;
    let gcarbs = req.body.carbs;
    let gfat = req.body.fat;
    let gprotein = req.body.protein;
    let gdate = moment().format('YYYY-MM-DD');
    let userId = 1; //to be change to logged in userId
    let gcalburnt = req.body.calburnt;
    let gweight = req.body.weight;
    let gstepcount = req.body.stepcount;
    let gduration = req.body.duration;

    // Multi-value components return array of strings or undefined
    HGoalsT.create({
        gcalories,
        gcarbs,
        gfat,
        gprotein,
        gdate,
        userId,
        gcalburnt,
        gweight,
        gstepcount,
        gduration

    }).then((hgoalsT) => {
        //redirects to the URL derived from the specified path
        res.redirect('/health/goals/');
    })
        .catch(err => console.log(err))
});
router.get('/goals/hgEditGoal/:id', (req, res) => {
    const todaydate = moment().format('DD/MM/YYYY');

    HGoalsT.findOne({
        where: {
            id: req.params.id
        },
        order: [
        ],
        raw: true
    })
        .then((hgoalsT) => {
            res.render('health/goals/hgEditGoal', {
                hgoalsT: hgoalsT,
                todaydate: todaydate
            });
        })
        .catch(err => console.log(err));
});
// Save edited meal
router.put('/goals/saveEditedGoal/:id', (req, res) => {
    let gcalories = req.body.calories;
    let gcarbs = req.body.carbs;
    let gfat = req.body.fat;
    let gprotein = req.body.protein;
    let gdate = moment().format('YYYY-MM-DD');
    let userId = 1; //to be change to logged in userId
    let gcalburnt = req.body.calburnt;
    let gweight = req.body.weight;
    let gstepcount = req.body.stepcount;
    let gduration = req.body.duration;

    HGoalsT.update({
        gcalories,
        gcarbs,
        gfat,
        gprotein,
        gdate,
        gcalburnt,
        gweight,
        gstepcount,
        gduration
    }, {
        where: {
            id: req.params.id
        }
    }).then((hgoalsT) => {
        res.redirect('/health/goals/');
    }).catch(err => console.log(err))
});

module.exports = router;
