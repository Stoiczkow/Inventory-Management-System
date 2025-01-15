import { check } from 'express-validator';
import { createError } from 'http-json-errors';

import { HTTP_ERRORS_CODES } from '../common/consts.js';

const createOrder = [
  check('id').not().exists(),
  check('customerId').exists().notEmpty().isString(),
  check('products')
    .exists()
    .notEmpty()
    .isArray({ min: 1 })
    .custom((products) => {
      const productsIds = products.map((product) => product.id);
      const areDuplicates = productsIds.some(
        (item, idx) => productsIds.indexOf(item) !== idx
      );

      if (!areDuplicates) return true;

      throw createError(HTTP_ERRORS_CODES.BAD_REQUEST, 'Duplicated products');
    }),
  check('products.*.id')
    .exists()
    .notEmpty()
    .isString()
    .withMessage('Must be string'),
  check('products.*.quantity')
    .exists()
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage('Must be int, min value 1'),
];

export { createOrder };
