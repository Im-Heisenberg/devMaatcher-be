const mongoose = require("mongoose");
const connectionSchema = new mongoose.Schema(
	{
		fromId: {
			type: mongoose.Schema.Types.ObjectId,
			require: true,
			index: true,
			ref: "User",
		},
		toId: {
			type: mongoose.Schema.Types.ObjectId,
			require: true,
			index: true,
			ref: "User",
		},
		status: {
			type: String,
			enum: {
				values: ["ignore", "pass", "accepted", "rejected"],
				message: "{VALUE} is not a valid status",
			},
		},
	},
	{
		timestamps: true,
		toJSON: {
			transform: function (doc, ret) {
				delete ret.createdAt;
				delete ret.updatedAt;
				delete ret.__v; // remove mongoose version key
				return ret;
			},
		},
	}
);

const Connection = mongoose.model("Connection", connectionSchema);

module.exports = { Connection };
