import { v4 } from 'uuid';

import db from '../database/db.js';
import { clearPayload } from '../common/services.js';

/**
 * Returns all product records.
 *
 * @returns {Array[Object]} Array of product objects.
 */
const retriveAllProducts = () => db.data.products;

/**
 * Saves new product in databse.
 *
 * @param {Object} data - New product data.
 * @returns {Object} Saved product.
 */
const saveProduct = (data) => {
  data.id = v4();
  db.data.products[data.id] = data;
  db.write();
  return data;
};

/**
 * Checks if product with given name exists in database.
 *
 * @param {string} name - Product name.
 * @returns {boolean} true if product exists, false if not.
 */
const checkIfProductExistsByName = (name) => {
  const { products } = db.data;

  return !!Object.keys(products).filter(
    (productId) => products[productId].name === name
  ).length;
};

/**
 * Retrives product (with given id) from database.
 *
 * @param {string} id - Product id.
 * @returns {Object | undefined} Product data or undefined (if product does not exists).
 */
const getProductById = (id) => db.data.products[id];

/**
 * Updates product's data (with given id) in database.
 *
 * @param {string} id - Product id.
 * @param {Object} data - Data to update
 * @returns {Object} Product data.
 */
const updateProduct = (id, data) => {
  let updatedProduct = null;
  db.update((dbData) => {
    updatedProduct = {
      ...dbData.products[id],
      ...data,
    };
    dbData.products[id] = updatedProduct;
  });

  return updatedProduct;
};

/**
 * Updates products stock changes to original values.
 *
 * @param {Array[Object]} productsDataBeforeUpdate - Array of products data..
 */
const rollbackProductsStockChanges = (productsDataBeforeUpdate) => {
  for (const originalProduct of productsDataBeforeUpdate) {
    updateProduct(originalProduct.id, { stock: originalProduct.stock });
  }
};

export {
  retriveAllProducts,
  saveProduct,
  checkIfProductExistsByName,
  updateProduct,
  getProductById,
  rollbackProductsStockChanges,
};
