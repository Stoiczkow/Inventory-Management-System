import express from 'express';

import { parseCustomError } from './src/common/errorParser.js';
import productRouter from './src/product/routes.js';
import orderRouter from './src/order/routes.js';
import { HTTP_ERRORS_CODES } from './src/common/consts.js';

const app = express();

app.use(express.json());

app.use('/products', productRouter);
app.use('/orders', orderRouter);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = HTTP_ERRORS_CODES.NOT_FOUND;
  next(error);
});

app.use(async (error, req, res, next) => {
  res.status(error.status || HTTP_ERRORS_CODES.SERVER_ERROR);

  res.json(parseCustomError(error));
});

export default app;
