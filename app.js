import express from 'express';
import router from './src/routes';
import errorController from './src/controllers/error-controller';

const app = express();

app.use(router);

app.use(errorController.setError404);
app.use(errorController.errorSend);

export default app;
