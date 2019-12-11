module.exports = {
    rules: {
        login: {
            user_id: {
                required: true,
                message: 'user_id cannot be empty'
            },
            password: {
                required: true,
                message: 'password cannot be empty'
            }
        },
        logout: {
            user_id: {
                required: true,
                message: 'user_id cannot be empty'
            }
        },
        play: {
            first_player: {
                required: true,
                message: 'first_player cannot be empty'
            }
        },
        secondaryImage: {
            first_player: {
                required: true,
                message: 'first_player cannot be empty'
            },
            image_id: {
                required: true,
                message: 'secondary image id can not be empty'
            }
        },
    }
};
