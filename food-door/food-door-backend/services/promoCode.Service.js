const { mongoConfig } = require('../config')
const MongoDB = require('./mongodb.service')
const { ObjectId } = require('mongodb')

const addPromoCode = async ({ code, username }) => {
	try {
		const collection = MongoDB.db.collection(mongoConfig.collections.CODES)
		const result = await collection.insertOne({ code, username })

		if (result.insertedId) {
			return {
				status: true,
				message: 'Promo code added successfully',
				data: { code, username },
			}
		}
	} catch (error) {
		console.error(error)
		return {
			status: false,
			message: 'Promo code could not be added',
		}
	}
}
const getPromoCodes = async () => {
	try {
		const collection = MongoDB.db.collection(mongoConfig.collections.CODES)
		const promoCodes = await collection.find().toArray()
		return {
			status: true,
			data: promoCodes,
		}
	} catch (error) {
		console.error(error)
		return {
			status: false,
			message: 'Failed to fetch promo codes',
		}
	}
}

async function readById(id) {
	try {
		if (!ObjectId.isValid(id)) {
			return {
				success: false,
				message: 'Invalid ID',
			}
		}
		const collection = MongoDB.db.collection(mongoConfig.collections.CODES)
		const result = await collection.findOne({ _id: ObjectId(id) })
		if (!result) {
			return {
				success: false,
				message: 'No document found with the specified ID',
			}
		}
		return {
			success: true,
			data: result,
		}
	} catch (error) {
		console.error(error)
		return {
			success: false,
			message: 'Failed to fetch data by id',
		}
	}
}

async function updatePromoCode(id, code) {
	try {
		const collection = MongoDB.db.collection(mongoConfig.collections.CODES)
		const result = await collection.updateOne(
			{ _id: ObjectId(id) },
			{ $set: { code } }
		)
		if (result.modifiedCount > 0) {
			return {
				success: true,
				message: 'Code updated successfully',
			}
		} else {
			return {
				success: false,
				message: 'No matching document found, code not updated',
			}
		}
	} catch (error) {
		console.error(error)
		return {
			success: false,
			message: 'Failed to update code',
		}
	}
}

async function deletePromoCodeById(promoCodeId) {
	try {
		const collection = MongoDB.db.collection(mongoConfig.collections.CODES)
		const result = await collection.deleteOne({
			_id: ObjectId(promoCodeId),
		})

		if (result.deletedCount === 0) {
			return {
				success: false,
				message: 'No matching document found, code not deleted',
			}
		}

		return {
			success: true,
			message: 'Code deleted successfully',
		}
	} catch (error) {
		console.error(error)
		return {
			success: false,
			message: 'Failed to delete code',
		}
	}
}

module.exports = {
	addPromoCode,
	getPromoCodes,
	readById,
	updatePromoCode,
	deletePromoCodeById,
}
