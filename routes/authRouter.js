const bcrypt = require("bcrypt");
const express = require("express");
const { validateUserSignup } = require("../utils/helper");
const { User } = require("../models/user");
const { cookieOptions, jetTokenLabel } = require("../constants");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
	try {
		const { isValid, errors } = validateUserSignup(req.body);
		if (!isValid) throw new Error(JSON.stringify(errors));
		const hash = await User.prototype.getPasswordHash(req.body.password);
		const user = await User.create({ ...req.body, password: hash });
		res.status(201).json({ user });
	} catch (error) {
		res.status(400).json({ error });
	}
});
authRouter.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email });
		if (!user) throw new Error("User not found");
		const isPasswordValid = bcrypt.compare(password, user.password);
		if (!isPasswordValid) throw new Error("Invalid password");
		const token = await user.getJwtToken();
		res.cookie(jetTokenLabel, token, cookieOptions);
		res.status(200).json({ user });
	} catch (error) {
		res.status(400).json({ error });
	}
});

authRouter.post("/logout", (req, res) => {
	res.clearCookie(jetTokenLabel);
	res.status(200).json({ message: "User signed out" });
});

module.exports = {
	authRouter,
};
