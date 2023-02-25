import { OrderService } from '../../services'
import { types } from '../types/OrderTypes'

const addOrder = ({ foodId }) => {
	return dispatch => {
		dispatch({
			type: types.SET_ORDER,
			payload: true,
		})

		OrderService.addOrder({ foodId })
			.then(OrderResponse => {
				dispatch({
					type: types.GET_ORDER,
					payload: OrderResponse?.data,
				})

				dispatch({
					type: types.SET_ORDER,
					payload: false,
				})
			})
			.catch(() => {
				dispatch({
					type: types.SET_ORDER,
					payload: false,
				})
			})
	}
}

const removeOrder = ({ foodId }) => {
	return dispatch => {
		dispatch({
			type: types.SET_ORDER,
			payload: true,
		})
		OrderService.removeOrder({ foodId })
			.then(OrderResponse => {
				dispatch({
					type: types.GET_ORDER,
					payload: OrderResponse?.data,
				})
				dispatch({
					type: types.SET_ORDER,
					payload: false,
				})
			})
			.catch(() => {
				dispatch({
					type: types.SET_ORDER,
					payload: false,
				})
			})
	}
}
// const removeOrder = ({ _id }) => {
// 	return dispatch => {
// 	  dispatch({
// 		type: types.SET_ORDER,
// 		payload: true,
// 	  })
// 	  OrderService.removeOrder({ _id })
// 		.then(OrderResponse => {
// 		  dispatch({
// 			type: types.GET_ORDER,
// 			payload: OrderResponse?.data,
// 		  })
// 		  dispatch({
// 			type: types.SET_ORDER,
// 			payload: false,
// 		  })
// 		})
// 		.catch(() => {
// 		  dispatch({
// 			type: types.SET_ORDER,
// 			payload: false,
// 		  })
// 		})
// 	}
//   }

const getOrders = () => {
	return dispatch => {
		dispatch({
			type: types.SET_ORDER,
			payload: true,
		})
		OrderService.getOrders()
			.then(OrderResponse => {
				dispatch({
					type: types.GET_ORDER,
					payload: OrderResponse?.data,
				})
				dispatch({
					type: types.SET_ORDER,
					payload: false,
				})
			})
			.catch(() => {
				dispatch({
					type: types.SET_ORDER,
					payload: false,
				})
			})
	}
}

export default { types, addOrder, removeOrder, getOrders }
