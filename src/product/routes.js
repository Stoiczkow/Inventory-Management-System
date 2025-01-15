import express from 'express';

import {
  getAllProducts,
  createProduct,
  increaseProductStock,
  decreaseProductStock,
} from './controller.js';
import { createValidation, stockUpdateValidation } from './validation.js';
import validate from '../common/validator.js';

const productRouter = express.Router();

/**
 * Returns all product records.
 *
 */
productRouter.get('/', (req, res, next) => {
  try {
    const response = getAllProducts();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

/**
 * Saves new product in databse.
 * 
 * Payload
 * {
    "name": "productName",
    "description": "productDescription",
    "price": 1.0,
    "stock": 10
   }
 */
productRouter.post('/', validate(createValidation), (req, res, next) => {
  try {
    const response = createProduct(req.body);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

/**
 * Increases product stock.
 *
 * Payload
 * {"stock": 20}
 */
productRouter.post(
  '/:id/restock',
  validate(stockUpdateValidation),
  (req, res, next) => {
    try {
      const response = increaseProductStock(req.params.id, req.body);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Decreases product stock.
 *
 * Payload
 * {"stock": 20}
 */
productRouter.post(
  '/:id/sell',
  validate(stockUpdateValidation),
  (req, res, next) => {
    try {
      const response = decreaseProductStock(req.params.id, req.body);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

export default productRouter;
