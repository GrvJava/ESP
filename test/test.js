const userSerive = require('../services/userService');
let dummy = {};
dummy.data = 123;

userSerive.getActivePlayers(function(error, result){
    if(!error){
        userSerive.updateActivePlayers(JSON.stringify(dummy), function(err, res){
            console.log(err, res);
        });
    }
});