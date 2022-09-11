const jwt = require('jsonwebtoken');
const { findOneUserById } = require('../repository/user');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWTOKEN);
    const userId = decodedToken.userId;
    req.auth = { userId };
    const user = await findOneUserById(userId)
    if (req.body.userId && req.body.userId !== userId || user === null) {
      throw 'Invalid user ID';
    } else {
      req.auth = {userId, isAdmin: user.admin === 1}
      next();
    }
  } catch {
    res.status(401).json({
      error: "Unauthorized"
    });
  }
};