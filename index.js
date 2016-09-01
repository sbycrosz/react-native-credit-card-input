'use strict';

import React, { Component, PropTypes } from 'react';
import ReactNative, {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import CreditCard from 'react-native-credit-card';

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
const CARD_NUMBER_INPUT_WIDTH = Dimensions.get("window").width - EXPIRY_INPUT_WIDTH;

export default class CreditCardForm extends Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
    skipName: PropTypes.bool,

    onChange: PropTypes.func.isRequired,

    labelStyle: Text.propTypes.style,
    inputStyle: Text.propTypes.style,
    placeholderStyle: Text.propTypes.style,
    errorStyle: Text.propTypes.style,
  };

  constructor() {
    super();
    this.state = {};
  }

  _scrollTo = xPosition => () => {
    this.refs.Form.scrollTo({ x: xPosition, animated: true });
  };

  render() {
    return (
      <View style={s.container}>
        <CreditCard
            shiny={false}
            bar
            focused="number"
            number="42"
            name=" "
            expiry="04/12"
            cvc="042"/>
        <ScrollView ref="Form"
            horizontal
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            style={s.form}>
          <CCInput ref="cardNumber"
              onFocus={this._scrollTo(0)}
              containerStyle={{ width: CARD_NUMBER_INPUT_WIDTH }}
              label="CARD NUMBER" />
          <CCInput ref="expiry"
              onFocus={this._scrollTo(CARD_NUMBER_INPUT_WIDTH)}
              containerStyle={{ width: EXPIRY_INPUT_WIDTH }}
              label="EXPIRY" />
          <CCInput ref="cvc"
              onFocus={this._scrollTo(CARD_NUMBER_INPUT_WIDTH + EXPIRY_INPUT_WIDTH)}
              containerStyle={{ width: CVC_INPUT_WIDTH }}
              label="CVC" />
        </ScrollView>
      </View>
    );
  }
}

const ss = StyleSheet.create({
  container: {
    marginLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  label: {
    fontWeight: "bold",
  },
  input: {
    height: 40,
    flex: 1,
  },
});

class CCInput extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    containerStyle: View.propTypes.style,
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
  };

  focus = () => this.refs.input.focus();

  render() {
    const { label, value, containerStyle, onFocus, onChange } = this.props;
    return (
      <TouchableOpacity onPress={this.focus}
          activeOpacity={0.99}>
        <View style={[ss.container, containerStyle]}>
          <Text style={[ss.label]}>{label}</Text>
          <TextInput ref="input"
              style={[ss.input]}
              value={value}
              onFocus={onFocus}
              onChange={onChange} />
        </View>
      </TouchableOpacity>
    );
  }
}
