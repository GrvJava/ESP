const Q = require('q');
const fs = require('fs');

var getActivePlayers = (callback) => {
    fs.readFile(process.env.HOME_PATH+'/staticfiles/active_players.json', 'utf8', (err, jsonString) => {
        if (err) {
            callback(err);
        }
        callback(null, jsonString.toString());
    });
};

var updatePlayers = function(jsonString,callback) {
    fs.writeFile(process.env.HOME_PATH+'/staticfiles/active_players.json', jsonString, err => {
        if (err) {
            callback(new Error("Error in writing file"));
        } else {
            callback(null, "File updated successfully!");
        }
    });
};

var updateActivePlayers = (jsonString ,callback) => {
    getActivePlayers(function(err, result){
        if(err){
            callback(new Error("error in reading file."));
        } else {
            updatePlayers(jsonString, function(error, response){
                if(error){
                    callback(error);
                } else {
                    callback(null, response);
                }
            });
        }
    });
};

module.exports = {
    getActivePlayers,
    updateActivePlayers,
    updatePlayers
};
