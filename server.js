/* eslint-disable import/no-import-module-exports */
/* eslint-disable no-console */
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import axios from 'axios';
import ConnectionDB from './config/connection-database';
import swaggerFile from './swagger/swagger_output.json';
import app from './app';

dotenv.config({ path: './variables.env' });

const server = express();

// ===========================================
// ============= Banco de dados ==============
// ===========================================

ConnectionDB();

// ===========================================
// ============= Configurações ===============
// ===========================================

server.use(cors());
server.use(
  bodyParser.urlencoded({
    limit: '100000mb',
    extended: true,
  }),
);
server.use(bodyParser.json({ limit: '100000mb' }));
server.use(logger('dev'));
server.use('/images', express.static('public/images'));

server.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, {
    swaggerOptions: { persistAuthorization: true },
  }),
);

// ===========================================
// ================= Rotas ===================
// ===========================================

server.use('/', app);

setInterval(() => {
  axios
    .get('https://invoice-up.herokuapp.com')
    .then(() => {
      console.log('[Servidor] Está tudo ok!');
    })
    .catch(() => {
      console.log('[Error] Não conseguimos resposta do servidor!');
    });
}, 60000 * 5);

module.exports = server;
