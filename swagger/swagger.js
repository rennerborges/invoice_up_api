/* eslint-disable import/order */
const dotenv = require('dotenv');
const swaggerOptions = require('./swagger-autogen.options');
const swaggerAutogen = require('swagger-autogen')(swaggerOptions);

const modelObject = require('./jsons/model-object.json');
const schemaObject = require('./jsons/schema-object.json');

dotenv.config({ path: './variables.env' });

const outputFile = './swagger/swagger_output.json';
const endpointsFiles = ['./server.js'];

const doc = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'API InvoiceUp',
    description: 'Ambiente com todos os endpoints referentes a API InvoiceUp',
    contact: {
      name: 'Renner Borges',
      email: 'rennerferreira23@gmail',
      // url: 'https://www.even3.com.br/wtmi/',
    },
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT}`,
      description: 'Local',
    },
  ],
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json', 'multipart/form-data'],
  produces: ['application/json', 'multipart/form-data'],
  tags: [
    {
      name: 'Autenticação',
      description:
        'Responsável por todo gerenciamento da autenticação no software',
    },
    {
      name: 'Usuários',
      description: 'Responsável pelo gerenciamento dos usuários',
    },
    {
      name: 'Objetos',
      description: 'Responsável pelo gerenciamento dos objetos',
    },
  ],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'token',
      in: 'header',
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  definitions: {},
  components: {
    schemas: {
      SendEmailDefault: {
        email: 'rennerferreira23@gmail.com',
        name: 'Renner',
      },
      ConfirmPresence: {
        email: 'rennerferreira23@gmail.com',
      },
      PostUser: {
        name: 'Renner Borges',
        password: '12345678@Re',
        email: 'rennerferreira23@gmail.com',
        role: 'g',
        enabled: true,
      },
      EditUser: {
        name: 'Renner Ferreira',
      },
      Login: {
        email: 'renner@gmail.com',
        password: '12345678@Re',
      },
      PostObject: {
        name: 'Mesa',
        data: schemaObject,
        model: modelObject,
      },
      EditObject: {
        name: 'Mesa 2',
        data: schemaObject,
        model: modelObject,
      },
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc);
