import { ApiConstants } from '../constants'
import axios from 'axios'
import { authHeader } from '../utils/Generator'
import { getToken } from '../../Store'
import reactotron from 'reactotron-react-native'

const getPayment = async username => {
	try {
		let response = await axios.get(
			`${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.PAYMENT}/${username}`,
			{
				headers: authHeader(getToken()),
			}
		)
		if (response?.status === 200) {
			reactotron.log(
				`PaymentService | getPayment:${JSON.stringify(response)}`
			)
			return {
				status: true,
				message: `Payment data fetched`,
				data: response?.data?.data,
			}
		} else {
			return {
				status: false,
				message: `Payment data not found`,
			}
		}
	} catch (error) {
		return {
			status: false,
			message: `Payment data not found`,
		}
	}
}
export default { getPayment }
