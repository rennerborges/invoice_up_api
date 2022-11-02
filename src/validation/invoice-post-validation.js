import * as yup from 'yup';

const ValidationInvoicePost = (req, res, next) => {
  const schema = yup.object().shape({
    title: yup.string().required('O título é necessário'),
    placeOfPurchase: yup.string().required('O local da compra é necessário'),
    dateOfPurchase: yup.date().required('A data da compra é necessária'),
    dateOfWarranty: yup.date(),
    price: yup.number().required('O preço é necessário'),
    image: yup.string().required('A imagem é necessária'),
  });

  return schema
    .validate(req.body)
    .then(() => next())
    .catch((error) => next(error));
};

export default ValidationInvoicePost;
