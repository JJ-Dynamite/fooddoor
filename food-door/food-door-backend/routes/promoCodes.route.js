const express = require('express')
const router = express.Router()

const promoCodeService = require('../services/promoCode.Service')

// Create a new promo code
router.post('/:code', async (req, res) => {
	try {
		const { code } = req?.params
		let username = req?.username

		const newPromoCode = await promoCodeService.addPromoCode({
			code,
			username,
		})
		res.json(newPromoCode)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server error')
	}
})

// Get all promo codes
router.get('/', async (req, res) => {
	try {
		let username = req?.username
		const promoCodes = await promoCodeService.getPromoCodes(username)
		res.json(promoCodes)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server error')
	}
})

// Get a single promo code by ID

router.get('/:id', async (req, res) => {
	try {
		const promoCode = await promoCodeService.readById(req.params.id)
		if (!promoCode) {
			return res.status(404).json({ msg: 'Promo code not found' })
		}
		res.json(promoCode)
	} catch (err) {
		console.error(err.message)
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Promo code not found' })
		}
		res.status(500).send('Server error')
	}
})

// Update a promo code by ID
router.put('/:id/:code', async (req, res) => {
	try {
		const { id, code } = req.params
		let username = req?.username

		const updatedPromoCode = await promoCodeService.updatePromoCode(
			id,
			code,
			username
		)
		if (!updatedPromoCode) {
			return res.status(404).json({ msg: 'Promo code not found' })
		}
		res.json(updatedPromoCode)
	} catch (err) {
		console.error(err.message)
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Promo code not found' })
		}
		res.status(500).send('Server error')
	}
})

// Delete a promo code by ID
router.delete('/:id', async (req, res) => {
	try {
		const deletedPromoCode = await promoCodeService.deletePromoCodeById(
			req.params.id
		)
		if (!deletedPromoCode) {
			return res.status(404).json({ msg: 'Promo code not found' })
		}
		res.json({ msg: 'Promo code deleted' })
	} catch (err) {
		console.error(err.message)
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Promo code not found' })
		}
		res.status(500).send('Server error')
	}
})

module.exports = router
