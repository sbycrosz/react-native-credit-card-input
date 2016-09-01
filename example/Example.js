import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import CreditCardForm from 'react-native-credit-card-form';

const s = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 100,
  },
  label: {
    color: "black",
    fontSize: 16,
  },
  input: {
    color: "darkgray",
    fontSize: 14,
  },
  placeholder: {
    color: "gray",
  },
  error: {
    color: "red",
  },
});

export default class Example extends Component {
  _onChange = formData => {
    console.log(formData);
    // {
    //   type: "visa",
    //   valid: true,
    //   number: "4242424242424242"
    //   expiryYear: 12,
    //   expiryMonth: 4,
    //   cvc: 200
    // }
  };

  render() {
    return (
      <View style={s.container}>
        <CreditCardForm
            autoFocus
            skipName

            labelStyle={s.label}
            inputStyle={s.input}
            placeholderStyle={s.placeholder}
            errorStyle={s.error}

            onChange={this._onChange} />
      </View>
    );
  }
}
