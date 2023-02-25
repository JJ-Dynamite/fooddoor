const { mongoConfig } = require('../config')
const MongoDB = require('./mongodb.service')

const addOrder = async ({ foodId, username }) => {
	try {
		// console.log(foodId)
		const foodIds = foodId.replace(/"/g, '').split(',').map(Number);
		// console.log(foodIds)
		const result = foodIds.map(id => {
			return { foodId: id.toString(), username: username };
		});
		
		let insertOrder = await MongoDB.db
		.collection(mongoConfig.collections.ORDERS)
		// .insertOne({ foodId, username })
		.insertMany(result)
		// console.log(result)

		// console.log(insertOrder,{ foodId, username })
		if (insertOrder) {
			let orderResponse = await getOrders({ username })
		console.log(orderResponse)
			return {
				status: true,
				message: 'Order added Successfully',
				data: orderResponse?.data,
			}
		}
	} catch (error) {
		return {
			status: false,
			message: 'Item Added to Order Failed',
		}
	}
}

const removeOrder = async ({ foodId, username }) => {
	try {
		let removedOrder = await MongoDB.db
			.collection(mongoConfig.collections.ORDERS)
			.deleteOne({ foodId, username })
		if (removedOrder?.deletedCount > 0) {
			let orderResponse = await getOrders({ username })
			return {
				status: true,
				message: 'Order Removed Successfully',
				data: orderResponse?.data,
			}
		}
	} catch (error) {
		return {
			status: false,
			message: 'Order Removed Failed',
		}
	}
}

const getOrders = async ({ username }) => {
	try {
		console.log(username)
		let orders = await MongoDB.db
			.collection(mongoConfig.collections.ORDERS)
			.aggregate([
				{
				  '$match': {
					'username': username
				  }
				}, {
				  '$lookup': {
					'from': 'foods', 
					'localField': 'foodId', 
					'foreignField': 'id', 
					'as': 'foods_details'
				  }
				}, {
				  '$lookup': {
					'from': 'carts', 
					'localField': 'foodId', 
					'foreignField': 'foodId', 
					'as': 'cart_details'
				  }
				}, {
				  '$lookup': {
					'from': 'restaurant', 
					'localField': 'foods_details.restaurantId', 
					'foreignField': 'id', 
					'as': 'restaurant_details'
				  }
				}, {
				  '$match': {
					'foods_details': {
					  '$ne': []
					}
				  }
				}, {
				  '$unwind': '$foods_details'
				}, {
				  '$project': {
					'username': 1, 
					'Item': '$foods_details.name', 
					'foodId': '$foods_details.id', 
					'image': '$foods_details.image', 
					'totalAmount': {
					  '$multiply': [
						{
						  '$toDouble': '$foods_details.price'
						}, {
						  '$arrayElemAt': [
							'$cart_details.count', 0
						  ]
						}
					  ]
					}, 
					'restaurantLocation': '$restaurant_details.location'
				  }
				}
			  ]
			)
			.toArray()
		if (orders?.length > 0) {
			console.log(orders);
			return {
				status: true,
				message: 'Orders fetched Successfully',
				data: orders,
			}
		} else {
			return {
				status: false,
				message: 'Orders not found',
			}
		}
	} catch (error) {
		return {
			status: false,
			message: 'Orders fetching Failed',
		}
	}
}

module.exports = {
	addOrder,
	removeOrder,
	getOrders,
}
