import React, { useState, useEffect } from 'react'
import {
	View,
	Text,
	StyleSheet,
	StatusBar,
	ScrollView,
	TouchableOpacity,
	Image,
} from 'react-native'
import { Colors, Fonts, Images } from '../constants'
import { FoodCard, Separator, PopeUp, CategoryListItem } from '../components'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { Display } from '../utils'
import { CheckOutService, OrderService } from '../services'

import { OrderAction } from '../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import reactotron from 'reactotron-react-native'
import { FlatList } from 'react-native-gesture-handler'

const ListHeader = () => (
	<View
		style={{
			flexDirection: 'row',
			flex: 1,
			width: 40,
			justifyContent: 'flex-end',
		}}
	>
		<View
			style={{
				backgroundColor: Colors.LIGHT_YELLOW,
				width: 20,
				borderTopLeftRadius: 64,
				borderBottomLeftRadius: 64,
			}}
		/>
	</View>
)

const ListFooter = () => (
	<View
		style={{
			flexDirection: 'row',
			flex: 1,
			width: 40,
		}}
	>
		<View
			style={{
				backgroundColor: Colors.LIGHT_YELLOW,
				width: 20,
				borderTopRightRadius: 64,
				borderBottomRightRadius: 64,
			}}
		/>
	</View>
)

const CheckOutScreen = ({
	navigation,
	route: {
		params: { foodId },
	},
}) => {
	reactotron.log(`checkOutScreen | CheckOutService | foodId: ${foodId}`)

	const dispatch = useDispatch()

	const [buttonEnabled, setButtonEnabled] = useState(false)
	const [selectedCategory, setSelectedCategory] = useState(null)

	const isOrder = useSelector(
		state =>
			state?.orderState?.orders?.filter(item => item?.foodId === foodId)
				?.length > 0
	)

	const addOrder = () => dispatch(OrderAction.addOrder({ foodId }))

	const removeOrder = () => dispatch(OrderAction.removeOrder({ foodId }))

	const handleClick = () => {
		setButtonEnabled(!buttonEnabled)
	}

	const cart = useSelector(state => state?.cartState?.cart)

	const setOrder = () => {
		isOrder ? removeOrder() : addOrder()
	}
	const promoCodes = {
		blackFriday: { id: 'BF2020', discount: '50' },
		cyberMonday: 'CM2020',
		summerSale: 'SS2020',
		backToSchool: 'BTS2020',
	}
	// const [promoCodes, setPromoCodes] = useState(null)

	// useEffect(() => {
	// 	RestaurantService.getOneRestaurantById(restaurantId).then(response => {
	// 		setSelectedCategory(response?.data?.categories[0])
	// setPromoCodes(response?.data)
	// 	})
	// }, [])

	return (
		<View style={styles.container}>
			<StatusBar
				barStyle="dark-content"
				backgroundColor={Colors.DEFAULT_WHITE}
				translucent
			/>
			<Separator height={StatusBar.currentHeight} />
			<View style={styles.headerContainer}>
				<Ionicons
					name="chevron-back-outline"
					size={30}
					onPress={() => navigation.goBack()}
				/>

				<Text style={styles.headerTitle}>Check out</Text>

				<Feather
					name="bell"
					size={24}
					color={Colors.DEFAULT_BLACK}
					style={{ position: 'absolute', right: 10 }}
				/>
				<View style={styles.alertBadge}>
					<Text style={styles.alertBadgeText}>12</Text>
				</View>
			</View>
			<ScrollView>
				<View style={styles.foodList}>
					{cart?.cartItems?.map(item => (
						<FoodCard
							{...item?.food}
							key={item?.food?.id}
							navigate={() =>
								navigation.navigate('Order', {
									foodId: item?.id,
								})
							}
						/>
					))}
				</View>

				<View
				// onPress={() => navigation.navigate('PromoCode')}
				>
					<View style={styles.promoCodeContainer}>
						<View style={styles.rowAndCenter}>
							<Entypo
								name="ticket"
								size={30}
								color={Colors.DEFAULT_YELLOW}
							/>
							<Text style={styles.promoCodeText}>
								Add Promo Code
							</Text>
						</View>
						{/* <Ionicons
							name="chevron-forward-outline"
							size={20}
							color={Colors.DEFAULT_BLACK}
						/> */}
					</View>
					{/*//!-------------------------------------Beta-----------------------------------| */}
					<View style={styles.categoriesContainer}>
						<FlatList
							data={Object.keys(promoCodes)}
							keyExtractor={item => item}
							horizontal
							ListHeaderComponent={() => <ListHeader />}
							ListFooterComponent={() => <ListFooter />}
							showsHorizontalScrollIndicator={false}
							renderItem={({ item }) => (
								<CategoryListItem
									name={item}
									isActive={item === selectedCategory}
									selectCategory={category =>
										setSelectedCategory(category)
									}
								/>
							)}
						/>
					</View>
				</View>
				<View style={styles.paymentContainer}>
					<TouchableOpacity
						style={styles.paymentButton}
						onPress={handleClick}
					>
						<Image
							style={styles.atmCardStyle}
							source={Images.ATM_CARD}
						/>
						<View style={styles.atmTextCenter}>
							<Text style={styles.paymentMethodText}>
								Credit Card
							</Text>
							<Text style={styles.paymentMethodText}>
								Pay with masterCard or Visa
							</Text>
						</View>
						<AntDesign
							name="checkcircle"
							size={23}
							color={
								buttonEnabled
									? Colors.DEFAULT_YELLOW
									: Colors.DEFAULT_WHITE
							}
						/>
					</TouchableOpacity>
				</View>
				<View style={styles.amountContainer}>
					<View style={styles.amountSubContainer}>
						<Text style={styles.amountLabelText}>Item Total</Text>
						<Text style={styles.amountText}>
							$ {cart?.metaData?.itemsTotal?.toFixed(2)}
						</Text>
					</View>
					<View style={styles.amountSubContainer}>
						<Text style={styles.amountLabelText}>Discount</Text>
						<Text style={styles.amountText}>
							$ {cart?.metaData?.discount?.toFixed(2)}
						</Text>
					</View>
					<View style={styles.amountSubContainer}>
						<Text style={styles.amountLabelText}>Delivery Fee</Text>
						<Text
							style={{
								...styles.amountText,
								color: Colors.DEFAULT_GREEN,
							}}
						>
							Free
						</Text>
					</View>
				</View>
				<View style={styles.totalContainer}>
					<Text style={styles.totalText}>Total</Text>
					<Text style={styles.totalText}>
						$ {cart?.metaData?.grandTotal?.toFixed(2)}
					</Text>
				</View>

				<TouchableOpacity
					style={[
						styles.checkoutButton,
						{
							backgroundColor: buttonEnabled
								? Colors.DEFAULT_GREEN
								: Colors.INACTIVE_GREY,
						},
					]}
					disabled={!buttonEnabled}
					//setOrder()as prop
					onPress={() =>
						navigation.navigate('Payment', { setOrder: setOrder })
					}
				>
					<View style={styles.rowAndCenter}>
						<Text style={styles.paymentText}>Confirm order</Text>
					</View>
				</TouchableOpacity>
				<Separator height={Display.setHeight(9)} />
			</ScrollView>
			{/* {<PopeUp/>} */}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.DEFAULT_WHITE,
	},
	headerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	headerTitle: {
		fontSize: 20,
		fontFamily: Fonts.POPPINS_MEDIUM,
		lineHeight: 20 * 1.4,
		width: Display.setWidth(80),
		textAlign: 'center',
	},
	foodList: {
		marginHorizontal: Display.setWidth(4),
	},
	promoCodeContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: Display.setWidth(4),
		paddingVertical: 15,
		marginTop: 10,
		borderTopWidth: 0.5,
		// borderBottomWidth: 0.5,
		justifyContent: 'space-between',
	},
	paymentContainer: {
		// flexDirection: 'row',
		// alignItems: 'space-between',
		marginHorizontal: Display.setWidth(4),
		paddingVertical: 10,
		marginTop: 10,
		borderTopWidth: 0.5,
		// borderBottomWidth: 0.5,
		// justifyContent: 'space-between',
	},
	promoCodeText: {
		fontSize: 15,
		fontFamily: Fonts.POPPINS_MEDIUM,
		lineHeight: 15 * 1.4,
		color: Colors.DEFAULT_BLACK,
		marginLeft: 100,
		textAlign: 'center',
	},
	rowAndCenter: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	atmTextCenter: {
		// flexDirection: 'flex-start',
		// justifyContent: 'flex-start',
		// alignItems: 'flex-start',
	},
	amountContainer: {
		marginHorizontal: Display.setWidth(4),
		paddingVertical: 20,
		borderBottomWidth: 0.5,
	},
	amountSubContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginVertical: 3,
	},
	amountLabelText: {
		fontSize: 15,
		fontFamily: Fonts.POPPINS_SEMI_BOLD,
		lineHeight: 15 * 1.4,
		color: Colors.DEFAULT_GREEN,
	},
	amountText: {
		fontSize: 15,
		fontFamily: Fonts.POPPINS_SEMI_BOLD,
		lineHeight: 15 * 1.4,
		color: Colors.DEFAULT_BLACK,
	},
	totalContainer: {
		marginHorizontal: Display.setWidth(4),
		paddingVertical: 15,
		borderBottomWidth: 0.5,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	totalText: {
		fontSize: 20,
		fontFamily: Fonts.POPPINS_SEMI_BOLD,
		lineHeight: 20 * 1.4,
		color: Colors.DEFAULT_BLACK,
	},
	checkoutButton: {
		// flexDirection: 'row',
		width: Display.setWidth(80),
		alignSelf: 'center',
		paddingHorizontal: 20,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		height: Display.setHeight(7),
		marginTop: 10,
	},
	paymentButton: {
		flexDirection: 'row',
		width: Display.setWidth(90),
		backgroundColor: Colors.DEFAULT_WHITE,
		alignSelf: 'center',
		paddingHorizontal: 20,
		justifyContent: 'space-between',
		alignItems: 'center',
		borderRadius: 30,
		height: Display.setHeight(7),
		marginTop: 10,
		shadowColor: 'rgba(0,0,0,1)',
		// shadowOffset: {
		// 	height: 5,
		// 	width: 0,
		// },
		elevation: 15,
		shadowOpacity: 0.5,
		// shadowRadius: 5,
	},
	paymentText: {
		fontSize: 16,
		fontFamily: Fonts.POPPINS_MEDIUM,
		lineHeight: 16 * 1.4,
		color: Colors.DEFAULT_WHITE,
		marginLeft: 8,
	},
	paymentMethodText: {
		fontSize: 14,
		fontFamily: Fonts.POPPINS_MEDIUM,
		lineHeight: 16 * 1.4,
		color: Colors.DEFAULT_BLACK,
		marginLeft: 8,
	},
	emptyCartContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	emptyCartText: {
		fontSize: 30,
		fontFamily: Fonts.POPPINS_LIGHT,
		lineHeight: 30 * 1.4,
		color: Colors.DEFAULT_GREEN,
	},
	emptyCartSubText: {
		fontSize: 12,
		fontFamily: Fonts.POPPINS_MEDIUM,
		lineHeight: 12 * 1.4,
		color: Colors.INACTIVE_GREY,
	},
	addButtonEmpty: {
		flexDirection: 'row',
		backgroundColor: Colors.DEFAULT_YELLOW,
		borderRadius: 8,
		paddingHorizontal: Display.setWidth(4),
		paddingVertical: 5,
		marginTop: 10,
		justifyContent: 'space-evenly',
		elevation: 3,
		alignItems: 'center',
	},
	addButtonEmptyText: {
		fontSize: 12,
		fontFamily: Fonts.POPPINS_MEDIUM,
		lineHeight: 12 * 1.4,
		color: Colors.DEFAULT_WHITE,
		marginLeft: 10,
	},
	emptyCartImage: {
		height: Display.setWidth(60),
		width: Display.setWidth(60),
	},
	alertBadge: {
		borderRadius: 32,
		backgroundColor: Colors.DEFAULT_YELLOW,
		justifyContent: 'center',
		alignItems: 'center',
		height: 16,
		width: 16,
		position: 'absolute',
		right: 5,
		top: 10,
	},
	alertBadgeText: {
		color: Colors.DEFAULT_WHITE,
		fontSize: 10,
		lineHeight: 10 * 1.4,
		fontFamily: Fonts.POPPINS_BOLD,
	},
	atmCardStyle: {
		width: 40,
		height: 40,
		// borderRadius: 10,
		// margin: 5,
	},
	categoriesContainer: {
		marginVertical: 4,
		// borderBottomWidth: 0.5,
		// marginHorizontal: Display.setWidth(4),
	},
})

export default CheckOutScreen
