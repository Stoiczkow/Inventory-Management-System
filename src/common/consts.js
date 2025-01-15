const HTTP_ERRORS_CODES = {
  BAD_REQUEST: 400,
  SERVER_ERROR: 500,
  NOT_FOUND: 404,
};

const PAYLODS_KEYS = {
  product: ['name', 'description', 'stock', 'price'],
  order: ['customerId', 'products'],
  orderProduct: ['id', 'quantity'],
};

export { HTTP_ERRORS_CODES, PAYLODS_KEYS };
