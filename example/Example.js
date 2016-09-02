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
    marginTop: 60,
  },
  label: {
    color: "black",
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: "black",
    height: 35,
  },
});

export default class Example extends Component {
  _onChange = formData => {
    console.log(formData);
  };

  render() {
    return (
      <View style={s.container}>
        <CreditCardForm
            autoFocus

            imageFront={require("./images/card.png")}
            imageBack={require("./images/card.png")}

            labelStyle={s.label}
            inputStyle={s.input}
            validColor={"green"}
            invalidColor={"pink"}
            placeholderColor={"darkgray"}

            onChange={this._onChange} />
      </View>
    );
  }
}
