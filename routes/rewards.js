const express = require('express');
const router = express.Router();
const moment = require('moment');
const RewardT = require('../models/RewardT');
const mysql = require('mysql');
const alert = require('alert');
const readline = require("readline");
const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

router.get('/showRewardAssistant', (req, res) => {
    res.render('rewards/adminRewards');
});

router.get('/showRedeemAssistant', (req, res) => {
    res.render('rewards/adminRedeem');
});

//render tracker pages
router.get('/admin/createReward', (req, res) => {
    res.render('rewards/admin/adminCreateRewards');
});

router.get('/admin/viewRewards', (req, res) =>  {
    RewardT.findAll({
        raw: true
    })
        .then((rewards) => {
            // pass object to adminViewrewards.handlebar
            res.render('rewards/admin/adminViewRewards', { rewards });
        })
        .catch(err => console.log(err));
});

function randomCode() { 
    result = ""
    const characters = "QWERTYUIOPASDFGHJKLZXCVBNM";
    const charactersLength = characters.length;
    let counter = 0;
    while( counter < 5){
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
        counter += 1
    }
    return(result);
}

router.post('/admin/adminCreateRewards', (req, res) => {
    let title = req.body.title;
    let price = req.body.price;
    let points = req.body.points;
    let category = req.body.category;
    let code = randomCode();

    if ( isNaN(price) || isNaN(points) ) { 
        alert("Price and Points must be numbers, entry not created")
        res.redirect('/rewards/showRewardAssistant');
      } 

    RewardT.create({
        title,
        price,
        points,
        category,
        code
        }).then((RewardT) => {
            alert("Reward has been created")
            res.redirect('/rewards/admin/viewRewards');
        })
            .catch(err => console.log(err))
});


router.get('/admin/edit/:id', (req,res) => {
    RewardT.findOne({
        where:{
            id: req.params.id
        },
        order: [

        ],
        raw: true
    })
        .then((rewardT) => {
            res.render('rewards/admin/adminEditRewards', {
                rewardT:rewardT
            });
        })
        .catch(err => console.log(err));
});

router.put('/admin/saveUpdatedReward/:id', (req,res) => {
    let title = req.body.title;
    let price = req.body.price;
    let points = req.body.points;
    let category = req.body.category;

    if (isNaN(price) || isNaN(points)) {
        alert("Price and Points must be numbers, record not updated");
        res.redirect("/rewards/admin/viewRewards")
    }

    RewardT.update({
        title,
        price,
        points,
        category
    },{
        where: {
            id: req.params.id
        }
    }).then((rewardT)=>{
        res.redirect('/rewards/admin/viewRewards');
        alert("Successfully edited");
    }).catch(err => console.log(err))
});

router.get('/admin/adminDeleteReward/:id', (req, res) => {
    RewardT.findOne({
        where:{
            id:req.params.id
        }
    }).then ((rewardT) => {
        rewardT.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => {
            alert("Record has been deleted");
            res.redirect('/rewards/admin/viewRewards');
        })
    }).catch(err => console.log(err));
});

router.get("/admin/showRedeem", (req, res) => {
    RewardT.findAll({
        raw: true
    })
        .then((rewards) => {
            // pass object to adminViewrewards.handlebar
            res.render('rewards/admin/reedeemReward', { rewards });
        })
        .catch(err => console.log(err));
});


router.get("/admin/confirmReedeem/:id", (req,res) => {
    RewardT.findOne({
        where:{
            id: req.params.id
        },
        order: [

        ],
        raw: true
    })
        .then((rewardT) => {
            res.render('rewards/admin/confirmReedeem', {
                rewardT:rewardT
            });
        })
        .catch(err => console.log(err));
});

router.get("/admin/redeemReward/:id", (req,res) => {
    RewardT.findOne({
        where:{
            id: req.params.id
        },
        order: [

        ],
        raw: true
    })
        .then((rewardT) => {
            res.render('rewards/admin/redeemPage', {
                rewardT:rewardT
            });
        })
        .catch(err => console.log(err));
});

router.get("/admin/redeemPage", (req,res) => {
    res.render('rewards/admin/redeemCode');
});

router.post('/admin/claimReward', (req, res) => {
    let code = req.body.code;
    RewardT.findOne({
            where:{
                code:code
            }
        }).then ((rewardT) => {
            rewardT.destroy({
                where: {
                    code:code
                }
            }).then(() => {
                res.redirect('/rewards/admin/showRedeem');
                alert("Successfully reedeemed");
            })
        }).catch(err => console.log(err));

    
});


    


module.exports = router;