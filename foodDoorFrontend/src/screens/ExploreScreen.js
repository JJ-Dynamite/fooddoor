import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, PermissionsAndroid } from 'react-native'
import { Display } from '../utils'
import MapboxGL from '@rnmapbox/maps'
import { Colors } from '../constants'
import { MapSearch } from '../components'
import Geolocation from 'react-native-geolocation-service'
import axios from 'axios'

const mapToken =
	'pk.eyJ1IjoibWF0aGV3OTkiLCJhIjoiY2xkcG9jNnc1MTVjeTNyb2x1ODJ4b2diOCJ9.akRV69e_aVYMPEPSl14USA'

MapboxGL.setWellKnownTileServer('Mapbox')
MapboxGL.setAccessToken(mapToken)

// const [restaurants, setRestaurants] = useState([])

// const findNearbyRestaurants = async () => {
// 	const location = await Geolocation.getCurrentPosition(
// 		position => {
// 			const { longitude, latitude } = position.coords
// 			axios
// 				.get(
// 					`https://api.yelp.com/v3/businesses/search?term=restaurant&latitude=${latitude}&longitude=${longitude}`,
// 					{
// 						headers: {
// 							Authorization: '5aee1b67edmsh4b1c4c8c7d4aa6bp158598jsn044285d67c1a',
// 						},
// 					}
// 				)
// 				.then(response => {
// 					setRestaurants(response.data.businesses)
// 				})
// 				.catch(error => {
// 					console.log(error)
// 				})
// 		},
// 		error => {
// 			console.log(error)
// 		},
// 		{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
// 	)
// }

const requestLocationPermission = async () => {
	try {
		const granted = await PermissionsAndroid.requestMultiple(
			[
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
				PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
			],
			{
				title: 'ACCESS_FINE_LOCATION Permission',
				message:
					'App needs access to your LOCATION ' +
					'so you can select LOCATION.',
				buttonNeutral: 'Ask Me Later',
				buttonNegative: 'Cancel',
				buttonPositive: 'OK',
			}
		)
		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			console.log('You can use the LOCATION')
		} else {
			console.log('LOCATION permission denied')
		}
	} catch (err) {
		console.warn(err)
	}
}

const ExploreScreen = () => {
	useEffect(() => {
		requestLocationPermission()
	}, [])

	return (
		<View style={styles.page}>
			<View style={styles.container}>
				{/* <MapSearch/> */}
				<MapboxGL.MapView
					style={styles.map}
					zoomLevel={15}
					styleURL={MapboxGL.StyleURL.Light}
				>
					<MapboxGL.UserLocation />
				</MapboxGL.MapView>
			</View>
		</View>
	)
}

export default ExploreScreen

const styles = StyleSheet.create({
	page: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.SECONDARY_WHITE,
	},
	container: {
		height: Display.setHeight(100),
		width: Display.setWidth(100),
		backgroundColor: 'tomato',
	},
	map: {
		flex: 1,
	},
})
