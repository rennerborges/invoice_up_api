/* eslint-disable no-console */
const mongoose = require('mongoose');

const verde = '\u001b[32m';
const reset = '\u001b[0m';
const vermelho = '\u001b[31m';

module.exports = () => {
  const url = process.env.DB || 'mongodb://localhost:27017/invoice_up';
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.connect(url, options);

  mongoose.connection.once('open', () => {
    console.log(`${verde}[Mongoose] Conectado em ${url}${reset}`);
  });

  mongoose.connection.on('error', (err) => {
    console.log(`${vermelho}[Mongoose] Erro na conexão: ${err}${reset}`);
  });
};
