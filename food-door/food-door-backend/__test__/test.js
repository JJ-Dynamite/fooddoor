

// let instance = new Razorpay({
//     key_id: 'rzp_test_74jfpKWK3hJGhA',
//     key_secret: 'ehZxZHE1LpB1mpn2EzFS1W3s',
//   })
//   const myOrder = await instance.orders.create({
//     amount: totalAmount * 100,
//     currency: 'INR',
//     // order_id:order.id
//   })
const Razorpay = require('razorpay');

// Create a new instance of Razorpay
const razorpay = new Razorpay({
  key_id: 'YOUR_KEY_ID',
  key_secret: 'YOUR_KEY_SECRET'
});

// Define the order details
const orderAmount = 5000; // in paise (100 paise = 1 rupee)
const orderCurrency = 'INR';

// Create the Razorpay order
const order = await razorpay.orders.create({
  amount: orderAmount,
  currency: orderCurrency
});

// Get the order ID
const orderId = order.id;

console.log(`Order created successfully with ID: ${orderId}`);
