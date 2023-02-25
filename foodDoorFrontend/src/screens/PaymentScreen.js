import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import RazorpayCheckout from 'react-native-razorpay'
import reactotron from 'reactotron-react-native'
import { Colors, Fonts } from '../constants'
import { PaymentService } from '../services'

const PaymentScreen = ({ navigation ,route }) => {
	const [orderId, setOrderId] = useState('')
	const [amount, setAmount] = useState(0)
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')

	const fetchPaymentDetails = async () => {
		// Make an API call to your server to fetch payment details
		let response = await PaymentService.getPayment('ron')
		const data = response
		reactotron.log(
			`fetchPaymentDetails| ${JSON.stringify(data.data[0].amount)}`
		)
		// Set payment details
		setOrderId(data.data[0].order_id)
		setAmount(data.data[0].amount)
		setName(data.data[0].name)
		setEmail(data.data[0].email)
	}
	useEffect(() => {
		fetchPaymentDetails()
	}, [])

	const startPayment = () => {
		const options = {
			description: 'Payment for your order',
			image: 'https://your-app-icon-url.com',
			currency: 'USD',
			key: 'rzp_test_74jfpKWK3hJGhA',
			amount: amount * 100,
			name: name,
			// order_id: orderId,
			prefill: {
				email: email,
				contact: '',
				name: name,
			},
			theme: { color: Colors.DEFAULT_GREEN },
			handler: function (response) {
				console.log(response)
				// Handle successful payment
				alert('Payment successful')
			},
			modal: {
				ondismiss: function () {
					// Handle payment failure
					alert('Payment failed')
				},
			},
		}

		RazorpayCheckout.open(options)
			.then(data => {
				// Handle successful payment
				reactotron.log(data)
				navigation.navigate('Order')
				route.params.setOrder();
			})
			.catch(error => {
				// Handle payment failure
				reactotron.log(error)
			})
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Payment Details</Text>

			<View style={styles.detailContainer}>
				<Text style={styles.detailLabel}>Order ID:</Text>
				<Text style={styles.detailValue}>{orderId}</Text>
			</View>
			<View style={styles.detailContainer}>
				<Text style={styles.detailLabel}>Amount:</Text>
				<Text style={styles.detailValue}>{amount}</Text>
			</View>
			<View style={styles.detailContainer}>
				<Text style={styles.detailLabel}>Name:</Text>
				<Text style={styles.detailValue}>{name}</Text>
			</View>
			<View style={styles.detailContainer}>
				<Text style={styles.detailLabel}>Email:</Text>
				<Text style={styles.detailValue}>{email}</Text>
			</View>
			<View style={styles.buttonContainer}>
				<View style={styles.buttonContainer}>
					{/* <TouchableOpacity
						style={[styles.button, styles.fetchButton]}
						onPress={fetchPaymentDetails}
					>
						<Text style={styles.buttonText}>
							Fetch Payment Details
						</Text>
					</TouchableOpacity> */}

					<TouchableOpacity
						style={[styles.button, styles.payButton]}
						onPress={startPayment}
					>
						<Text style={styles.buttonText}>Make Payment</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.DEFAULT_WHITE,
		paddingHorizontal: 16,
		paddingVertical: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		marginVertical: 20,
		fontFamily: Fonts.POPPINS_BLACK,
	},
	detailContainer: {
		flexDirection: 'row',
		marginVertical: 8,
	},
	detailLabel: {
		flex: 1,
		fontSize: 18,
		fontWeight: 'bold',
		marginRight: 8,
		fontFamily: Fonts.POPPINS_BOLD,
	},
	detailValue: {
		flex: 2,
		fontSize: 18,
		marginLeft: 8,
		fontFamily: Fonts.POPPINS_REGULAR,
	},
	buttonContainer: {
		marginTop: 20,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
	},
	button: {
		backgroundColor: Colors.DEFAULT_GREEN,
		borderRadius: 8,
		paddingVertical: 10,
		paddingHorizontal: 16,
		fontSize: 18,
	},
	buttonText: {
		color: Colors.DEFAULT_WHITE,
		// fontWeight: 'bold',
		textAlign: 'center',
		fontFamily: Fonts.POPPINS_BOLD,
	},
	fetchButton: {
		width: '45%',
		marginRight: 10,
	},
	payButton: {
		width: '45%',
		marginLeft: '30%',
	},
	// Responsive styles
	responsiveTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 20,
	},
	responsiveDetailLabel: {
		fontSize: 18,
		fontWeight: 'bold',
		marginRight: 8,
	},
	responsiveDetailValue: {
		fontSize: 18,
		marginLeft: 8,
	},
	responsiveButtonContainer: {
		marginTop: 20,
		flexDirection: 'column',
		alignItems: 'center',
	},
	responsiveButton: {
		backgroundColor: Colors.DEFAULT_YELLOW,
		borderRadius: 8,
		paddingVertical: 10,
		paddingHorizontal: 16,
		marginVertical: 10,
		width: '100%',
	},
	responsiveButtonText: {
		color: Colors.DEFAULT_YELLOW,
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 18,
	},
})

export default PaymentScreen
