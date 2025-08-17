const express = require("express");
var cookieParser = require("cookie-parser");

const { connectDB } = require("./config/db");

const { userRouter } = require("./routes/userRoutes");
const { authRouter } = require("./routes/authRouter");

const app = express();

connectDB()
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log(`Server is running on port ${process.env.PORT}`);
		});
	})
	.catch(() => {
		console.log("Error while connecting to DB");
		process.exit(1);
	});

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter); //signup and login
app.use("/user", userRouter);
app.use("/connection", userRouter);
