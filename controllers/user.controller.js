const { User, Article } = require('../models');


module.exports = {

  createUser: async (req, res, next) => {
    try {

      let createdUser = await User.create({...req.body});

      res.json(createdUser);
    } catch (e) {
      next(e);
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const { user } = req;

      const updatedUser = await User.findByIdAndUpdate(user, {...req.body}, function (err, docs) {
        if (err){
          console.log(err)
        }
        else{
          console.log("Updated User : ", docs);
        }});


      res.status(200).json(updatedUser);
    } catch (e) {
      next(e);
    }
  },
  getUser: (req, res, next) => {
    try {
      const user = req.user;

      res.json(user);
    } catch (e) {
      next(e);
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const { user } = req;

      await User.findByIdAndDelete(user);

      await Article.deleteMany({owner: user});

      res.status(201).json('Deleted successfully');
    } catch (e) {
      next(e);
    }
  },

  getUserArticles: async (req, res, next) => {
    try {
      const { user } = req;

      const userArticles = await Article.find({owner: user});

      res.status(200).json(userArticles);
    } catch (e) {
      next(e);
    }
  },
};
