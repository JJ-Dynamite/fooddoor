import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet ,Text} from 'react-native'
import { useDispatch } from 'react-redux'
import { searchRestaurants } from '../store/map/actions/MapSearchActions'

const SearchInput = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const dispatch = useDispatch()

	const handleSearch = () => {
		dispatch(searchRestaurants(searchTerm))
	}

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Search for restaurants"
				value={searchTerm}
				onChangeText={setSearchTerm}
			/>
			<TouchableOpacity style={styles.button} onPress={handleSearch}>
				<Text style={styles.buttonText}>Search</Text>
			</TouchableOpacity>
		</View>
	)
}

export default SearchInput

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#F5FCFF',
		marginTop:20,
		height:100,
		borderBottomLeftRadius:20,
		borderBottomRightRadius:20
	},
	input: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 8,
		padding: 10,
		marginBottom: 10,
		width: '80%',
		
	},
	button: {
		width: '80%',
	},
	buttonText: {
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
	},
})
