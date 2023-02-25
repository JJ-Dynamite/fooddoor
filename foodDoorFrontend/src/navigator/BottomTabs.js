import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
	  AccountScreen,
	BookmarkScreen,
	HomeScreen,
	ExploreScreen
} from '../screens'
import TopTabsScreen from './TopTabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Display } from '../utils'
import { Colors } from '../constants'
const BottomTabs = createBottomTabNavigator()

export default () => (
	<BottomTabs.Navigator
		screenOptions={{
			headerShown: false,
			tabBarStyle: {
				position: 'absolute',
				borderTopLeftRadius: 25,
				borderTopRightRadius: 25,
				height: Display.setHeight(8),
				backgroundColor: Colors.DEFAULT_WHITE,
				borderTopWidth: 0,
			},
			tabBarShowLabel: false,
			tabBarActiveTintColor: Colors.DEFAULT_GREEN,
			tabBarInactiveTintColor: Colors.INACTIVE_GREY,
		}}
		op
	>
		<BottomTabs.Screen
			name="Home"
			component={HomeScreen}
			options={{
				tabBarIcon: ({ color }) => (
					<Ionicons name="home-outline" size={23} color={color} />
				),
			}}
		/>
		{/* <BottomTabs.Screen
			name="Explore"
			component={ExploreScreen}
			options={{
				tabBarIcon: ({ color }) => (
					<Ionicons name="compass-outline" size={23} color={color} />
				),
			}}
		/> */}
		<BottomTabs.Screen
			name="Bookmark"
			component={BookmarkScreen}
			options={{
				tabBarIcon: ({ color }) => (
					<Ionicons name="bookmark-outline" size={23} color={color} />
				),
			}}
		/>
		
		<BottomTabs.Screen
			name="TopTabs"
			component={TopTabsScreen}
			options={{
				tabBarIcon: ({ color }) => (
					<Ionicons name="cart-outline" size={23} color={color} />
				),
			}}
		/>
		<BottomTabs.Screen
		name="Account"
		component={AccountScreen}
		options={{
			tabBarIcon: ({ color }) => (
				<Ionicons name="person-outline" size={23} color={color} />
			),
		}}
	/>
	</BottomTabs.Navigator>
)
