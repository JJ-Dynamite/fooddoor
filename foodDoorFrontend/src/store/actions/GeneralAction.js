import {
	StorageServices,
	UserServices,
	AuthenticationService,
} from '../../services'
import { types } from '../types/GeneralTypes'
import BookmarkAction from './BookmarkAction';
import CartAction from './CartAction';
import OrderAction from './OrderAction';

const setIsAppLoading = isAppLoading => {
	return {
		type: types.SET_IS_APP_LOADING,
		payload: isAppLoading,
	}
}

const setToken = token => {
	return {
		type: types.SET_TOKEN,
		payload: token,
	}
}

const setIsFirstTimeUse = () => {
	return {
		type: types.SET_FIRST_TIME_USE,
		payload: false,
	}
}
const setUserData = (userData) => {
	return {
		type: types.SET_USER_DATA,
		payload: userData,
	}
}
const appStart = () => {
	return (dispatch, getState) => {
		StorageServices.getFirstTimeUse().then(isFirstTimeUse => {
			dispatch({
				type: types.SET_FIRST_TIME_USE,
				payload: isFirstTimeUse ? false : true,
			})
		})
		StorageServices.getToken().then(token => {
			if (token) {
				dispatch({
					type: types.SET_TOKEN,
					payload: token,
				})
				UserServices.getUserData().then(userResponse => {
					if (userResponse?.status) {
						dispatch({
							type: types.SET_USER_DATA,
							payload: userResponse?.data,
						})
						dispatch(CartAction.getCartItems());
						dispatch(BookmarkAction.getBookmarks());
						dispatch(OrderAction.getOrders())
						dispatch({
							type: types.SET_IS_APP_LOADING,
							payload: false,
						})
					} else if (userResponse?.message === 'TokenExpiredError') {
						AuthenticationService.refreshToken().then(
							tokenResponse => {
								if (tokenResponse?.status) {
									dispatch({
										type: types.SET_TOKEN,
										payload: tokenResponse?.data,
									})
									UserServices.getUserData().then(
										userResponse => {
											if (userResponse?.status) {
												dispatch({
													type: types.SET_USER_DATA,
													payload: userResponse?.data,
												})
												dispatch({
													type: types.SET_IS_APP_LOADING,
													payload: false,
												})
											}
										}
									)
								} else {
									dispatch({
										type: types.SET_TOKEN,
										payload: '',
									})
									dispatch({
										type: types.SET_IS_APP_LOADING,
										payload: false,
									})
								}
							}
						)
					}
				})
			}
			dispatch({
				type: types.SET_IS_APP_LOADING,
				payload: false,
			})
		})
	}
}

export default { setIsAppLoading, setToken, types, appStart, setIsFirstTimeUse ,setUserData}
