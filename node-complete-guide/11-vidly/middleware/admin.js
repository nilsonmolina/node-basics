
module.exports = function isAdmin(req, res, next) {
  // 401 Unauthorized - not validated
  // 403 Forbidden - validated, but not allowed
  if (!req.user.isAdmin) return res.status(403).send('Access denied.');

  return next();
};
