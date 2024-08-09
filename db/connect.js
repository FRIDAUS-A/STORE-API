const mongoose = require('mongoose')

const connectDB = (url) => {
	return mongoose.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology:true,
		useCreateIndex: true,
    	useFindAndModify: false
	}).then(() => console.log('CONNECTED TO DB...')).catch((err) => console.log(err))
}

module.exports = connectDB
