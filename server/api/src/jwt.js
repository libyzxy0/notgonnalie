const jwt = require('jsonwebtoken');

const secretKey = 'MYSECRET_2992IWBXBSBSBAJAJ'; // Replace with your secret key

function generateToken(payload, expiresIn = '7d') {
  return jwt.sign(payload, secretKey, { expiresIn });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null; // Invalid token
  }
}

module.exports = {
  generateToken,
  verifyToken,
};