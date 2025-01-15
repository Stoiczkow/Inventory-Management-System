import { createError } from 'http-json-errors';
import { HTTP_ERRORS_CODES } from '../common/consts.js';

import { saveOrder, deleteOrderById } from './services.js';
import {
  getProductById,
  updateProduct,
  rollbackProductsStockChanges,
} from '../product/services.js';
import {
  checkIfProductStockIsSufficient,
  clearPayload,
} from '../common/services.js';

/**
 * Checks if products exists in database, checks if products stocks
 * are sufficient and saves order in database.
 *
 * If error occurs, rolls back changes.
 *
 * @param {Object} data - New order data.
 * @returns {Object} Saved order.
 */
const addOrder = (order) => {
  let savedOrder = null;
  let error = null;
  const productsDataBeforeUpdate = [];

  for (const orderProduct of order.products) {
    const product = getProductById(orderProduct.id);

    if (!product) {
      throw createError(
        HTTP_ERRORS_CODES.BAD_REQUEST,
        `Product with ID - ${orderProduct.id} not found`
      );
    }

    if (
      !checkIfProductStockIsSufficient(product.stock, orderProduct.quantity)
    ) {
      throw createError(
        HTTP_ERRORS_CODES.BAD_REQUEST,
        `Insufficient stock for product ${orderProduct.id}`
      );
    }
    productsDataBeforeUpdate.push({ id: product.id, stock: product.stock });

    try {
      updateProduct(product.id, {
        stock: product.stock - orderProduct.quantity,
      });
    } catch (e) {
      rollbackProductsStockChanges(productsDataBeforeUpdate);
      error = e;
    }
  }

  try {
    if (!error) savedOrder = saveOrder(clearPayload(order, 'order', true));
  } catch (e) {
    if (savedOrder) deleteOrderById(savedOrder.id);
    rollbackProductsStockChanges(productsDataBeforeUpdate);
    error = e;
  }

  if (savedOrder) return savedOrder;

  throw createError(
    HTTP_ERRORS_CODES.SERVER_ERROR,
    error ? error.message : 'Internal server error'
  );
};

export { addOrder };
