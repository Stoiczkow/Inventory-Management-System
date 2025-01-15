/**
 * Parses error to more simple object.
 *
 * @param {Error} error - Error instance.
 * @returns {Error | Object} Original error or object.
 */
const parseCustomError = (error) => {
  try {
    return { statusCode: error.statusCode, message: error.message };
  } catch (e) {
    return error;
  }
};

export { parseCustomError };
