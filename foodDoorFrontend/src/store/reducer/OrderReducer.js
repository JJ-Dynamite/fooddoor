import { OrderAction } from '../actions'

const initialState = {
	orders: [],
	setOrders: false,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case OrderAction.types.GET_ORDER:
			return { ...state, orders: action?.payload }
		case OrderAction.types.SET_ORDER:
			return { ...state, setOrders: action?.payload }
		default:
			return state
	}
}
