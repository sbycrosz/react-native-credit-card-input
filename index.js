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
const CARD_NUMBER_INPUT_WIDTH = Dimensions.get("window").width - EXPIRY_INPUT_WIDTH;

import valid from "card-validator";

const removeNonNumber = string => string.replace(/[^\d]/g, "");
const limitLength = (string, maxLength) => string.substr(0, maxLength);
const addGaps = (string, gaps) => {
  var offsets = [0].concat(gaps).concat([string.length]);

  return offsets.map((end, index) => {
    if (index === 0) return "";
    const start = offsets[index - 1];
    return string.substr(start, end - start);
  }).filter(part => part !== "").join(" ");
};

const CCFieldFormatter = {
  formatValues: function(values) {
    return {
      number: this._formatNumber(values.number),
      expiry: this._formatExpiry(values.expiry),
      cvc: this._formatCVC(values.cvc),
    };
  },

  _formatNumber: value => {
    const numberSanitized = removeNonNumber(value);
    const card = valid.number(numberSanitized).card || { gaps: [4, 8, 12], lengths: [16] };
    const maxLength = card.lengths[card.lengths.length - 1];
    const lengthSanitized = limitLength(numberSanitized, maxLength);
    const formatted = addGaps(lengthSanitized, card.gaps);
    return formatted;
  },
  _formatExpiry: value => {
    const sanitized = limitLength(removeNonNumber(value), 4);
    if (sanitized.match(/^[2-9]$/)) { return `0${sanitized}`; }
    if (sanitized.length > 2) { return `${sanitized.substr(0, 2)}/${sanitized.substr(2, sanitized.length)}`; }
    return sanitized;
  },
  _formatCVC: value => {
    const numberSanitized = removeNonNumber(value);
    return limitLength(numberSanitized, 4)
  },
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
    this._scrollTo(field);
  };

  _scrollTo = field => {
    const xPosition = (field === "number") ? 0 :
                      (field === "expiry") ? CARD_NUMBER_INPUT_WIDTH :
                      CARD_NUMBER_INPUT_WIDTH + EXPIRY_INPUT_WIDTH;
    this.refs.Form.scrollTo({ x: xPosition, animated: true });
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
