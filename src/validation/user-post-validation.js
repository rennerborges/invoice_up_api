import * as yup from 'yup';
import { isValidPassword } from '../util/password';

const ValidationUserPost = (req, res, next) => {
  const schema = yup.object().shape({
    name: yup.string().required('O nome é necessário'),
    password: yup
      .string()
      .required('A senha é necessária')
      .test(
        'is-password',
        'Informe uma senha com no mínimo de oito caracteres, pelo menos, uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
        (value) => isValidPassword(value),
      ),
    email: yup.string().email().required('O e-mail é necessário'),
  });

  return schema
    .validate(req.body)
    .then(() => next())
    .catch((error) => next(error));
};

export default ValidationUserPost;
