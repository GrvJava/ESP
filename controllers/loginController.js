var express = require('express');
var router = express.Router();
var validationRules = require('../validationRules/rules');
var asyncValidator = require('async-validator-2');
var loginService = require('../services/login');

router.post('/login', (req, res)=>{
    var data = {
      user_id: req.body.user_id || req.query.user_id,
      password: req.body.password || req.query.password
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
                    //res.redirect(301,'/v1/startPlay', {user_id: data.user_id});
                    res.render(process.env.HOME_PATH+'/html/startPlay.ejs', {user_id: data.user_id});
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
    console.log(process.env.HOME_PATH+'/html/home.html')
    res.sendFile(process.env.HOME_PATH+'/html/home.html');
});

module.exports = router;
