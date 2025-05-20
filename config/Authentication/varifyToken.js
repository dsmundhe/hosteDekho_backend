const jwt = require('jsonwebtoken');
const JWT_SECRETE = process.env.JWT_SECRETE;

const verifyToken = async (req, res, next) => {

    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer")) {
        res.json({ msg: "provide token!" });
        return;
    }

    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        res.json({ msg: "provide token!" })
        return;
    }
    try {
        
        const isMatch = await jwt.verify(token, JWT_SECRETE);

        if (!isMatch) {
            res.json({ msg: "Token invalid!" })
            return;
        }
        next();
    } catch (error) {
        res.json({ msg: "Not authorized!" });
    }
}

module.exports = { verifyToken };