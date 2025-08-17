const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../constants");
const { User } = require("../models/user");
const authMiddleware = async (req, _, next) => {
	const decodedToken = await jwt.verify(req.cookies?.jwtToken, jwtSecret);
	if (!decodedToken) throw new Error("Invalid token");
	const user = await User.findById(decodedToken.data);
	if (!user) throw new Error("User not found");
	req.user = user;
	next();
};

module.exports = { authMiddleware };
