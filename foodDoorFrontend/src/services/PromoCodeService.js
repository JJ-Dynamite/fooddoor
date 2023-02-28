import axios from 'axios'
import { ApiConstants } from '../constants'
import { getToken } from '../../Store'
import { authHeader } from '../utils/Generator'

const PromoCodeService = {
	getPromoCodes: async () => {
		try {
			const response = await axios.get(
				`${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.PROMO_CODE}`,
				{
					headers: authHeader(getToken()),
				}
			)

			if (response?.status === 200) {
				return {
					status: true,
					message: 'Promo codes fetched successfully',
					data: response?.data?.data,
				}
			} else {
				return {
					status: false,
					message: 'Failed to fetch promo codes',
				}
			}
		} catch (error) {
			return {
				status: false,
				message: 'Failed to fetch promo codes',
			}
		}
	},

	addPromoCode: async ({ code, username }) => {
		console.log(`PromoCodeService | addPromoCode`)
		try {
			let response = await axios.post(
				`${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.PROMO_CODE}/${code}`,
				{},
				{
					headers: authHeader(getToken()),
				}
			)
			if (response?.status === 200) {
				return {
					status: true,
					message: `Promo code added successfully`,
					data: response?.data?.data,
				}
			} else {
				return {
					status: false,
					message: `Failed to add promo code`,
				}
			}
		} catch (error) {
			console.log(error?.response)
			return {
				status: false,
				message: `Failed to add promo code`,
			}
		}
	},

	deletePromoCode: async id => {
		try {
			const response = await axios.delete(
				`${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.PROMO_CODE}/${id}`,
				{
					headers: authHeader(getToken()),
				}
			)

			if (response?.status === 200) {
				return {
					status: true,
					message: 'Promo code deleted successfully',
					data: response?.data?.data,
				}
			} else {
				return {
					status: false,
					message: 'Failed to delete promo code',
				}
			}
		} catch (error) {
			return {
				status: false,
				message: 'Failed to delete promo code',
			}
		}
	},
}

export default PromoCodeService
