import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PopeUp } from '../components'

const TestScreen = () => {
	return (
		<View style={styles.mainContainer}>
			< PopeUp style={styles.testText}/>
		</View>
	)
}

export default TestScreen

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	testText: {
		fontSize: 16, 
	},
})
