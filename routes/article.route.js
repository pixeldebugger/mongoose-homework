const express = require('express');
const router = express.Router();

const {  articleMiddleware } = require('../middlewares');
const { articleController } = require("../controllers");


router.post('/', articleController.createArticle);

router.get('/', articleMiddleware.getArticleByDynamicQueryParam, articleController.getArticles)

router.put('/:articleId', articleMiddleware.isArticleByIdExist, articleMiddleware.isArticleByUserExist, articleController.editArticle)

router.delete('/:articleId', articleMiddleware.isArticleByIdExist, articleMiddleware.isArticleByUserExist, articleController.deleteArticle)



module.exports = router;
