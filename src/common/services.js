import { PAYLODS_KEYS } from './consts.js';

/**
 * Checks if demanded product is available.
 *
 * @param {int} productStock - Available number of products.
 * @param {int} quantity - Demanded number of products.
 * @returns {boolean} true or false
 */
const checkIfProductStockIsSufficient = (productStock, quantity) =>
  productStock >= quantity;

/**
 * Clear order's product from unnecessary keys.
 *
 * @param {Object} product  - product data
 * @returns {Object} Cleared product data
 */
const clearOrderProduct = (product) => {
  const clearedProduct = {};
  for (const key of PAYLODS_KEYS.orderProduct) {
    clearedProduct[key] = product[key];
  }
  return clearedProduct;
};

/**
 * Clear payload from unnecessary keys.
 *
 * @param {Object} payload  - payload
 * @param {string} model  - which model's payload should be cleared
 * @param {boolean} clearProductsList  - should clear order product list, default false
 * @returns {Object} Cleared payload
 */
const clearPayload = (payload, model, clearProductsList = false) => {
  const clearedPayload = {};

  for (const key of PAYLODS_KEYS[model]) {
    clearedPayload[key] = payload[key];
  }

  if (clearProductsList) {
    clearedPayload.products = payload.products.map((product) =>
      clearOrderProduct(product, 'order', true)
    );
  }

  return clearedPayload;
};

export { checkIfProductStockIsSufficient, clearPayload };
