import { validationResult } from 'express-validator';

import { HTTP_ERRORS_CODES } from './consts.js';

const parseValidationErrors = (errors) => {
  const parsed = {};
  for (const e of errors) {
    parsed[e.param] = {
      param: e.path,
      message: e.msg,
    };
  }

  return Object.values(parsed);
};

const validate = (validations) => async (req, res, next) => {
  for (const validation of validations) {
    await validation.run(req);
  }
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  res
    .status(HTTP_ERRORS_CODES.BAD_REQUEST)
    .json({ errors: parseValidationErrors(errors.array()) });
};

export default validate;
