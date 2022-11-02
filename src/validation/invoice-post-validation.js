import moment from 'moment';
import * as yup from 'yup';

const ValidationInvoicePost = (req, res, next) => {
  const schema = yup.object().shape({
    title: yup.string().required('O título é necessário'),
    emailUser: yup
      .string()
      .email()
      .required('O e-mail do usuário é necessário'),
    placeOfPurchase: yup.string().required('O local da compra é necessário'),
    dateOfPurchase: yup.date().required('A data da compra é necessária'),
    dateOfWarranty: yup
      .string()
      .test(
        'is-valid-dateOfWarranty',
        'Informe uma data de garantia válida',
        (value) => !value || moment(value).isValid(),
      ),
    price: yup.number().required('O preço é necessário'),
    image: yup.string().required('A imagem é necessária'),
  });

  return schema
    .validate(req.body)
    .then(() => next())
    .catch((error) => next(error));
};

export default ValidationInvoicePost;
