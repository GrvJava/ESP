const userRepo = require('../respositories/userRepo');
const Q = require('q');

var login = (data, callback) => {
    userRepo.validateUserWithPassword(data, function(error, response) {
        if(error){
            callback(error);
        } else {
            if(response && response.toString() === data.password.toString()){
                callback(null, 'login success');
            } else {
                callback(new Error("Wrong user or password!!"));
            }
        }
    });
};

module.exports = {
    login
};
