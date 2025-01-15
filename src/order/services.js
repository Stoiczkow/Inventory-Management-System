import { v4 } from 'uuid';

import db from '../database/db.js';

/**
 * Saves new order in databse.
 *
 * @param {Object} data - New order data.
 * @returns {Object} Saved order.
 */
const saveOrder = (data) => {
  data.id = v4();
  db.data.orders[data.id] = data;
  db.write();
  return data;
};

/**
 * Deletes order from database.
 *
 * @param {string} id - Order id.
 */
const deleteOrderById = (id) => {
  delete db.data.orders[id];
  db.write();
};

export { saveOrder, deleteOrderById };
