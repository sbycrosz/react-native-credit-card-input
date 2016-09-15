import React, { Component, PropTypes } from "react";
import {
  View,
  Text,
  TextInput,
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
    flexDirection: "row",
    marginLeft: 10,
  },
  last4: {
    flex: 1,
    justifyContent: "center",
  },
  numberInput: {
    width: INFINITE_WIDTH,
  },
  expiryInput: {
    width: 80,
  },
  cvcInput: {
    width: 80,
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

  componentDidMount = () => this._focus(this.props.focused);

  componentWillReceiveProps = newProps => {
    if (this.props.focused !== newProps.focused) this._focus(newProps.focused);
  };

  _focusNumber = () => this._focus("number");

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
      inputStyle, validColor, invalidColor, placeholderColor,
      ref: field, field,

      placeholder: placeholders[field],
      value: values[field],
      status: status[field],

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
    const { focused, values: { number }, inputStyle } = this.props;
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
        <Image style={s.icon}
            source={{ uri: Icons[this._iconToShow()] }} />
        <View style={[
          s.rightPart,
          showRightPart ? s.expanded : s.hidden,
        ]}>
          <TouchableOpacity onPress={this._focusNumber}
              style={s.last4}>
            <View pointerEvents={"none"}>
              <TextInput editable={false}
                  underlineColorAndroid={"transparent"}
                  style={[inputStyle]}
                  value={ number ? number.substr(number.length - 4, 4) : "" } />
            </View>
          </TouchableOpacity>
          <CCInput {...this._inputProps("expiry")}
              containerStyle={s.expiryInput} />
          <CCInput {...this._inputProps("cvc")}
              containerStyle={s.cvcInput} />
        </View>
      </View>
    );
  }
}

LiteCreditCardInput.defaultProps = {
  placeholders: {
    number: "1234 5678 1234 5678",
    expiry: "MM/YY",
    cvc: "CVC",
  },
  validColor: "",
  invalidColor: "red",
  placeholderColor: "gray",
};
