export const errorHandlerFactory = errName => err => {
  console.error(errName, err);
};
