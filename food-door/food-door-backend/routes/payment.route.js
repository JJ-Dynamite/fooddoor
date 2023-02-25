var express = require('express')
const { getOnePaymentById } = require('../services/payment.service')
var router = express.Router()
const Razorpay = require('razorpay')

// this should go in env

router.get('/:username', async (req, res) => {
// 	const instance = new Razorpay({
// 		key_id: 'rzp_test_74jfpKWK3hJGhA',
// 		key_secret: 'ehZxZHE1LpB1mpn2EzFS1W3s',
// 	})

// 	const orderAmount = 5000
// 	const orderCurrency = 'INR'
// 	// Create the Razorpay order
// 	const order = await razorpay.orders.create({
// 		amount: orderAmount,
// 		currency: orderCurrency,
// 	})
// const orderId = order.id;


	let userName = req?.params?.username
	let response = await getOnePaymentById(userName, 'TempOrderId')
	res.json(response)
})

module.exports = router
