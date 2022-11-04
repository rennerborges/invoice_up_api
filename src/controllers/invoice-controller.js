/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import moment from 'moment';
import mongoose from 'mongoose';
import InvoiceModel from '../models/invoice';
import { removeValueUndefinedOrNull } from '../util/object';

export const getInvoice = async (req, res, next) => {
  /* #swagger.tags = ["Notas fiscais"] */
  /* #swagger.description = "Rota responsável por trazer uma nota fiscal específica pelo e-mail do mesmo" */
  /* #swagger.parameters['id'] = {
      in: "path",
      description: "Identificação da nota fiscal",
      required: true,
      type: "string",
  } */
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Informe um id válido');
    }

    const invoice = await InvoiceModel.findById(id);

    if (!invoice) {
      return res.status(404).json({ message: 'Nota fiscal não encontrada' });
    }

    res.json({ invoice });
  } catch (error) {
    next(error);
  }
};

export const getInvoices = async (req, res) => {
  /* #swagger.tags = ["Notas fiscais"] */
  /* #swagger.description = "Rota responsável por trazer todos as notas fiscais" */
  const invoices = await InvoiceModel.find();

  res.json({
    invoices,
  });
};

export const getInvoicesByUser = async (req, res, next) => {
  /* #swagger.tags = ["Notas fiscais"] */
  /* #swagger.description = "Rota responsável por trazer todos as notas fiscais de um determinado usuário" */
  try {
    const emailUser = req.user.email;

    let invoices = await InvoiceModel.find({
      emailUser,
    }).sort({ updatedAt: -1, createdAt: -1 });

    invoices = invoices.map((invoice) => ({
      ...invoice._doc,
      isWarranty: moment().isBetween(
        invoice.dateOfPurchase,
        invoice.dateOfWarranty,
        undefined,
        '[]',
      ),
    }));
    res.json({
      invoices,
    });
  } catch (error) {
    next(error);
  }
};

export const createInvoice = async (req, res, next) => {
  /* #swagger.tags = ["Notas fiscais"] */
  /* #swagger.description = "Rota responsável por criar a nota fiscal" */
  /* #swagger.requestBody = { 
    required: true, 
    content: { 
      "application/json": { 
        schema: { $ref: "#/components/schemas/PostInvoice" }, 
      } 
    } 
    } 
  */
  const { body } = req;

  try {
    const bodyInvoice = {
      title: body.title,
      placeOfPurchase: body.placeOfPurchase,
      dateOfPurchase: body.dateOfPurchase,
      dateOfWarranty: body.dateOfWarranty || null,
      emailUser: body.emailUser,
      price: body.price,
      image: body.image,
      enabled: true,
      createdAt: new Date(),
      updatedAt: null,
    };

    const invoice = new InvoiceModel(bodyInvoice);

    await invoice.save();

    res.status(201).json({ invoice });
  } catch (error) {
    next(error);
  }
};

export const updateInvoice = async (req, res, next) => {
  /* #swagger.tags = ["Notas fiscais"] */
  /* #swagger.description = "Rota responsável por atualizar uma nota fiscal utilizando seu ID" */
  /* #swagger.requestBody = { 
    required: true, 
    content: { 
      "application/json": { 
        schema: { $ref: "#/components/schemas/EditInvoice" }, 
      } 
    } 
    } 
  */
  /* #swagger.parameters['id'] = {
      in: "path",
      description: "Identificação da nota fiscal",
      required: true,
      type: "string",
  } */
  const { body } = req;
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Informe um id válido');
    }

    const bodyUpdate = removeValueUndefinedOrNull({
      title: body.title,
      placeOfPurchase: body.placeOfPurchase,
      dateOfPurchase: body.dateOfPurchase,
      dateOfWarranty: body.dateOfWarranty || null,
      price: body.price,
      image: body.image,
      updatedAt: new Date(),
    });

    const invoice = await InvoiceModel.findOneAndUpdate(
      { _id: id },
      bodyUpdate,
    );

    if (!invoice) {
      return res.status(404).json({ message: 'Nota fiscal não encontrada' });
    }

    res.send();
  } catch (error) {
    next(error);
  }
};

export const deleteInvoice = async (req, res, next) => {
  /* #swagger.tags = ["Notas fiscais"] */
  /* #swagger.description = "Rota responsável por desativar uma nota fiscal utilizando seu ID" */
  /* #swagger.parameters['id'] = {
      in: "path",
      description: "Identificação da nota fiscal",
      required: true,
      type: "string",
  } */
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Informe um id válido');
    }

    const bodyUpdate = {
      enabled: false,
    };

    const invoice = await InvoiceModel.findOneAndUpdate(
      { _id: id },
      bodyUpdate,
    );

    if (!invoice) {
      return res.status(404).json({ message: 'Nota fiscal não encontrada' });
    }

    res.send();
  } catch (error) {
    next(error);
  }
};

export default {
  getInvoice,
  getInvoices,
  getInvoicesByUser,
  createInvoice,
  updateInvoice,
  deleteInvoice,
};
