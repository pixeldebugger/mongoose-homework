const { User } = require('../models');

module.exports = {

    isUserByIdExist: async (req, res, next) => {
        try {
            const { userId  } = req.params;

            const user = await User.findById(userId).populate('articles');

            if (!user) {
                throw new Error(
                    'User is not found'
                );
            }

            req.user = user;

            next();
        } catch (err) {
            next(err);
        }
    },

};
