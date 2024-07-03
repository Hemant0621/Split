const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");
const { User } = require("./db");

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.userId;

        const user = await User.findOne({
            _id: decoded.userId
        })
        if (user) {
            next();
        }
        else {
            return res.send({
                message: "user does't exist"
            })
        }

    } catch (err) {
        return res.status(403).json({});
    }
};

module.exports = {
    authMiddleware
}