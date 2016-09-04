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
import { InjectedProps } from "./connectToState";

const s = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  form: {
    marginTop: 20,
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

export default class CreditCardInput extends Component {
  static propTypes = {
    ...InjectedProps,

    labels: PropTypes.object,
    placeholders: PropTypes.object,

    cardViewSize: PropTypes.object,
    imageFront: PropTypes.number,
    imageBack: PropTypes.number,
    labelStyle: Text.propTypes.style,
    inputStyle: Text.propTypes.style,
    inputContainerStyle: View.propTypes.style,

    validColor: PropTypes.string,
    invalidColor: PropTypes.string,
    placeholderColor: PropTypes.string,
  };

  componentDidMount = () => this._focus(this.props.focused);

  componentWillReceiveProps = newProps => {
    if (this.props.focused !== newProps.focused) this._focus(newProps.focused);
  };

  _focus = field => {
    if (!field) return;
    this.refs.Form.scrollTo({ x: SCROLL_POSITIONS[field], animated: true });
    this.refs[field].focus();
  }

  _inputProps = field => {
    const {
      inputStyle, labelStyle, validColor, invalidColor, placeholderColor,
      placeholders, labels, values, status,
      onFocus, onChange, onBecomeEmpty, onBecomeValid
    } = this.props;

    return {
      inputStyle, labelStyle, validColor, invalidColor, placeholderColor,
      ref: field, field: field,

      label: labels[field],
      placeholder: placeholders[field],
      value: values[field],
      status: status[field],

      onFocus, onChange, onBecomeEmpty, onBecomeValid,
    }
  };

  render() {
    const {
      imageFront, imageBack, cardViewSize, inputContainerStyle,
      values: { number, expiry, cvc }, focused
    } = this.props;

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

CreditCardInput.defaultProps = {
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
