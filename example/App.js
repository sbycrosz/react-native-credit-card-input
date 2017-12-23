import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
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

const USE_LITE_CREDIT_CARD_INPUT = false;

export default class Example extends Component {
  _onChange = (formData) => {
    console.log(JSON.stringify(formData, null, " "));
  };

  _onFocus = (field) => {
    console.log(field);
  };

  render() {
    return (
      <View style={s.container}>
        { USE_LITE_CREDIT_CARD_INPUT ?
          (
            <LiteCreditCardInput
              autoFocus
              inputStyle={s.input}

              validColor={"black"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}

              onFocus={this._onFocus}
              onChange={this._onChange} />
          ) : (
            <CreditCardInput
              autoFocus

              requiresName
              requiresCVC
              requiresPostalCode

              labelStyle={s.label}
              inputStyle={s.input}
              validColor={"black"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}

              onFocus={this._onFocus}
              onChange={this._onChange} />
          )
        }
      </View>
    );
  }
}
