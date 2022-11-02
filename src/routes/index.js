import express from 'express';

import userRouters from './user-router';
import invoiceRouters from './invoice-router';

const app = express();

app.get('/', (req, res) => {
  /* #swagger.description = "Rota de teste da API" */
  /* #swagger.security = [] */
  /* #swagger.tags = ["Home"] */
  res.json({ message: 'Hello World' });
});

app.use(userRouters);
app.use('/invoice', invoiceRouters);

export default app;
