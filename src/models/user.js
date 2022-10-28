const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'] },
  password: String,
  email: { type: String, required: [true, 'E-mail is required'], unique: true },
  rule: { type: String, enum: ['admin', 'user'], default: 'user' },
  enabled: Boolean,
});

const modelName = 'users';

if (mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[modelName]; // Conexão
} else {
  module.exports = mongoose.model(modelName, modelSchema); // Criar nova conexão
}
