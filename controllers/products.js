const { queryObjects } = require('v8')
const Product = require('../models/Product')

const getAllProductsStatic = async (req, res) => {
	//const search = 'aa'
	const products = await Product.find({ price: {$gt: 30} }).sort('name').select('name price').limit(4).skip(1)
	res.status(200).json({Amount: products.length, products: products})
}

const getAllProducts = async (req, res) => {
	const { featured, company, name, sort, fields, numericFilters } = req.query
	const queryObject = {} 
	if (featured) {
		queryObjects.featured = featured === 'true'? true : false
	}
	if (company) {
		queryObject.company = company
	}
	if (name) {
		queryObject.name = { $regex: name, $options: 'i'}
	}
	let result = Product.find(queryObject)
	if (sort) {
		const sortList = sort.split(',').join(' ')
		console.log(sort)
		result = result.sort(sortList)
		//products = result.sort()
	}
	else {
		result = result.sort('createdAt')
	}
	if (fields) {
		const fieldsList = fields.split(',').join(' ')
		result = result.select(fieldsList)
	}

	const page = Number(req.query.page) || 1
	const limit = Number(req.query.limit) || 10
	const skip = (page - 1) * limit
	result = result.skip(skip).limit(limit)

	if (numericFilters) {
		const operatorMap = {
			'>': '$gt',
			'>=': '$gte',
			'=':  '$eq',
			'<':  '$lt',
			'<=': '$lte'
		}
		const regEx = /\b(<|>|>=|=|<|<=)\b/g
		let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
		console.log(filters)
		const options = ['price', 'rating']
		filters = filters.split(',').forEach((item) => {
			const [field,operator,value] = item.split('-')
			if (options.includes(field)) {
				queryObject[field] = { [operator]: Number(value) }
			}
		})
		//console.log(queryObject)
	}
	const products = await result.find(queryObject)
	res.status(200).json({products, Amount: products.length})
}
module.exports ={getAllProductsStatic, getAllProducts}