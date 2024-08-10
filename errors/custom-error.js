class CustomAPIError Extends Error{
	constructor(message, statusCode) {
		super(message)
		this.statusCode = statusCode
	}
}
const createCustomAPIError = CustomAPIError()

module.exports = {
	CustomAPIError,
	createCustomAPIError
}
