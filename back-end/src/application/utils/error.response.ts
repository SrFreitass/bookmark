import { error, t, ValidationError } from 'elysia';
import { ErrorHandler } from './error.handle';

const errorResponse = (err: unknown) => {
  console.error(err);


  if (err instanceof ValidationError) {
    return {
      success: false,
      statusCode: 400,
      message: 'Validation error',
      fields: err.validator
    }
  }

  if (err instanceof ErrorHandler) {
    return {
      success: false,
      statusCode: err.code,
      message: err.message,
    };
  }

  return {
    success: false,
    statusCode: 500,
    message: 'Internal server error',
  };
};

export { errorResponse };
