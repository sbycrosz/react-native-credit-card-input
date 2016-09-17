import React, { Component } from "react";
import {
  StyleSheet,
  View,
} from "react-native";

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

const SCREEN_IS_TOO_SMALL = false;

export default class Example extends Component {
  _onChange = formData => {
    /* eslint no-console: 0 */
    console.log(JSON.stringify(formData, null, " "));
  };

  _onFocus = field => {
    /* eslint no-console: 0 */
    console.log(field);
  };

  render() {
    return (
      <View style={s.container}>
        { SCREEN_IS_TOO_SMALL ?
          (<LiteCreditCardInput
              autoFocus
              inputStyle={s.input}

              validColor={"black"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}

              onFocus={this._onFocus}
              onChange={this._onChange} />) :
            (<CreditCardInput
                autoFocus

                requiresName
                imageFront={require("./images/card.png")}
                imageBack={require("./images/card.png")}

                labelStyle={s.label}
                inputStyle={s.input}
                validColor={"black"}
                invalidColor={"red"}
                placeholderColor={"darkgray"}

                onFocus={this._onFocus}
                onChange={this._onChange} />)
        }
      </View>
    );
  }
}
