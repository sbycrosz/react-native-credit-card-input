import React, { Component, PropTypes } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  LayoutAnimation,
  TouchableOpacity,
} from "react-native";

import Icons from "./Icons";
import CCInput from "./CCInput";
import { InjectedProps } from "./connectToState";

const INFINITE_WIDTH = 1000;

const s = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  icon: {
    width: 48,
    height: 40,
    resizeMode: "contain",
  },
  expanded: {
    flex: 1,
  },
  hidden: {
    width: 0,
  },
  leftPart: {
    overflow: "hidden",
  },
  rightPart: {
    overflow: "hidden",
    justifyContent: 'center',
    flexDirection: "row",
  },
  last4: {
    flex: 1,
    justifyContent: "center",
  },
  numberInput: {
    width: INFINITE_WIDTH,
    marginLeft: 20,
  },
  expiryInput: {
    width: 60,
  },
  cvcInput: {
    width: 40,
  },
  last4Input: {
    width: 60,
    marginLeft: 20,
  },
  zipInput: {
    width: 60,
  },
  input: {
    height: 40,
    color: "black",
  },
});

/* eslint react/prop-types: 0 */ // https://github.com/yannickcr/eslint-plugin-react/issues/106
export default class LiteCreditCardInput extends Component {
  static propTypes = {
    ...InjectedProps,

    placeholders: PropTypes.object,

    inputStyle: Text.propTypes.style,

    validColor: PropTypes.string,
    invalidColor: PropTypes.string,
    placeholderColor: PropTypes.string,
  };

  static defaultProps = {
    placeholders: {
      number: "1234 5678 1234 5678",
      expiry: "MM/YY",
      cvc: "CVC",
      postalCode: "ZIP",
    },
    validColor: "",
    invalidColor: "red",
    placeholderColor: "gray",
  };

  componentDidMount = () => {
    this._focus("number");
  }

  componentWillReceiveProps = newProps => {
    if (this.props.focused !== newProps.focused) this._focus(newProps.focused);
  };

  _focusNumber = () => this._focus("number");
  _focusExpiry = () => this._focus("expiry");

  _focus = field => {
    if (!field) return;
    this.refs[field].focus();
    LayoutAnimation.easeInEaseOut();
  }

  _inputProps = field => {
    const {
      inputStyle, validColor, invalidColor, placeholderColor,
      placeholders, values, status,
      onFocus, onChange, onBecomeEmpty, onBecomeValid,
    } = this.props;


    return {
      inputStyle: [s.input, inputStyle],
      validColor, invalidColor, placeholderColor,
      ref: field, field,

      placeholder: placeholders[field],
      value: values[field],
      status: status[field],
      keyboardType: field === "postalCode" ? "numbers-and-punctuation" : "numeric",
      _handleSubmit: this.props._handleSubmit,

      onFocus, onChange, onBecomeEmpty, onBecomeValid,
    };
  };

  _iconToShow = () => {
    const { focused, values: { type } } = this.props;
    if (focused === "cvc" && type === "american-express") return "cvc_amex";
    if (focused === "cvc") return "cvc";
    if (type) return type;
    return "placeholder";
  }

  render() {
    const { focused, values: { number }, inputStyle, status: { number: numberStatus } } = this.props;
    const showRightPart = focused && focused !== "number";

    return (
      <View style={s.container}>
        <View style={[
          s.leftPart,
          showRightPart ? s.hidden : s.expanded,
        ]}>
          <CCInput {...this._inputProps("number")}
              containerStyle={s.numberInput} />
        </View>
        <TouchableOpacity onPress={showRightPart ? this._focusNumber : this._focusExpiry }>
          <Image style={s.icon}
              source={{ uri: Icons[this._iconToShow()] }} />
        </TouchableOpacity>
        <View style={[
          s.rightPart,
          showRightPart ? s.expanded : s.hidden,
        ]}>
            <TouchableOpacity onPress={this._focusNumber}
            style={s.last4}>
              <CCInput field="last4"
                  value={ numberStatus === "valid" ? number.substr(number.length - 4, 4) : "" }
                  onFocus={this._focusNumber}
                  inputStyle={[s.input, inputStyle]}
                  containerStyle={[s.last4Input]} />
                  </TouchableOpacity>
          <CCInput {...this._inputProps("expiry")}
              containerStyle={s.expiryInput} />
          <CCInput {...this._inputProps("cvc")}
              containerStyle={s.cvcInput} />
          <CCInput {...this._inputProps("postalCode")}
              containerStyle={s.zipInput} />
        </View>
      </View>
    );
  }
}
