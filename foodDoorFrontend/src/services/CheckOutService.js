import React, { useState } from 'react'
import { ApiConstants, Colors } from '../constants'
import axios from 'axios'
import { authHeader } from '../utils/Generator'
import { getToken } from '../../Store'
import RazorpayCheckout from 'react-native-razorpay'
import { ToastAndroid, View } from 'react-native'
import { PopeUp } from '../components'

const setPayment = amount => {
	var options = {
		description: 'Payment for your order',
		image: 'https://your-app-icon-url.com',
		currency: 'USD',
		key: 'rzp_test_LF1EqJgOuTnyOR',
		amount: amount * 100,
		name: 'Acme Corp',
		// order_id: {},//Replace this with an order_id created using Orders API.
		prefill: {
			email: 'gaurav.kumar@example.com',
			contact: '9191919191',
			name: 'Gaurav Kumar',
		},
		theme: { color: Colors.DEFAULT_YELLOW },
	}


	RazorpayCheckout.open(options)
  .then(function(data) {
    // handle success here
    console.log("Payment successful: ", data);

    // Place an order
    const paymentId = data.razorpay_payment_id;
    const orderDetails = {
      payment_id: paymentId,
      customer_name: options.prefill.name,
      customer_email: options.prefill.email,
      customer_contact: options.prefill.contact,
      amount: options.amount,
      currency: options.currency,
      // ... add any other necessary information for the order
    };

    // send a request to the server to place an order
    fetch('/api/place-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetails)
    })
    .then(response => {
      if (response.status === 200) {
        console.log('Order placed successfully');
      } else {
        console.error('Failed to place an order');
      }
    })
    .catch(error => {
      console.error('Error while placing an order: ', error);
    });
  })
  .catch(function(error) {
    // handle error here
    console.log("Error in payment: ", error);
  });

	
}

export default { setPayment }
