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
import CCFieldValidator from "./CCFieldValidator";

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

    imageFront: PropTypes.number,
    imageBack: PropTypes.number,
    labelStyle: Text.propTypes.style,
    inputStyle: Text.propTypes.style,

    validColor: PropTypes.strong,
    invalidColor: PropTypes.string,
    placeholderColor: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      focused: "",
      values: { number: "", expiry: "", cvc: "" },
      status: { number: "incomplete", expiry: "incomplete", cvc: "incomplete" },
    };
  }

  componentDidMount = () => this.props.autoFocus && this.refs.number.focus();

  _onBecomeEmpty = field => () => {
    if (field === "expiry") this.refs.number.focus();
    if (field === "cvc") this.refs.expiry.focus();
  };

  _onBecomeValid = field => () => {
    if (field === "number") this.refs.expiry.focus();
    if (field === "expiry") this.refs.cvc.focus();
  };

  _onChange = field => value => {
    const values = CCFieldFormatter.formatValues({ ...this.state.values, [field]: value });
    const validation = CCFieldValidator.validateValues(values);
    const newState = { values, ...validation };

    this.setState(newState);
    this.props.onChange && this.props.onChange(newState);
  };

  _onFocus = field => () => {
    this.setState({ focused: field });
    this.refs.Form.scrollTo({ x: SCROLL_POSITIONS[field], animated: true });
  };

  _inputProps = field => {
    const { inputStyle, labelStyle, validColor, invalidColor, placeholderColor } = this.props;

    return {
      inputStyle, labelStyle, validColor, invalidColor, placeholderColor,
      
      ref: field,
      onFocus: this._onFocus(field),
      value: this.state.values[field],
      status: this.state.status[field],

      onChange: this._onChange(field),
      onBecomeEmpty: this._onBecomeEmpty(field),
      onBecomeValid: this._onBecomeValid(field),
    }
  };

  render() {
    const { imageFront, imageBack } = this.props;
    const { values: { number, expiry, cvc }, focused } = this.state;

    return (
      <View style={s.container}>
        <CreditCard focused={focused}
            imageFront={imageFront}
            imageBack={imageBack}
            name=" "
            number={removeNonNumber(number)}
            expiry={expiry}
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
              label="CVC/CCV" />
        </ScrollView>
      </View>
    );
  }
}
