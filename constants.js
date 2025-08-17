module.exports = {
	saltRounds: 10,
	jwtSecret: "secret",
	jetTokenLabel: "jwtToken",
	cookieOptions: { httpOnly: true },
	status: {
		ignore: "ignore",
		pass: "pass",
		accepted: "accepted",
		rejected: "rejected",
	},
};
