const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'] },
  placeOfPurchase: {
    type: String,
    required: [true, 'Place of purchase is required'],
  },
  dateOfPurchase: {
    type: Date,
    required: [true, 'Date of purchase is required'],
  },
  dateOfWarranty: {
    type: Date,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  image: {
    type: String,
    required: [true, 'Image is required'],
  },
  emailUser: {
    type: String,
    required: [true, 'Email user is required'],
  },
  createdAt: {
    type: Date,
    required: [true, 'CreatedAt is required'],
  },
  updatedAt: {
    type: Date,
  },
  enabled: Boolean,
});

const modelName = 'invoice';

if (mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[modelName]; // Conexão
} else {
  module.exports = mongoose.model(modelName, modelSchema); // Criar nova conexão
}
