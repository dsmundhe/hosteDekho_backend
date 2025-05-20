const jwt = require('jsonwebtoken');
const JWT_SECRETE = process.env.JWT_SECRETE;
const generateToken = async (email) => {
    return jwt.sign({ email }, JWT_SECRETE, { expiresIn: '30d' });
}

module.exports=generateToken;