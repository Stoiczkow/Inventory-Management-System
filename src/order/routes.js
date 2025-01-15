import express from 'express';

import { addOrder } from './controller.js';
import { createOrder } from './validation.js';
import validate from '../common/validator.js';

const orderRouter = express.Router();

/**
 * Saves new order in databse.
 *
 * Payload
 * {"customerId":"123", "products": [{"id": "93a8f7b1-f919-4490-ba94-378943aa7dec", "quantity": 20}]}
 */
orderRouter.post('/', validate(createOrder), (req, res, next) => {
  try {
    const response = addOrder(req.body);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

export default orderRouter;
