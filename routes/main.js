const express = require('express');
const router = express.Router();
const alertMessage = require('../helpers/messenger');

router.get('/', (req, res) => {
    res.render('main') // renders main.handlebars
});

// Logout User
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

//User Login Route
router.get('/showLogin', (req, res) => {
    res.render('user/login'); // Activates views/user/login.handlebar
});

// shows the register page
router.get('/showRegister', (req, res) => {
    res.render('user/register'); // Activates views/user/register.handlebar
});

// shows the about page
router.get('/about', (req, res) => {
    alertMessage(res, 'success', 'This is an important message', 'fas fa-sign-in-alt', true);
    alertMessage(res, 'danger', 'Unauthorised access', 'fas fa-exclamation-circle', false);

    let success_msg = 'Success message using success_msg!!';
    let error_msg = 'Error message using error_msg!!';

    let error = 'Error msg using error!!'
    let errors = [{ text: 'First error msg using errors' }, { text: 'Second error msg using errors' }, { text: 'Third error msg using errors' }]

    res.render('about', { 	// Activates views/about.handlebar, passing author as a variable
        success_msg: success_msg,
        error_msg: error_msg,
        error: error,
        errors: errors,
        author: author
    });
});

module.exports = router;
