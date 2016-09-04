import React, { Component, PropTypes } from 'react';
import ReactNative, {
  View,
  Text,
  StyleSheet,
  Image,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';

import Icons from "./Icons";
import CCInput from "./CCInput";
import { removeNonNumber } from "./Utilities";
import { InjectedProps } from "./connectToState";

const s = StyleSheet.create({
  container: {
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
  },
  icon: {
    alignSelf: "center",
    width: 48,
    height: 40,
    resizeMode: "contain",
  },
  number: {
  },
  rightPart: {
    flexDirection: "row",
    marginLeft: 10,
  },
  last4: {
    flex: 1,
    justifyContent: "center",
  },
  expiry: {
    width: 80,
  },
  cvc: {
    width: 80,
  },
});


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
      placeholders,  values, status,
      onFocus, onChange, onBecomeEmpty, onBecomeValid
    } = this.props;

    return {
      inputStyle, validColor, invalidColor, placeholderColor,
      ref: field, field: field,

      label: "",
      placeholder: placeholders[field],
      value: values[field],
      status: status[field],

      onFocus, onChange, onBecomeEmpty, onBecomeValid,
    }
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
    const showRightPart = (focused === "expiry" || focused === "cvc");

    return (
      <View style={s.container}>
        <View style={[s.number,
          showRightPart ? { width: 1 } : { flex: 1 } ]}>
          <CCInput {...this._inputProps("number")} />
        </View>
        <Image style={s.icon}
            source={{ uri: Icons[this._iconToShow()] }} />
        <View style={[
          s.rightPart,
          showRightPart ? { flex: 1 } : { width: 1 }
        ]}>
          <TouchableOpacity onPress={this._focusNumber}
              style={s.last4}>
            <Text style={inputStyle}>
              { number.substr(number.length - 4, 4) }
            </Text>
          </TouchableOpacity>
          <View style={s.expiry}>
            <CCInput {...this._inputProps("expiry")} />
          </View>
          <View style={s.cvc}>
            <CCInput {...this._inputProps("cvc")} />
          </View>
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
  validColor: "black",
  invalidColor: "red",
  placeholderColor: "gray",
};
