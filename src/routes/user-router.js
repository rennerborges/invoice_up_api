import express from 'express';

import userController from '../controllers/user-controller';
import ValidationUserPost from '../validation/user-post-validation';
import ValidationUserEdit from '../validation/user-edit-validation';
import ValidatorLogin from '../validation/login-validarion';
import authController from '../controllers/auth-controller';
import { Auth } from '../middleware/auth-middleware';

const router = express.Router();

router.post('/login', ValidatorLogin, authController.login);

router.get('/users', Auth('u'), userController.getUsers);
router.get('/user/:email', Auth('u'), userController.getUser);
router.post('/user', Auth('u'), ValidationUserPost, userController.createUser);
router.patch('/user', Auth('u'), ValidationUserEdit, userController.updateUser);
router.delete('/user/:id', Auth('u'), userController.deleteUser);

export default router;
