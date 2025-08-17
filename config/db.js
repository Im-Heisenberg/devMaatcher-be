const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("../models/user");

dotenv.config();
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DB_URI);
		console.log("MongoDB connected");
	} catch (err) {
		console.log(err);
	}
};

module.exports = { connectDB };
