import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import CreditCardForm from 'react-native-credit-card-form';

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: "center",
    marginTop: 100,
  },
});


export default class Example extends Component {
  render() {
    return (
      <View style={s.container}>
        <CreditCardForm />
      </View>
    );
  }
}
