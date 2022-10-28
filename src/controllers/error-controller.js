// eslint-disable-next-line no-unused-vars
export const errorSend = (err, req, res, next) => {
  const response = { message: err.message };

  if (err.path) {
    response.path = err.path;
  }

  res.status(err.code || 400).json({ response });
};

export const setError404 = (req, res, next) => {
  const fullURL = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

  const error = new Error('Not found');

  error.code = 404;
  error.path = fullURL;

  next(error);
};

export default {
  errorSend,
  setError404,
};
