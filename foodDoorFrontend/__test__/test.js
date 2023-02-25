//# [checkOut]

// import { OrderAction } from '../store/actions'
// import { useDispatch, useSelector } from 'react-redux'

// const dispatch = useDispatch()

// const isOrder = useSelector(
// 	state =>
// 		state?.OrderState?.Orders?.filter(item => item?.restaurantId === id)
// 			?.length > 0
// )
// const addOrder = () => dispatch(OrderAction.addOrder({ restaurantId: id }))

// const removeOrder = () =>
// 	dispatch(OrderAction.removeOrder({ restaurantId: id }))

// isOrder && addOrder(props.id)
// removeOrder(props.id)

//  onPress={() =>
// 	isOrder ? removeOrder() : addOrder()
// }

//   import { OrderAction } from '../store/actions'
// import { useDispatch, useSelector } from 'react-redux'

//# [payment]
// RazorpayCheckout.open(options)
// 	.then(function (data) {
// 		// handle success here
// 		console.log('Payment successful: ', data)

// 		// Place an order
// 		const paymentId = data.razorpay_payment_id
// 		const orderDetails = {
// 			payment_id: paymentId,
// 			customer_name: options.prefill.name,
// 			customer_email: options.prefill.email,
// 			customer_contact: options.prefill.contact,
// 			amount: options.amount,
// 			currency: options.currency,
// 			// ... add any other necessary information for the order
// 		}

// send a request to the server to place an order
// 	fetch('/api/place-order', {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 		body: JSON.stringify(orderDetails),
// 	})
// 		.then(response => {
// 			if (response.status === 200) {
// 				console.log('Order placed successfully')
// 			} else {
// 				console.error('Failed to place an order')
// 			}
// 		})
// 		.catch(error => {
// 			console.error('Error while placing an order: ', error)
// 		})
// })
// .catch(function (error) {
// 	// handle error here
// 	console.log('Error in payment: ', error)
// })

// import Geolocation from 'react-native-geolocation-service';
// import axios from 'axios';

// const [restaurants, setRestaurants] = useState([]);

// const findNearbyRestaurants = async () => {
//   const location = await Geolocation.getCurrentPosition(
// 	position => {
// 	  const {longitude, latitude} = position.coords;
// 	  axios.get(`https://api.yelp.com/v3/businesses/search?term=restaurant&latitude=${latitude}&longitude=${longitude}`, {
// 		headers: {
// 		  Authorization: 'Bearer YOUR_YELP_API_KEY'
// 		}
// 	  }).then(response => {
// 		setRestaurants(response.data.businesses);
// 	  }).catch(error => {
// 		console.log(error);
// 	  });
// 	},
// 	error => {
// 	  console.log(error);
// 	},
// 	{enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
//   );
// }

// Call this function when the user presses a button or performs a search
// findNearbyRestaurants();

//!-------------------------------------Beta-----------------------------------|
//?----------------------------------process-----------------------------------|
//*----------------------------------process-----------------------------------|

//#-----------------------------------Action-----------------------------------|
