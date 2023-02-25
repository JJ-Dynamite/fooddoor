import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  // Picker,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Separator } from '../components';
import { Colors } from '../constants';

const previousAddresses = [
  {
    id: '1',
    fullName: 'John Doe',
    phoneNumber: '555-1234',
    addressLine1: '123 Main St',
    addressLine2: 'Apt 1',
    city: 'Anytown',
    state: 'CA',
    zipCode: '12345',
  },
  {
    id: '2',
    fullName: 'Jane Doe',
    phoneNumber: '555-5678',
    addressLine1: '456 Oak St',
    addressLine2: '',
    city: 'Anytown',
    state: 'CA',
    zipCode: '12345',
  },
];

const AddDeliveryAddressScreen = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [selectedAddressId, setSelectedAddressId] = useState('');

  const handleSaveAddress = () => {
    // Handle saving the address here
  };

  return (
    <ScrollView style={styles.container}>
			<Separator height={StatusBar.currentHeight} />
      <Text style={styles.title}>Add Delivery Address</Text>
      <View style={styles.previousAddressesContainer}>
        <Text style={styles.previousAddressesLabel}>
          Select a Previous Address:
        </Text>
        <Picker
          style={styles.previousAddressesPicker}
          selectedValue={selectedAddressId}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedAddressId(itemValue)
          }>
          <Picker.Item label="- Select an address -" value="" />
          {previousAddresses.map((address) => (
            <Picker.Item
              label={`${address.fullName} - ${address.addressLine1}`}
              value={address.id}
              key={address.id}
            />
          ))}
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Address Line 1"
        value={addressLine1}
        onChangeText={setAddressLine1}
      />
      <TextInput
        style={styles.input}
        placeholder="Address Line 2"
        value={addressLine2}
        onChangeText={setAddressLine2}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        value={state}
        onChangeText={setState}
      />
      <TextInput
        style={styles.input}
        placeholder="Zip Code"
        value={zipCode}
        onChangeText={setZipCode}
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveAddress}>
        <Text style={styles.buttonText}>Save Address</Text>
      </TouchableOpacity>
			<Separator height={StatusBar.currentHeight} />


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  previousAddressesContainer: {
    marginBottom: 16,
  },
  previousAddressesLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  previousAddressesPicker: {
    height: 50,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: Colors.DEFAULT_GREEN,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddDeliveryAddressScreen;
