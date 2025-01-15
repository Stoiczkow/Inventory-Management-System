import { createError } from 'http-json-errors';

import { HTTP_ERRORS_CODES } from '../common/consts.js';
import {
  retriveAllProducts,
  saveProduct,
  checkIfProductExistsByName,
  updateProduct,
  getProductById,
} from './services.js';
import {
  checkIfProductStockIsSufficient,
  clearPayload,
} from '../common/services.js';

/**
 * Returns all product records.
 *
 * @returns {Array[Object]} Array of product objects.
 */
const getAllProducts = () => retriveAllProducts();

/**
 * Checks if product with given name exists and saves it in databse.
 *
 * @param {Object} data - New product data.
 * @returns {Object} Saved product.
 */
const createProduct = (data) => {
  if (checkIfProductExistsByName(data.name)) {
    throw createError(HTTP_ERRORS_CODES.BAD_REQUEST, 'Product already exists');
  }
  return saveProduct(clearPayload(data, 'product'));
};

/**
 * Checks if product exists and updates it's stock value in database.
 *
 * @param {string} id - Product id.
 * @param {Object} data - Data to update
 * @returns {Object} Product data.
 */
const increaseProductStock = (id, data) => {
  const product = getProductById(id);
  if (!product) {
    throw createError(HTTP_ERRORS_CODES.BAD_REQUEST, 'Product not found');
  }

  return updateProduct(id, { stock: data.stock + product.stock });
};

/**
 * Checks if product exists, checks if product's stock is sufficient
 * and updates it's stock value in database.
 *
 * @param {string} id - Product id.
 * @param {Object} data - Data to update
 * @returns {Object} Product data.
 */
const decreaseProductStock = (id, data) => {
  const product = getProductById(id);
  if (!product) {
    throw createError(HTTP_ERRORS_CODES.BAD_REQUEST, 'Product not found');
  }

  if (checkIfProductStockIsSufficient(product.stock, data.stock))
    return updateProduct(id, { stock: product.stock - data.stock });

  throw createError(HTTP_ERRORS_CODES.BAD_REQUEST, 'Stock cannot be below 0');
};

export {
  getAllProducts,
  createProduct,
  increaseProductStock,
  decreaseProductStock,
};
