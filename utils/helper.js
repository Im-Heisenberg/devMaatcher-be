const validator = require("validator");

/**
 * Validates new user signup data
 * @param {Object} userData - User signup data
 * @returns {Object} - Returns { isValid: boolean, errors: Object }
 */
const validateUserSignup = (userData) => {
	const errors = {};

	// Email validation
	if (!userData.email || !validator.isEmail(userData.email)) {
		errors.email = "Please provide a valid email address";
	}

	// Password validation
	// if (
	// 	!userData.password ||
	// 	!validator.isStrongPassword(userData.password, {
	// 		minLength: 8,
	// 		minLowercase: 1,
	// 		minUppercase: 1,
	// 		minNumbers: 1,
	// 		minSymbols: 1,
	// 	})
	// ) {
	// 	errors.password =
	// 		"Password must be at least 8 characters with 1 lowercase, 1 uppercase, 1 number and 1 symbol";
	// }

	// Name validation
	if (
		!userData.firstName ||
		!validator.isLength(userData.firstName, { min: 2, max: 30 })
	) {
		errors.name = "Firstname must be between 2-30 characters";
	}
	if (
		!userData.lastName ||
		!validator.isLength(userData.lastName, { min: 2, max: 30 })
	) {
		errors.name = "Lastname must be between 2-30 characters";
	}

	// Age validation
	if (
		!userData.age ||
		!validator.isInt(userData.age.toString(), { min: 13, max: 120 })
	) {
		errors.age = "Age must be a number between 13 and 120";
	}

	// Gender validation
	const allowedGenders = ["male", "female", "other"];
	if (
		!userData.gender ||
		!allowedGenders.includes(userData.gender.toLowerCase())
	) {
		errors.gender = "Gender must be one of: male, female, other";
	}

	console.log(errors);
	return {
		isValid: Object.keys(errors).length === 0,
		errors,
	};
};

module.exports = {
	validateUserSignup,
};
