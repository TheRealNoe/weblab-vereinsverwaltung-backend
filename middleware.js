const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res
			.json({
				success: false,
				message: "A token is required for authentication",
			})
			.status(403);
	}
	try {
		const decoded = jwt.verify(token, config.TOKEN_KEY);
		req.user = decoded;
	} catch (err) {
		return res
			.json({ success: false, message: "Invalid Token" })
			.status(401);
	}
	return next();
};

module.exports = { verifyToken: verifyToken };
