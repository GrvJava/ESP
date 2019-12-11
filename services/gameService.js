const userService = require('../services/userService');
const Q = require('q');
const _ = require('lodash');

var choosePrimaryImage = (callback) => {
    userService.getActivePlayers(function(error, response){
        if(error){
            callback(error);
        } else {
            try{
                response = JSON.parse(response);
                if(_.isEmpty(response))
                    callback(null, {});
                else {
                    Object.keys(response).forEach(function(key) {
                        if(!_.get(response[key], 'isPaired'))
                            callback(null, response[key]);
                    });  
                }
            } catch(ex){
                console.log("Error_choosePrimaryImage");
                callback(ex);
            }
        }
    });
};

var pairCustomers = function(data, callback) {
    userService.getActivePlayers(function(error, response){
        if(error){
            callback(error);
        } else {
            try{
                response = JSON.parse(response);
                response[data.second_player.toString()].isPaired = true;
                response[data.second_player.toString()].isPairedWith = data.first_player.toString();
                response[data.first_player.toString()] = {};
                response[data.first_player.toString()].isPaired = true;
                response[data.first_player.toString()].isPairedWith = data.second_player.toString();
                response[data.first_player.toString()].points = 0;
                response[data.first_player.toString()].user_id = data.first_player.toString();
                response[data.first_player.toString()].primary_image = data.primary_image.toString();
                userService.updatePlayers(JSON.stringify(response), function(err, response){
                    if(err){
                        callback(err);
                    }
                    callback(null, response);
                });
            } catch(ex){
                callback(ex);
            }
        }
    });
};

var playGame = function(data, callback) {
    choosePrimaryImage(function(err, element){
        if(err)
            callback(err);
        else {
            if(_.isEmpty(element)){
                let user  = {};
                user[data.first_player.toString()] = {};
                user[data.first_player.toString()].points = 0;
                user[data.first_player.toString()].user_id = data.first_player.toString();
                user[data.first_player.toString()].primary_image = Math.floor(Math.random() * 15) + 1;
                user[data.first_player.toString()].isPaired = false;
                userService.updatePlayers(JSON.stringify(user), function(error){
                    if(error)
                        callback(error);
                    else
                        callback(null, user[data.first_player.toString()].primary_image); 
                });
            } else{
                data.second_player = element.user_id;
                data.primary_image = element.primary_image;
                pairCustomers(data, function(error, response){
                    if(error)
                        callback(error);
                    else
                        callback(null, element.primary_image);
                });
            }
        }
    });
};

var updateSecondaryImage = function(data, callback) {
    userService.getActivePlayers(function(err, response) {
        try{
            response = JSON.parse(response);
            if(err || _.isEmpty(response) || !response[data.first_player]){
                callback(new Error("There was some error in choosing secondary image, may be you have not choosen primary image"));
            } else {
                response[data.first_player.toString()].secondary_image = data.image_id;
                if(response[data.first_player.toString()].isPaired){
                    let pairedWith = response[response[data.first_player].isPairedWith];
                    if(pairedWith.secondary_image && pairedWith.secondary_image == data.image_id){
                        response[data.first_player].points = Number(response[data.first_player].points || 0) + 1;
                        response[response[data.first_player].isPairedWith].points = Number(response[response[data.first_player].isPairedWith].points || 0) + 1;
                    }
                }
                console.log(response);
                userService.updatePlayers(JSON.stringify(response), function(error){
                    if(error)
                        callback(error);
                    else
                        callback(null, "Updated your points!"); 
                });
            }
        } catch(ex){
            callback(ex);
        }
    });
};

module.exports = {
    choosePrimaryImage,
    pairCustomers,
    playGame,
    updateSecondaryImage
};