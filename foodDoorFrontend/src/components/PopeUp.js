import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/EvilIcons'
import { Colors, Fonts } from '../constants'
import { Display } from '../utils'

function PopeUp({navigate}) {
	return (
		<View style={[styles.container]}>
			<View style={styles.rectStack}>
				<View style={styles.rect}>
					<Icon name="check" style={styles.icon}></Icon>
					<Text style={styles.text}>
						You place Order successfully
					</Text>
					<Text style={styles.loremIpsum}>
						You Placed The Order Successfully. You Will{'\n'}Get
						Your Order Within 25 Minutes. Thanks For{'\n'}Usings Our
						Services, Enjoy Your Food.
					</Text>
					<TouchableOpacity
          onPress={() => navigate()}
          >
						<Text style={styles.keepBrowsingFood}>
							Keep Browsing Food
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		position:'absolute',
		top:Display.setWidth(50),
		left:Display.setWidth(5),
		zIndex:5
	},
	rect: {
		// top: 55,
		alignContent: 'center',
		width: Display.setWidth(90),
		height: Display.setHeight(40),
		// position: 'absolute',
		backgroundColor: Colors.DEFAULT_GREY,
		borderRadius: 20,
		left: 1,
		// shadowColor: 'rgba(0,0,0,1)',
		// shadowOffset: {
		// 	width: 0,
		// 	height: 20,
		// },
		elevation: 60,
		shadowOpacity: 0.5,
		shadowRadius: 20,
	},
	loremIpsum: {
		fontFamily: Fonts.POPPINS_REGULAR,
		color: '#121212',
		marginTop: 60,
		// marginLeft: 7,
		textAlign: 'center',
	},
	keepBrowsingFood: {
		// flex:1,
		fontFamily: Fonts.POPPINS_REGULAR,
		color: Colors.DEFAULT_GREEN,
		fontSize: 16,
		marginTop: 40,
		// marginLeft: 77,
		textAlign: 'center',

		//  alignItems: "center",
		//  justifyContent: 'center'
	},
	icon: {
		position: 'absolute',
		top: -30,
		// left: '35%',
		color: Colors.DEFAULT_GREEN,
		fontSize: 80,
    marginLeft:'40%',
		
	},
	text: {
		top: 50,
		// left: 0,
		// position: 'absolute',
		fontFamily: Fonts.POPPINS_BOLD,
		color: Colors.DEFAULT_BLACK,
		// width: 270,
		fontSize: 16,
		textAlign: 'center',
	},
	rectStack: {
		// width: 295,
		// height: 269,
		// width: Display.setWidth(70),
		// height: Display.setHeight(30),
		alignContent: 'center',
		justifyContent: 'center',
	},
})

export default PopeUp
