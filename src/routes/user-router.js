import express from 'express';

import userController from '../controllers/user-controller';
import ValidationUserPost from '../validation/user-post-validation';
import ValidationUserEdit from '../validation/user-edit-validation';
import ValidatorLogin from '../validation/login-validarion';
import authController from '../controllers/auth-controller';
import { Auth } from '../middleware/auth-middleware';

const router = express.Router();

router.post('/login', ValidatorLogin, authController.login);

router.get('/users', Auth('a'), userController.getUsers);
router.get('/user/:email', Auth('u'), userController.getUser);
router.post('/user', ValidationUserPost, userController.createUser);
router.patch('/user', Auth('u'), ValidationUserEdit, userController.updateUser);
router.delete('/user/:id', Auth('a'), userController.deleteUser);

export default router;
