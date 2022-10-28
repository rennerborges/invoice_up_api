import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import UserModel from '../models/user';

dotenv.config({ path: './variables.env' });

export const login = async (req, res) => {
  /* #swagger.description = "Rota responsável por autenticar um usuário" */
  /* #swagger.security = [] */
  /* #swagger.tags = ["Autenticação"] */
  /* #swagger.requestBody = { 
    required: true, 
    content: { 
      "application/json": { 
        schema: { $ref: "#/components/schemas/Login" }, 
      } 
    } 
    } 
  */

  const {
    body: { email, password },
  } = req;

  const userDatabase = await UserModel.findOne({
    email,
    enabled: true,
  });

  if (!userDatabase || !bcrypt.compareSync(password, userDatabase.password)) {
    return res
      .status(401)
      .json({ auth: false, message: 'Usuário e/ou senha inválidos' });
  }

  const bodyToken = {
    name: userDatabase.name,
    email: userDatabase.email,
    rule: userDatabase.rule,
  };

  const token = jwt.sign(bodyToken, process.env.SECRET, {
    expiresIn: 3 * 60 * 60, // expires in 3h
  });

  res.status(200).json({
    auth: true,
    token,
  });
};

export default {
  login,
};
