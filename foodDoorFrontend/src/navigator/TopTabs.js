import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { OrderScreen, CartScreen } from '../screens'
const Tab = createMaterialTopTabNavigator()
import { Display } from '../utils'
import { Colors, Fonts } from '../constants'
import { StatusBar } from 'react-native'
import { Separator } from '../components'

export default () => {
	return (
		<>
			<StatusBar
				barStyle="light-content"
				backgroundColor={Colors.DEFAULT_GREEN}
				translucent
			/>
			<Separator height={StatusBar.currentHeight - 6} />
			<Tab.Navigator
				screenOptions={{
					tabBarLabelStyle: {
						fontSize: 15,
						fontFamily: Fonts.POPPINS_BOLD,
					},
					tabBarIndicatorStyle: {
						backgroundColor: Colors.DEFAULT_GREEN,
					},
					tabBarStyle: { backgroundColor: Colors.DEFAULT_WHITE },
					tabBarActiveTintColor: Colors.DEFAULT_GREEN,
					tabBarInactiveTintColor: Colors.INACTIVE_GREY,
				}}
			>
				<Tab.Screen name="Order" component={OrderScreen} />
				<Tab.Screen name="Cart" component={CartScreen} />
			</Tab.Navigator>
		</>
	)
}
