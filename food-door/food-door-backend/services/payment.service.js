const { mongoConfig } = require('../config')
const MongoDB = require('./mongodb.service')



const getOnePaymentById = async (username,order_id) => {
	try {
		let food = await MongoDB.db
			.collection(mongoConfig.collections.CARTS)
			.aggregate([
				// Match orders by username
				{ $match: { username: username } },

				// Lookup food information from the foods collection
				{
					$lookup: {
						from: 'foods',
						localField: 'foodId',
						foreignField: 'id',
						as: 'food',
					},
				},

				// Unwind the food array
				{ $unwind: '$food' },

				// Lookup restaurant information from the restaurants collection
				{
					$lookup: {
						from: 'restaurants',
						localField: 'food.restaurantId',
						foreignField: 'id',
						as: 'restaurant',
					},
				},

				// Unwind the restaurant array
				{ $unwind: '$restaurant' },

				// Group by username to calculate the total amount
				{
					$group: {
						_id: '$username',
						amount: {
							$sum: { $multiply: ['$food.price', '$count'] },
						},
						order_id: { $first: '$_id' },
					},
				},

				// Lookup user information from the users collection
				{
					$lookup: {
						from: 'users',
						localField: '_id',
						foreignField: 'username',
						as: 'user',
					},
				},

				// Unwind the user array
				{ $unwind: '$user' },

				// Project the final output
				{
					$project: {
						_id: 0,
						amount: 1,
						name: '$user.username',
						order_id: order_id,
						email: '$user.email',
					},
				},
			])
			.toArray()

		if (food) {
			return {
				status: true,
				message: 'paymentId found successfully',
				data: food,
			}
		} else {
			return {
				status: false,
				message: 'No paymentId found',
			}
		}
	} catch (error) {
		return {
			status: false,
			message: 'paymentId finding failed',
			error: `paymentId finding failed : ${error?.message}`,
		}
	}
}


module.exports = { getOnePaymentById }
