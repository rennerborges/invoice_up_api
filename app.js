import express from 'express';
import bodyParser from 'body-parser';
import router from './src/routes';
import errorController from './src/controllers/error-controller';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

app.use(errorController.setError404);
app.use(errorController.errorSend);

export default app;
