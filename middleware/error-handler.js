CustomAPIError = require('../errors/custom-error')

const errorHandlerMiddleware = (err, req, res, next) => {
	if (err instanceof CustomAPIError) {
		return res.status(err.statusCode).json({message: err.message})
	} else {
		return res.status(500).json({message: err.message})
	}
}

module.exports = errorHandlerMiddleware
