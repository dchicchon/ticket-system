export const auditMiddleware = (req, res, next) => {
  console.log('audit middleware');
  next();
};
