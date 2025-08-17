const express = require("express");
const { authMiddleware } = require("../utils/middleware");
const { status } = require("../constants");
const { Connection } = require("../models/connection");
const { User } = require("../models/user");
const { default: mongoose } = require("mongoose");

const userRouter = express.Router();

userRouter.get("/profile", authMiddleware, async (req, res) => {
	try {
		const user = req.user;
		res.status(200).json({ user });
	} catch (error) {
		res.status(400).json({ error });
	}
});

userRouter.post("/new", authMiddleware, async (req, res) => {
	const loggedInUser = req.user;
	const { to: toId, state } = req.query;

	const isStatusValid = [status.ignore, status.pass].includes(state);
	if (!isStatusValid) throw new Error("Invalid status");

	const user = await User.findById(toId);
	if (!user) throw new Error("User not found");

	const existingConnection = await Connection.findOne({
		$or: [
			{ fromId: loggedInUser._id, toId },
			{ fromId: toId, toId: loggedInUser._id },
		],
	});
	if (existingConnection) throw new Error("Connection already exists");

	const newConnection = {
		fromId: loggedInUser._id,
		toId,
		status: state,
	};
	let connection = await Connection.create(newConnection);

	connection = await Connection.findById(connection._id).populate({
		path:
			String(connection.fromId) === String(loggedInUser._id)
				? "toId"
				: "fromId",
		select: "firstName lastName age gender",
	});

	res.status(201).json({ connection });
});

userRouter
	.route("/review")
	.get(authMiddleware, async (req, res) => {
		try {
			const user = req.user;
			const requestRecived = await Connection.find({
				status: status.pass,
				toId: user._id,
			});
			res.status(200).json({ requestRecived });
		} catch (error) {
			res.status(400).json({ error });
		}
	})
	.post(authMiddleware, async (req, res) => {
		try {
			const loggedInUser = req.user;
			const { fromId, state } = req.query;
			const validatedState = [status.accepted, status.rejected].includes(
				state
			);
			if (!validatedState) throw new Error("Invalid state");
			const validatedFromId = await User.findById(fromId);
			if (!validatedFromId) throw new Error("User not found");
			if (fromId === loggedInUser._id) throw new Error("Invalid operation");
			const connection = await Connection.findOne({
				fromId,
				toId: loggedInUser._id,
				status: status.pass,
			});
			if (!connection) throw new Error("Connection not found");
			connection.status = state;
			await connection.save();
			res.status(200).json({ connection });
		} catch (error) {
			res.status(400).json({ error });
		}
	});

userRouter.get("/feed", authMiddleware, async (req, res) => {
	try {
		// ensure ObjectId (important if req.user._id came as a string)
		const userId = new mongoose.Types.ObjectId(req.user._id);

		const feed = await User.aggregate([
			// 1) exclude the logged-in user
			{ $match: { _id: { $ne: userId } } },

			// 2) for each candidate user, look for ANY connection with the logged-in user
			{
				$lookup: {
					from: "connections", // collection name derived from the Connection model
					let: { candidateId: "$_id" }, // <- temp var for this user's _id
					pipeline: [
						{
							$match: {
								$expr: {
									$or: [
										// candidate ↔ logged-in (either direction)
										{
											$and: [
												{ $eq: ["$fromId", "$$candidateId"] },
												{ $eq: ["$toId", userId] },
											],
										},
										{
											$and: [
												{ $eq: ["$toId", "$$candidateId"] },
												{ $eq: ["$fromId", userId] },
											],
										},
									],
								},
							},
						},
						{ $limit: 1 }, // we only need to know if at least one exists
					],
					as: "edge",
				},
			},

			// 3) keep only users with NO existing connection to the logged-in user
			{ $match: { $expr: { $eq: [{ $size: "$edge" }, 0] } } },

			// 4) shape the output
			{
				$project: {
					firstName: 1,
					lastName: 1,
					age: 1,
					gender: 1,
					email: 1,
				},
			},

			// Optional: pagination/sorting
			// { $sort: { createdAt: -1 } },
			// { $skip: page * limit },
			// { $limit: limit }
		]);

		res.status(200).json({ feed });
	} catch (err) {
		console.error(err);
		res.status(400).json({ error: "Failed to load feed" });
	}
});

module.exports = { userRouter };
