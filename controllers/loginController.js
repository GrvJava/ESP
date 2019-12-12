var express = require('express');
var router = express.Router();
var validationRules = require('../validationRules/rules');
var asyncValidator = require('async-validator-2');
var loginService = require('../services/login');

router.post('/login', (req, res)=>{
    var data = {
      user_id: req.body.user_id,
      password: req.body.password
    };

    var rules = validationRules.rules.login;
    var validator = new asyncValidator(rules);

    validator.validate(data, (error, fields)=>{
        if(!error){
            loginService.login(data, function(err, result){
                if(err){
                    res.status(400);
                    res.send("err in login");
                } else {
                    req.session.user_id = data.user_id;
                    res.redirect('/startPlay');
                }
            });
        }
        else {
            console.log('Some fields are missing', fields, error);
            res.status(400);
            res.send('Some fields are missing');
        }
    });
});

router.get('/home', (req, res)=>{
    res.sendFile('/home/gauravkumar/grv_java/ESP/html/home.html');
});

module.exports = router;
