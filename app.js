require('dotenv').config()
// async errors
require('express-async-errors')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const connectDB = require('./db/connect')

// middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

const productsRouter = require('./routes/products')

app.use(express.json())



// routes
app.get('/', (req, res) => {
	res.send('<h1>Store API</h1><a href="/api/v1/products">products routes</a>')
})

app.use('/api/v1/products', productsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
const start = async () => {
	try {
		await connectDB(process.env.MONGO_URL)
		app.listen(port, () => {
			console.log(`Server is listening on port ${port}`)
		})
	} catch(err) {
		console.log(err)
	}
}

start()