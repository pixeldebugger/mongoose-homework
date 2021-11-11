const { Article, User} = require('../models');

module.exports = {

    isArticleByIdExist: async (req, res, next) => {
        try {
            const { articleId  } = req.params;

            const article = await Article.findById(articleId).lean();

            if (!article) {
                throw new Error(
                    'article is not found'
                );
            }

            req.article = article;

            next();
        } catch (err) {
            next(err);
        }
    },
    isArticleByUserExist: async (req, res, next) => {
        try {
            const { owner } = req.body;
            const user = await User.findById(owner);

            if(!user) {
                throw new Error(
                    'Owner is not found'
                );
            }
            req.user = user;

            next();
        } catch (err) {
            next(err);
        }
    },

    getArticleByDynamicQueryParam: async (req, res, next) => {
        try {

            let {owner, title, category, subtitle , description, createdAt, updatedAt} = req.query;

            let query = {};

            if (owner) query.owner = owner;
            if (title) query.title = title;
            if (category) query.category = category;
            if (subtitle) query.subtitle = subtitle;
            if (description) query.description = description;
            if (createdAt) query.createdAt = createdAt;
            if (updatedAt) query.updatedAt = updatedAt;

            let result = await Article.find(query).populate('owner');

            req.articles = result;


            next();
        } catch (e) {
            next(e);
        }
    },

};
