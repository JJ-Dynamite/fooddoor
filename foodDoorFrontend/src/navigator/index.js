import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {
	SplashScreen,
	WelcomeScreen,
	SignInScreen,
	SignUpScreen,
	ForgotPasswordScreen,
	RegisterPhoneScreen,
	VerificationScreen,
	RestaurantScreen,
	FoodScreen,
	CheckOutScreen,
	TestScreen,
	PaymentScreen,
	PromoCodeScreen,
	OrderStatusScreen,
	AddDeliveryAddressScreen,
	ProfileScreen,
	CheckPaymentScreen,

} from '../screens'
import HomeTabes from './BottomTabs'
import { useDispatch, useSelector } from 'react-redux'
import { GeneralAction } from '../store/actions'

const Stack = createStackNavigator()

const Navigators = () => {
	const { isAppLoading, token, isFirstTimeUse } = useSelector(
		state => state.generalState
	)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(GeneralAction.appStart())
	}, [])

	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				{isAppLoading ? (
					<Stack.Screen name="Splash" component={SplashScreen} />
				) : !token || token === null || token === '' ? (
					<>
						{isFirstTimeUse && (
							<Stack.Screen
								name="Welcome"
								component={WelcomeScreen}
							/>
						)}
						<Stack.Screen name="SignIn" component={SignInScreen} />
						<Stack.Screen name="SignUp" component={SignUpScreen} />
						<Stack.Screen
							name="ForgotPassword"
							component={ForgotPasswordScreen}
						/>
						<Stack.Screen
							name="RegisterPhone"
							component={RegisterPhoneScreen}
						/>
						<Stack.Screen
							name="Verification"
							component={VerificationScreen}
						/>
					</>
				) : (
					<>
						{/* <Stack.Screen name="Test" component={TestScreen} /> */}
						<Stack.Screen name="HomeTabes" component={HomeTabes} />
						<Stack.Screen
							name="Restaurant"
							component={RestaurantScreen}
						/>
						<Stack.Screen name="Food" component={FoodScreen} />
						<Stack.Screen name="CheckOut" component={CheckOutScreen} />
						<Stack.Screen name="Payment" component={PaymentScreen} />
						<Stack.Screen name="PromoCode" component={PromoCodeScreen} />
						<Stack.Screen name="OrderStatus" component={OrderStatusScreen} />
						<Stack.Screen name="AddDeliveryAddress" component={AddDeliveryAddressScreen} />
						<Stack.Screen name="Profile" component={ProfileScreen} />
						<Stack.Screen name="CheckPayment" component={CheckPaymentScreen} />
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Navigators
