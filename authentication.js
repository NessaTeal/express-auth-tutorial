const jwt = require('jsonwebtoken');
const secret = 'secret'; // should be really secret

module.exports = (req, res, next) => {
  try {
    let token = req.header('Authorization').split(' ')[1];
    let decoded = jwt.verify(token, secret);
    req.userId = decoded.userId; // putting userId into request object
    next();
  } catch (err) {
    console.log(`Unauthenticated access to ${req.originalUrl}`);
    res.status(401).end();
  }
}
