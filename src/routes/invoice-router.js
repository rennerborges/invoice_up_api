import express from 'express';

import invoiceController from '../controllers/invoice-controller';

import { Auth } from '../middleware/auth-middleware';
import ValidationInvoicePost from '../validation/invoice-post-validation';

const router = express.Router();

router.get('/', Auth('a'), invoiceController.getInvoices);
router.get('/my', Auth('u'), invoiceController.getInvoicesByUser);
router.get('/:id', Auth('u'), invoiceController.getInvoice);
router.post(
  '/',
  Auth('u'),
  ValidationInvoicePost,
  invoiceController.createInvoice,
);
router.patch('/:id', Auth('u'), invoiceController.updateInvoice);
router.delete('/:id', Auth('u'), invoiceController.deleteInvoice);

export default router;
