import * as yup from 'yup';
import { isValidPassword } from '../util/password';

const ValidationUserEdit = (req, res, next) => {
  const schema = yup.object().shape({
    name: yup.string(),
    password: yup
      .string()
      .test(
        'is-password',
        'Informe uma senha com no mínimo de oito caracteres, pelo menos, uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
        (value) => !value || isValidPassword(value),
      ),
    email: yup.string().email(),
  });

  return schema
    .validate(req.body)
    .then(() => next())
    .catch((error) => next(error));
};

export default ValidationUserEdit;
