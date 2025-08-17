const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { saltRounds } = require("../constants");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../constants");
const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, "Why no firstname?"],
		},
		lastName: {
			type: String,
			required: [true, "Why no lastname?"],
		},
		age: {
			type: Number,
			required: [true, "Why no age?"],
		},
		gender: {
			type: String,
			enum: {
				values: ["male", "female", "other"],
				message: "{VALUE} is not supported",
			},
		},
		email: {
			type: String,
			required: [true, "Why no email?"],
			unique: true,
		},
		password: {
			type: String,
		},
	},
	{
		timestamps: true, // ⬅ automatically adds createdAt & updatedAt
		toJSON: {
			transform: function (doc, ret) {
				delete ret.password; // remove password
				delete ret.createdAt;
				delete ret.updatedAt;
				delete ret.__v; // remove mongoose version key
				return ret;
			},
		},
	}
);
userSchema.methods.getPasswordHash = async function (plainText) {
	const hash = await bcrypt.hash(plainText, saltRounds);
	return hash;
};
userSchema.methods.getJwtToken = async function () {
	const token = await jwt.sign({ data: this._id }, jwtSecret, {
		expiresIn: 60 * 60,
	});
	return token;
};
const User = mongoose.model("User", userSchema);
module.exports = { User };
