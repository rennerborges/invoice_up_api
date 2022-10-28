/* eslint-disable max-len */
import mongoose from 'mongoose';
import UserModel from '../models/user';
import { removeValueUndefinedOrNull } from '../util/object';
import { hashPassword } from '../util/password';

export const getUser = async (req, res, next) => {
  /* #swagger.tags = ["Usuários"] */
  /* #swagger.description = "Rota responsável por trazer um usuário específico pelo e-mail do mesmo" */
  /* #swagger.parameters['email'] = {
      in: "path",
      description: "Email do usuário",
      required: true,
      type: "string",
  } */
  const { email } = req.params;

  try {
    const user = await UserModel.findOne({
      email,
    }).select(['-password']);

    if (!user || !user.enabled) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res) => {
  /* #swagger.tags = ["Usuários"] */
  /* #swagger.description = "Rota responsável por trazer todos usuários" */
  const users = await UserModel.find().select(['-password']);

  res.json({
    users,
  });
};

export const createUser = async (req, res, next) => {
  /* #swagger.tags = ["Usuários"] */
  /* #swagger.description = "Rota responsável por criar um usuário" */
  /* #swagger.requestBody = { 
    required: true, 
    content: { 
      "application/json": { 
        schema: { $ref: "#/components/schemas/PostUser" }, 
      } 
    } 
    } 
  */
  const { body } = req;

  try {
    const passwordHashed = await hashPassword(body.password);

    const userAlreadyExists = await UserModel.findOne({
      email: body.email,
    });

    if (userAlreadyExists) {
      throw new Error('Usuário já existente');
    }

    const user = new UserModel({
      name: body.name,
      password: passwordHashed,
      email: body.email,
      enabled: true,
      rule: 'user',
    });

    await user.save();

    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  /* #swagger.tags = ["Usuários"] */
  /* #swagger.description = "Rota responsável por atualizar um usuário utilizando seu ID" */
  /* #swagger.requestBody = { 
    required: true, 
    content: { 
      "application/json": { 
        schema: { $ref: "#/components/schemas/EditUser" }, 
      } 
    } 
    } 
  */
  const { body } = req;

  const passwordHashed = body.password
    ? await hashPassword(body.password)
    : null;

  try {
    const bodyUpdate = removeValueUndefinedOrNull({
      name: body.name,
      password: passwordHashed,
    });

    const user = await UserModel.findOneAndUpdate(
      { email: req.user.email },
      bodyUpdate,
    );

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.send();
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  /* #swagger.tags = ["Usuários"] */
  /* #swagger.description = "Rota responsável por desativar um usuário utilizando seu ID" */
  /* #swagger.parameters['id'] = {
      in: "path",
      description: "ID da empresa",
      required: true,
      type: "string",
  } */
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Informe um id válido');
    }

    const bodyUpdate = {
      enabled: false,
    };

    const user = await UserModel.findOneAndUpdate(
      { _id: id, companyId: req.user.companyId },
      bodyUpdate,
    );

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.send();
  } catch (error) {
    next(error);
  }
};

export default {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
