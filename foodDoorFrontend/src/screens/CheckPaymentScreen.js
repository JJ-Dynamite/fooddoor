import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import Images from '../constants/Images';

const CheckPaymentScreen = () => {
  const [buttonEnabled, setButtonEnabled] = useState(false);

  const handleClick = () => {
    setButtonEnabled(!buttonEnabled);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Payment Option</Text>
      <View style={styles.paymentContainer}>
        <TouchableOpacity style={styles.paymentButton} onPress={handleClick}>
          <Image style={styles.atmCardStyle} source={Images.ATM_CARD} />
          <View style={styles.atmTextCenter}>
            <Text style={styles.paymentMethodText}>Credit Card</Text>
            <Text style={styles.paymentMethodText}>Pay with masterCard or Visa</Text>
          </View>
          <AntDesign
            name="checkcircle"
            size={23}
            color={buttonEnabled ? Colors.DEFAULT_YELLOW : Colors.DEFAULT_WHITE}
          />
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add Payment Option</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#f54291',
  },
  paymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.DEFAULT_WHITE,
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.DEFAULT_GREY,
    width: '90%',
  },
  paymentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    // paddingVertical: 10,
    width: '100%',
  },
  atmCardStyle: {
    width: 50,
    height: 50,
  },
  atmTextCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    // width: '10%',
  },
  paymentMethodText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.DEFAULT_BLACK,
    marginBottom: 5,
  },
  button: {
    backgroundColor: Colors.DEFAULT_GREEN,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CheckPaymentScreen;
