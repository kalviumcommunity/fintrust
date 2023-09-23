// jwt.js
const jwt = require('jsonwebtoken');

const secretKey = 'your_secret_key'; 

export const generateToken = (userId: number) => {
  const payload = { userId };
  const options = { expiresIn: '1h' }; 

  return jwt.sign(payload, secretKey, options);
}

export const verifyToken = (token: any) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null; 
  }
}


