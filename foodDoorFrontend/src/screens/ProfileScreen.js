import React, { useState } from 'react'
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Image,
	StatusBar,
	ScrollView,
} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'

import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import reactotron from 'reactotron-react-native'
import { Separator } from '../components'
import { Colors, Fonts } from '../constants'

const ProfileScreen = () => {
	const [fullName, setFullName] = useState('John Doe')
	const [email, setEmail] = useState('johndoe@example.com')
	const [phoneNumber, setPhoneNumber] = useState('555-1234')
	const [profilePicture, setProfilePicture] = useState(null)

	const handleSaveProfile = () => {
		// Handle saving the profile here
	}
	const handleChooseProfilePicture = () => {
		const options = {
			noData: true,
		}
		launchImageLibrary(options, response => {
			if (response.didCancel) {
				reactotron.log('User cancelled image picker')
			} else if (response.error) {
				reactotron.log('ImagePicker Error: ', response.error)
			} else if (response.uri) {
				setProfilePicture(response.uri)
			}
		})
	}

	return (
		<ScrollView style={styles.container}>
			<Separator height={StatusBar.currentHeight} />

			<View style={styles.containerProfile}>
				<TouchableOpacity
					style={styles.profilePictureContainer}
					onPress={handleChooseProfilePicture}
				>
					{profilePicture ? (
						<Image
							source={{ uri: profilePicture }}
							style={styles.profilePicture}
						/>
					) : (
						<Feather
							name="edit"
							size={32}
							color={Colors.DEFAULT_GREY}
						/>
					)}
				</TouchableOpacity>
				<Text style={styles.name}>John Doe</Text>
				<Text style={styles.email}>john.doe@example.com</Text>
			</View>
			<Separator height={90} />

			<Text style={styles.title}>Edit Profile</Text>
			<TextInput
				style={styles.input}
				placeholder="Full Name"
				value={fullName}
				onChangeText={setFullName}
			/>
			<TextInput
				style={styles.input}
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
			/>
			<TextInput
				style={styles.input}
				placeholder="Phone Number"
				value={phoneNumber}
				onChangeText={setPhoneNumber}
			/>

			<TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
				<Text style={styles.buttonText}>Save Changes</Text>
			</TouchableOpacity>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: Colors.DEFAULT_WHITE,
	},
	profilePicture: {
		width: 120,
		height: 120,
		borderRadius: 60,
		marginBottom: 16,
	},

	profilePicturePlaceholderText: {
		color: Colors.DEFAULT_GREY,
		fontSize: 16,
		textAlign: 'center',
	},
	title: {
		fontSize: 16,
		marginBottom: 16,
		fontFamily: Fonts.POPPINS_BOLD,
	},
	input: {
		height: 50,
		borderWidth: 1,
		borderColor: Colors.DEFAULT_GREY,
		borderRadius: 10,
		paddingHorizontal: 16,
		marginBottom: 16,
		fontFamily: Fonts.POPPINS_LIGHT,
	},
	button: {
		backgroundColor: Colors.DEFAULT_GREEN,
		paddingVertical: 12,
		borderRadius: 8,
		fontFamily: Fonts.POPPINS_BOLD,
	},
	buttonText: {
		color: Colors.DEFAULT_WHITE,
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	containerProfile: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	profilePictureContainer: {
		width: 120,
		height: 120,
		borderRadius: 60,
		borderWidth: 1,
		borderColor: Colors.DEFAULT_GREY,
		overflow: 'hidden',
		justifyContent: 'center',
		alignItems: 'center',
	},
	profilePicture: {
		width: '100%',
		height: '100%',
	},

	name: {
		marginTop: 16,
		fontSize: 16,
		fontFamily: Fonts.POPPINS_BOLD,
		color: Colors.DEFAULT_BLACK,
	},
	email: {
		marginTop: 8,
		fontSize: 16,
		color: Colors.DEFAULT_GREY,
		fontFamily: Fonts.POPPINS_MEDIUM,
	},
})

export default ProfileScreen
