/* eslint-disable import/no-import-module-exports */
/* eslint-disable no-console */
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import logger from 'morgan';
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
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
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

module.exports = server;
