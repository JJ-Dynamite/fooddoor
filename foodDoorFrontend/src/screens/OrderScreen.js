import React,{useEffect} from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Colors, Fonts } from '../constants'
import { OrderCard, Separator } from '../components'
import { Display } from '../utils'
import { useSelector } from 'react-redux'

const ListItemSeparator = () => (
	<View
		style={{
			height: 0.8,
			backgroundColor: Colors.DEFAULT_GREY,
			width: '100%',
			marginVertical: 10,
		}}
	/>
)

const OrderScreen = ({ navigation }) => {

	const orders = useSelector(state => state?.orderState?.orders)
	console.log(orders)

	console.log('orderScreen | OrderCard')
	return (
		<View style={styles.container}>
			<FlatList
				style={styles.bookmarkList}
				data={orders}
				keyExtractor={item => item?.foodId}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={() => <Separator height={10} />}
				ListFooterComponent={() => <Separator height={10} />}
				ItemSeparatorComponent={() => <ListItemSeparator />}
				renderItem={({ item }) => (
					<OrderCard
						key={item.foodId}
						{...item}
						navigate={foodId =>
							navigation.navigate('Food', { foodId })
						}
					/>
				)}
			/>
			<Separator/>
		</View>
	)
}

export default OrderScreen

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
	bookmarkList: {
		marginHorizontal: 20,
	},
})
