var express = require('express')
const {
	addOrder,
	removeOrder,
	getOrders,
} = require('../services/order.service')
var router = express.Router()

router.get('/', async (req, res) => {
	let username = req?.username
	let response = await getOrders({ username })
	res.json(response)
})

router.post('/:foodId', async (req, res) => {
	let { foodId } = req?.params
	let username = req?.username
	let response = await addOrder({ foodId, username })
	res.json(response)
})

router.delete('/:foodId', async (req, res) => {
	let { foodId } = req?.params
	let username = req?.username
	let response = await removeOrder({ foodId, username })
	res.json(response)
})

module.exports = router
