export const authMiddleware = (req, res, next) => {
  console.log('Auth middleware');
  console.log({
    session: req.session,
    id: req.sessionID,
  });
  if (req.session.user) {
    console.log('User is logged in');
    next();
  } else {
    console.log('user is not logged in');
    // if not logged in we should throw error
    next();
  }
};
