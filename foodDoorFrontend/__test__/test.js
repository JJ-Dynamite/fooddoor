//# [promo code]


<View style={styles.foodList}>
{restaurant?.foods
	?.filter(
		food => food?.category === selectedCategory
	)
	?.map(item => (
		<FoodCard
			key={item?.id}
			{...item}
			navigate={() =>
				navigation.navigate('Food', {
					foodId: item?.id,
				})
			}
		/>
	))}
<Separator height={Display.setHeight(2)} />
</View>


















//!-------------------------------------Beta-----------------------------------|
//?----------------------------------process-----------------------------------|
//*----------------------------------process-----------------------------------|
//#-----------------------------------Action-----------------------------------|
