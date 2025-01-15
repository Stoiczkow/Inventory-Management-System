import { check } from 'express-validator';

const createValidation = [
  check('id').not().exists(),
  check('name')
    .exists()
    .notEmpty()
    .isString()
    .withMessage('Must be string')
    .isLength({ max: 50 })
    .withMessage('Max length is 50'),
  check('description')
    .exists()
    .notEmpty()
    .isString()
    .withMessage('Must be string')
    .isLength({ max: 50 })
    .withMessage('Max length is 50'),
  check('price')
    .exists()
    .notEmpty()
    .isFloat({ min: 0.0 })
    .withMessage('Must be float, min value 0.0'),
  check('stock')
    .exists()
    .notEmpty()
    .isInt({ min: 0 })
    .withMessage('Must be int, min value 0'),
];

const stockUpdateValidation = [
  check('id').not().exists(),
  check('stock')
    .notEmpty()
    .exists()
    .isInt({ min: 1 })
    .withMessage('Must be int, min value 1'),
  check('name').not().exists(),
  check('description').not().exists(),
  check('price').not().exists(),
];

export { createValidation, stockUpdateValidation };
