import React, { Component, PropTypes } from 'react';
import ReactNative, {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

import CreditCard from 'react-native-credit-card';
import CCInput from "./CCInput";

import { removeNonNumber } from "./Utilities";
import CCFieldFormatter from "./CCFieldFormatter";

const s = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  form: {
    marginTop: 20,
  },
  error: {
    color: "red",
  },
});

const CVC_INPUT_WIDTH = 70;
const EXPIRY_INPUT_WIDTH = CVC_INPUT_WIDTH;
const CARD_NUMBER_INPUT_WIDTH_OFFSET = 40;
const CARD_NUMBER_INPUT_WIDTH = Dimensions.get("window").width - EXPIRY_INPUT_WIDTH - CARD_NUMBER_INPUT_WIDTH_OFFSET;

const SCROLL_POSITIONS = {
  number: 0,
  expiry: CARD_NUMBER_INPUT_WIDTH,
  cvc: CARD_NUMBER_INPUT_WIDTH + EXPIRY_INPUT_WIDTH,
};

export default class CreditCardForm extends Component {
  static propTypes = {
    autoFocus: PropTypes.bool,

    onChange: PropTypes.func.isRequired,

    labelStyle: Text.propTypes.style,
    inputStyle: Text.propTypes.style,
    placeholderStyle: Text.propTypes.style,
    errorStyle: Text.propTypes.style,
  };

  constructor() {
    super();
    this.state = {
      focused: "",
      values: {
        number: "",
        expiry: "",
        cvc: "",
      },
    };
  }

  _onChange = field => value => {
    const newValues = { ...this.state.values, [field]: value };
    this.setState({ values: CCFieldFormatter.formatValues(newValues) });
  };

  _onFocus = field => () => {
    this.setState({ focused: field });
    this.refs.Form.scrollTo({ x: SCROLL_POSITIONS[field], animated: true });
  };

  _inputProps = field => {
    return {
      ref: field,
      onFocus: this._onFocus(field),
      value: this.state.values[field],
      onChange: this._onChange(field),
    }
  };

  render() {
    const { values: { number, expiration, cvc }, focused } = this.state;

    return (
      <View style={s.container}>
        <CreditCard focused={focused}
            name=" "
            number={removeNonNumber(number)}
            expiration={expiration}
            cvc={cvc}
            shiny={false}
            bar />
        <ScrollView ref="Form"
            horizontal
            keyboardShouldPersistTaps
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            style={s.form}>
          <CCInput {...this._inputProps("number")}
              containerStyle={{ width: CARD_NUMBER_INPUT_WIDTH }}
              label="CARD NUMBER" />
          <CCInput {...this._inputProps("expiry")}
              containerStyle={{ width: EXPIRY_INPUT_WIDTH }}
              label="EXPIRY" />
          <CCInput {...this._inputProps("cvc")}
              containerStyle={{ width: CVC_INPUT_WIDTH }}
              label="CVC" />
        </ScrollView>
      </View>
    );
  }
}
