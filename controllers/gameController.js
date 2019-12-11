var express = require('express');
var router = express.Router();
var validationRules = require('../validationRules/rules');
var asyncValidator = require('async-validator-2');
var loginService = require('../services/login');
var gameService = require('../services/gameService');
var images = require('../staticfiles/images');

router.post('/startPlay', (req, res)=>{
    var data = {
        first_player: req.body.user_id,
      };
  
      var rules = validationRules.rules.play;
      var validator = new asyncValidator(rules);
  
      validator.validate(data, (error, fields)=>{
        if(!error){
            gameService.playGame(data, function(err, response){
                if(err){
                    res.status(400);
                    console.log(err);
                    res.send("Error in getting images");
                } else {
                    res.status(200);
                    console.log(response);
                    res.send(images.images[response.toString()].toString());
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

router.post('/chooseSecondaryImage', (req, res)=>{
    var data = {
        first_player: req.body.user_id,
        image_id: req.body.image_id
      };
  
      var rules = validationRules.rules.secondaryImage;
      var validator = new asyncValidator(rules);
  
      validator.validate(data, (error, fields)=>{
        if(!error){
            gameService.updateSecondaryImage(data, function(err, response){
                if(err){
                    res.status(400);
                    console.log(err);
                    res.send("Error in getting images");
                } else {
                    res.status(200);
                    console.log(response);
                    res.send(response);
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

module.exports = router;
