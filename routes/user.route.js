const router = require('express').Router();

const {userController} = require("../controllers");
const {userMiddleware} = require("../middlewares");


router.post('/', userController.createUser);

router.put('/:userId', userMiddleware.isUserByIdExist, userController.updateUser);

router.get('/:userId', userMiddleware.isUserByIdExist, userController.getUser);

router.delete('/:userId', userMiddleware.isUserByIdExist, userController.deleteUser);

router.get('/:userId/articles', userMiddleware.isUserByIdExist, userController.getUserArticles);


module.exports = router;
