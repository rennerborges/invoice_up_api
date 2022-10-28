import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config({ path: './variables.env' });

const tablePermissions = {
  a: 'admin',
  u: 'user',
};

export function Auth(rules) {
  const rulesSplits = rules.split();
  const permissions = rulesSplits.map((rule) => tablePermissions[rule]);
  return (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
      return res
        .status(401)
        .json({ auth: false, message: 'O token não foi informado.' });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          auth: false,
          message: 'Falha ao autenticar o token.',
        });
      }

      if (!permissions.includes(decoded.rule)) {
        return res.status(403).json({
          auth: false,
          message: 'Você não possui autorização para essa rota.',
        });
      }
      req.user = decoded;

      next();
    });
  };
}

export default {
  Auth,
};
