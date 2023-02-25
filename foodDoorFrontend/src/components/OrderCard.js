import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { ApiConstants, Colors, Fonts } from '../constants'
import { CheckOutService, StaticImageService } from '../services'
import { useDispatch } from 'react-redux'
import { OrderAction } from '../store/actions'
import reactotron from 'reactotron-react-native'

const OrderCard = ({
	foodId,
	Item,
	image,
	location,
	navigate,
	totalAmount,
}) => {
	console.log(foodId, Item, image, location, navigate, totalAmount)
	const dispatch = useDispatch()

	const removeOrder = () =>
		dispatch(OrderAction.removeOrder({ foodId: foodId.toString() }))
	// reactotron.log(foodId.toString())

	// React.cloneElement()
	return (
		<View style={styles.container}>
			<Ionicons
				name="close-circle"
				color={Colors.DEFAULT_GREY}
				size={22}
				style={styles.remomveIcon}
				onPress={() => removeOrder()}
			/>
			<TouchableOpacity activeOpacity={0.8} onPress={() => navigate({ foodId: foodId})}>
				<Image
					source={{
						uri: StaticImageService.getGalleryImage(
							image,
							ApiConstants.STATIC_IMAGE.SIZE.SQUARE
						),
					}}
					style={styles.posterStyle}
				/>
			</TouchableOpacity>
			<View style={styles.labelContainer}>
				<Text style={styles.titleText}>{Item}</Text>
				

				<View style={styles.buttonLabelRow}>
					<View style={styles.rowAndCenter}>
						<FontAwesome name="star" size={13} />
						<Text style={styles.ratingText}>4.3</Text>
					</View>
					<View style={styles.rowAndCenter}>
						<Ionicons
							name="ios-time-outline"
							color={Colors.GOOGLE_BLUE}
							size={15}
						/>
						<Text style={styles.ratingText}>20 mins</Text>
					</View>
					<View style={styles.rowAndCenter}>
						{totalAmount?(<TouchableOpacity style={styles.reloadButton}>
							
							<Text style={styles.reloadText}>
								{totalAmount?`$ ${totalAmount}`:`\u{1F31F}`}
							</Text>
						</TouchableOpacity>):(<View style={styles.rowAndCenter}>
					<Entypo
						name="location"
						size={10}
						color={Colors.DEFAULT_GREY}
					/>
					<Text style={styles.locationText}>{location}</Text>
				</View>)}
					</View>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	posterStyle: {
		width: 80,
		height: 80,
		borderRadius: 10,
		margin: 5,
	},
	remomveIcon: {
		position: 'absolute',
		zIndex: 5,
		top: 0,
		right: 0,
	},
	labelContainer: {
		flex: 1,
		paddingHorizontal: 10,
	},
	titleText: {
		fontSize: 15,
		lineHeight: 15 * 1.4,
		fontFamily: Fonts.POPPINS_MEDIUM,
		color: Colors.DEFAULT_BLACK,
		marginBottom: 5,
	},
	tagText: {
		fontSize: 11,
		lineHeight: 11 * 1.4,
		fontFamily: Fonts.POPPINS_MEDIUM,
		color: Colors.DEFAULT_GREY,
		marginBottom: 5,
	},
	rowAndCenter: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	locationText: {
		fontSize: 11,
		lineHeight: 11 * 1.4,
		fontFamily: Fonts.POPPINS_MEDIUM,
		color: Colors.DEFAULT_GREY,
		marginBottom: 5,
		marginLeft: 5,
	},
	ratingText: {
		fontSize: 12,
		lineHeight: 12 * 1.4,
		fontFamily: Fonts.POPPINS_SEMI_BOLD,
		color: Colors.DEFAULT_BLACK,
		marginLeft: 3,
	},
	buttonLabelRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	reloadButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: Colors.DEFAULT_GREEN,
		padding: 8,
		borderRadius: 22,
	},
	reloadText: {
		color: Colors.DEFAULT_WHITE,
		marginHorizontal: 13,
		fontFamily: Fonts.POPPINS_LIGHT,
		// fontSize:13
	},
})

export default OrderCard
