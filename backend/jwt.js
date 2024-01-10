
 jwt = require('jsonwebtoken');
 require('dotenv').config()

const secretKey = process.env.SECRET_KEY;

// to create a token
const createToken=(user)=>{
    return jwt.sign({
        Email:user.Email,
        Password:user.Password,
        id:user._id
      },secretKey)
}

// to verify the token as a middleware 
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    const token = authHeader.split(' ')[1]; // separate the token
  
    // Verify the token
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.user = decoded;
      next();
    });
  };

module.exports={
    createToken,
    verifyToken
}