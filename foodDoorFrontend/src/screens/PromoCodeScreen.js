import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../constants';


const PromoCodeScreen = () => {
  const [promoCode, setPromoCode] = useState('');
  
  const handleApplyCode = () => {
    // Do something with the promo code
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Promo Code</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter code here"
          value={promoCode}
          onChangeText={setPromoCode}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleApplyCode}
        >
          <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.note}>Note: Promo code must be entered at checkout to receive discount.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.DEFAULT_BLACK,
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: Colors.DEFAULT_WHITE,
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 18,
    color: Colors.DEFAULT_BLACK,
  },
  button: {
    backgroundColor:  Colors.DEFAULT_GREEN,
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginLeft: 15,
  },
  buttonText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
  note: {
    fontSize: 14,
    color: Colors.DEFAULT_GREY,
    textAlign: 'center',
    width: '80%',
  },
});

export default PromoCodeScreen;
