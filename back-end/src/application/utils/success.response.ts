const successResponse = (code: number, data: unknown, message: string) => {
  return {
    success: true,
    statusCode: code,
    message,
    data,
  };
};

export { successResponse };
