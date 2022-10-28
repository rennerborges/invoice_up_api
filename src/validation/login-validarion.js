import * as yup from 'yup';

const ValidatorLogin = (req, res, next) => {
  const schema = yup.object().shape({
    email: yup.string().email().required('É necessário informar o e-mail'),
    password: yup.string().required('É necessário informar a senha'),
  });

  return schema
    .validate(req.body)
    .then(() => next())
    .catch((error) => next(error));
};

export default ValidatorLogin;
