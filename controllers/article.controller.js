const { User, Article } = require('../models');


module.exports = {

    createArticle: async (req, res, next) => {
        try {

            const { owner } = req.body;
            if(!owner) {
                throw new Error(
                    'Owner is not found'
                );
            }
            let createdArticle = await Article.create({...req.body});

            await User.findOneAndUpdate(owner, {$inc : {numberOfArticles: 1}}, {new: true });
            res.json(createdArticle);
        } catch (e) {
            next(e);
        }
    },
    editArticle: async (req, res, next) => {
        try {

            const { article  } = req;

            let changedArticle = await Article.findByIdAndUpdate(article, {...req.body}, function (err, docs) {

                if (err){
                    console.log(err)
                }
                else{
                    console.log("Updated Article : ", docs);
                }});

            res.json(changedArticle);
        } catch (e) {
            next(e);
        }
    },

    getArticles: async (req, res, next) => {
        try {

            const { articles  } = req;

            res.json(articles);
        } catch (e) {
            next(e);
        }
    },

    deleteArticle: async (req, res, next) => {
        try {
            const { article, user:{_id}} = req;

            await Article.findByIdAndDelete(article);

            await User.findByIdAndUpdate(_id, {$inc: {numberOfArticles: -1}}, {new: true });

            res.status(201).json('Deleted successfully');
        } catch (e) {
            next(e);
        }
    },

};
