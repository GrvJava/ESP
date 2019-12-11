'use strict'
const userModel = require('../staticfiles/users');
const _ = require('lodash');

var validateUserWithPassword = (data, callback) => {
    if(data.user_id){
        callback(null, userModel.users.login[data.user_id.toString()]);
    } else {
        callback(new Error("login error!"));
    }
};

module.exports = {
    validateUserWithPassword
};
