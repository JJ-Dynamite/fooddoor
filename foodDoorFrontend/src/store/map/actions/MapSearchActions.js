import axios from 'axios'

export const searchRestaurants = searchTerm => async dispatch => {
	try {
		const { data } = await axios.get(
			`http://your-api/search?term=${searchTerm}`
		)
		dispatch({ type: 'SEARCH_RESTAURANTS_SUCCESS', payload: data })
	} catch (error) {
		dispatch({ type: 'SEARCH_RESTAURANTS_FAIL', payload: error.message })
	}
}
