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

    labels: PropTypes.shape({
      number: PropTypes.string,
      expiry: PropTypes.string,
      cvc: PropTypes.string,
    }),
    placeholders: PropTypes.shape({
      number: PropTypes.string,
      expiry: PropTypes.string,
      cvc: PropTypes.string,
    }),

    cardViewSize: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
    }),
    imageFront: PropTypes.number,
    imageBack: PropTypes.number,
    labelStyle: Text.propTypes.style,
    inputStyle: Text.propTypes.style,
    inputContainerStyle: View.propTypes.style,

    validColor: PropTypes.string,
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
    this.props.onChange(newState);
  };

  _onFocus = field => () => {
    this.setState({ focused: field });
    this.refs.Form.scrollTo({ x: SCROLL_POSITIONS[field], animated: true });
  };

  _inputProps = field => {
    const {
      inputStyle, labelStyle, validColor, invalidColor, placeholderColor,
      placeholders, labels,
    } = this.props;

    return {
      inputStyle, labelStyle, validColor, invalidColor, placeholderColor,

      ref: field,

      label: labels[field],
      placeholder: placeholders[field],

      onFocus: this._onFocus(field),
      value: this.state.values[field],
      status: this.state.status[field],

      onChange: this._onChange(field),
      onBecomeEmpty: this._onBecomeEmpty(field),
      onBecomeValid: this._onBecomeValid(field),
    }
  };

  render() {
    const { imageFront, imageBack, cardViewSize, inputContainerStyle } = this.props;
    const { values: { number, expiry, cvc }, focused } = this.state;

    return (
      <View style={s.container}>
        <CreditCard focused={focused}
            {...cardViewSize}
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
              containerStyle={[inputContainerStyle, { width: CARD_NUMBER_INPUT_WIDTH }]} />
          <CCInput {...this._inputProps("expiry")}
              containerStyle={[inputContainerStyle, { width: EXPIRY_INPUT_WIDTH }]} />
          <CCInput {...this._inputProps("cvc")}
              containerStyle={[inputContainerStyle, { width: CVC_INPUT_WIDTH }]} />
        </ScrollView>
      </View>
    );
  }
}

CreditCardForm.defaultProps = {
  autoFocus: false,
  onChange: () => {},
  cardViewSize: {},
  labels: {
    number: "CARD NUMBER",
    expiry: "EXPIRY",
    cvc: "CVC/CCV",
  },
  placeholders: {
    number: "1234 5678 1234 5678",
    expiry: "MM/YY",
    cvc: "CVC",
  },
  inputContainerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  validColor: "black",
  invalidColor: "red",
  placeholderColor: "gray",
};
