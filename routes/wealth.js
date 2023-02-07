const express = require('express');
const router = express.Router();
const BudgetT = require('../models/BudgetT');
const ExpensesT = require('../models/ExpensesT');
const moment = require('moment');
const sequelize = require('../config/DBConfig');

router.get('/showWealthAssistant', (req, res) => {
    res.render('wealth/wealthAssistant');
});

//render tracker pages
router.get('/tracking/', (req, res) => {
    res.render('wealth/tracking/wealthTracking');
});

// view today budget (OLD)
// router.get('/tracking/budget', (req, res) => {
//     res.render('wealth/tracking/budgetTracking');
// });

router.get('/tracking/budget', (req, res) => {
    BudgetT.findAll({
        where:{
        },
        order:[
        ],
        raw: true
    })
        .then((budgetT) => {
            res.render('wealth/tracking/budgetTracking',{
                budgetT:budgetT
            });
        })
        .catch(err => console.log(err));
});

router.get('/tracking/budget/AddBudget', (req, res) => {
    res.render('wealth/tracking/wAddBudget');
});

//creation of new budget
router.post('/tracking/wAddBudget', (req, res) => {
    let budget = req.body.budget;
    let amount = req.body.amount;

    // Multi-value components return array of strings or undefined
    BudgetT.create({
        budget,
        amount
    }).then((budgetT) => {
        res.redirect('/wealth/tracking/budget');
    })
        .catch(err => console.log(err))
});

router.get('/tracking/budget/showEditBudgets', (req, res) => {
    BudgetT.findAll({
        where:{
        },
        order:[
        ],
        raw: true
    })
        .then((budgetT) => {
            res.render('wealth/tracking/wShowEditBudgets',{
                budgetT:budgetT
            });
        })
        .catch(err => console.log(err));
});

router.get('/tracking/wEditBudget/:id', (req,res) => {
    BudgetT.findOne({
        where:{
            id: req.params.id
        },
        order: [

        ],
        raw: true
    })
        .then((budgetT) => {
            res.render('wealth/tracking/wEditBudget', {
                budgetT:budgetT
            });
        })
        .catch(err => console.log(err));
});

router.put('/tracking/saveEditedBudget/:id', (req,res) => {
    let budget = req.body.budget;
    let amount = req.body.amount;

    BudgetT.update({
        budget,
        amount
    },{
        where: {
            id: req.params.id
        }
    }).then((budgetT)=>{
        res.redirect('/wealth/tracking/budget');
    }).catch(err => console.log(err))
});

router.get('/tracking/wDeleteBudget/:id', (req, res) => {
    BudgetT.findOne({
        where:{
            id:req.params.id
        }
    }).then ((budgetT) => {
        let budget = budgetT.budget;
        BudgetT.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => {
            res.redirect('/wealth/tracking/budget');
        })
    }).catch(err => console.log(err));
});

//routers for expenses tracker
router.get('/tracking/expense', (req, res) => {
    ExpensesT.findAll({
        where:{
        },
        order:[
        ],
        raw: true
    })
        .then((expensesT) => {
            res.render('wealth/tracking/expenseTracking',{
                expensesT:expensesT
            });
        })
        .catch(err => console.log(err));
});

router.get('/tracking/expense/AddExpense', (req, res) => {
    res.render('wealth/tracking/wAddExpense');
});

//creation of new budget
router.post('/tracking/wAddExpense', (req, res) => {
    let expense = req.body.expense;
    let amount = req.body.amount;

    // Multi-value components return array of strings or undefined
    ExpensesT.create({
        expense,
        amount
    }).then((expensesT) => {
        res.redirect('/wealth/tracking/expense');
    })
        .catch(err => console.log(err))
});

router.get('/tracking/expense/showEditExpenses', (req, res) => {
    ExpensesT.findAll({
        where:{
        },
        order:[
        ],
        raw: true
    })
        .then((expensesT) => {
            res.render('wealth/tracking/wShowEditExpenses',{
                expensesT:expensesT
            });
        })
        .catch(err => console.log(err));
});

router.get('/tracking/wEditExpense/:id', (req,res) => {
    ExpensesT.findOne({
        where:{
            id: req.params.id
        },
        order: [

        ],
        raw: true
    })
        .then((expensesT) => {
            res.render('wealth/tracking/wEditExpenses', {
                expensesT:expensesT
            });
        })
        .catch(err => console.log(err));
});

router.put('/tracking/saveEditedExpense/:id', (req,res) => {
    let expense = req.body.expense;
    let amount = req.body.amount;

    ExpensesT.update({
        expense,
        amount
    },{
        where: {
            id: req.params.id
        }
    }).then((expensesT)=>{
        res.redirect('/wealth/tracking/expense');
    }).catch(err => console.log(err))
});

router.get('/tracking/wDeleteExpense/:id', (req, res) => {
    ExpensesT.findOne({
        where:{
            id:req.params.id
        }
    }).then ((expensesT) => {
        let expense = expensesT.expense;
        ExpensesT.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => {
            res.redirect('/wealth/tracking/expense');
        })
    }).catch(err => console.log(err));
});

//routes for overall dashboard
router.get('/overallDashboard/', (req, res)=>{
    BudgetT.findAll({
        attribute: {
            include: [
                [sequelize.fn('SUM', sequelize.col('amount')), 'totalBudget'],
            ],
        },
        where:{
            
        },
        order: [

        ],
        raw: true
    })
        .then((budgetT) => {
            ExpensesT.findAll({
                where:{

                },
                order: [

                ],
                attributes: {
                    includes: [
                        [sequelize.fn('SUM', sequelize.col('amount')), 'totalExpenses'],
                    ]
                },
                raw: true
            }).then((expensesT) => {
                console.log(budgetT)
                res.render('wealth/overallDashboard/overallView', {
                    budgetT:budgetT,
                    expensesT: expensesT,    
                });
            })
        .catch(err => console.log(err));
    });
});



module.exports = router;