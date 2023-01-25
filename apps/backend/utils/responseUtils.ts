export const createResponse = (data: any) => {
  return {
    data,
  };
};

export const createError = (message: any) => {
  return {
    message,
  };
};
