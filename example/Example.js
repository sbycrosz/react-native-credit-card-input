import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";

const s = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    marginTop: 60,
  },
  label: {
    color: "black",
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: "black",
  },
});

const SCREEN_IS_TOO_SMALL = true;

export default class Example extends Component {
  _onChange = formData => {
    console.log(formData);
  };

  render() {
    return (
      <View style={s.container}>
        { SCREEN_IS_TOO_SMALL ?
          (<LiteCreditCardInput
              autoFocus
              inputStyle={s.input}

              validColor={"green"}
              invalidColor={"pink"}
              placeholderColor={"darkgray"}

              onChange={this._onChange} />) :
            (<CreditCardInput
                autoFocus

                imageFront={require("./images/card.png")}
                imageBack={require("./images/card.png")}

                labelStyle={s.label}
                inputStyle={s.input}
                validColor={"green"}
                invalidColor={"pink"}
                placeholderColor={"darkgray"}

                onChange={this._onChange} />)
        }
      </View>
    );
  }
}
