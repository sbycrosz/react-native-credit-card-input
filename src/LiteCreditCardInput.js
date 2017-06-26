import React, { Component, PropTypes } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  LayoutAnimation,
  findNodeHandle,
  TextInput,
  Platform,
} from "react-native";

import Icons from "./Icons";
import CCInput from "./CCInput";
import { SharedProps } from "./CreditCardInput";
import _ from 'lodash';

const INFINITE_WIDTH = 1000;

/* eslint react/prop-types: 0 */ // https://github.com/yannickcr/eslint-plugin-react/issues/106
export default class LiteCreditCardInput extends Component {
  static propTypes = {
    ...SharedProps,

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
    focused: "number",
    invalidColor: "red",
    placeholderColor: "gray",
  };

  shouldComponentUpdate(nextProps, nextState) {
    let diffProps = _.reduce(nextProps, (result, value, key) => {
        return _.isEqual(value, this.props[key]) ?
            result : result.concat(key);
    }, []);

    let diffState = _.reduce(nextState, (result, value, key) => {
        return _.isEqual(value, this.state[key]) ?
            result : result.concat(key);
    }, []);

    return diffProps.length > 0 || diffState.length > 0;
  }

  componentWillReceiveProps (newProps) {
    if (this.props.focused !== newProps.focused) {
      this._focus(newProps.focused);
    }
  }

  _focusNumber() {
    this._focus("number");
  }

  _focusExpiry() {
    this._focus("expiry");
  };

  _focus(field) {

    if (!field || this.props.focused == field) {
      return;
    }

    this[field].focus();
    LayoutAnimation.easeInEaseOut();
  }

  _handleSubmit() {
    this.props._handleSubmit(this);
  }

  _inputProps(field) {
    const {
      inputStyle, validColor, invalidColor, placeholderColor,
      placeholders, values, status,
      onFocus, onChange, onBecomeEmpty, onBecomeValid,
    } = this.props;


    return {
      inputStyle: [s.input, inputStyle],
      validColor: validColor,
      invalidColor: invalidColor,
      placeholderColor: placeholderColor,
      ref: (ref) => {this[field] = ref},
      field: field,
      placeholder: placeholders[field],
      value: values[field] ? values[field] : "",
      status: status[field],
      keyboardType: field === "postalCode" ? "numbers-and-punctuation" : "numeric",
      _handleSubmit: this._handleSubmit.bind(this),
      key: field,
      onFocus: onFocus,
      onChange: onChange,
      onBecomeEmpty: onBecomeEmpty,
      onBecomeValid: onBecomeValid,
    };
  };

  _iconToShow() {
    const { focused, values: { type } } = this.props;
    if (focused === "cvc" && type === "american-express") return "cvc_amex";
    if (focused === "cvc") return "cvc";
    if (type) return type;
    return "placeholder";
  }

  render() {
    let { focused, values: { number }, inputStyle, status: { number: numberStatus } } = this.props;
    let last4Value = numberStatus == "valid" ? number.substr(number.length - 4, 4) : "";

    let showRightPart = !focused || (focused != "number");
    let creditNumberStyle = [];
    let infoStyle = [];
    let onPressFunc = () => {};

    if (showRightPart) {
      creditNumberStyle = [s.leftPart, {position:'absolute', flex: 1, left:0, opacity:0}];
      infoStyle = [s.rightPart, {flex: 1, position:'relative', opacity:1}];
      onPressFunc = this._focusNumber.bind(this);
    } else {
      creditNumberStyle = [s.leftPart, {marginLeft: 20, flex: 1, position:'relative', opacity:1}];
      infoStyle = [s.rightPart, {position:'absolute', flex: 1, right:0, opacity:0}];
      onPressFunc = this._focusExpiry.bind(this);
    }

    return (
      <View style={s.container}>
        <CCInput {...this._inputProps("number")}
            containerStyle={[s.numberInput, creditNumberStyle]}
            key={'leftSide'}/>
        <TouchableOpacity onPress={onPressFunc}>
          <Image style={s.icon}
                 source={{ uri: Icons[this._iconToShow()] }} />
        </TouchableOpacity>
        <View style={infoStyle}
              key={'rightSide'}>
          <TouchableOpacity onPress={this._focusNumber.bind(this)}
                            style={s.last4}>
            <View style={s.last4Input}>
              <TextInput style={[s.input, s.last4Text, inputStyle]}
                         value={last4Value}
                         editable={false}/>
            </View>
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
  expandedViewStyle: {
    flex: 1,
  },
  hiddenViewStyle: {
    width: 0,
  },
  leftPart: {
    overflow: "hidden",
  },
  rightPart: {
    overflow: "hidden",
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: "row",
  },
  last4: {
    flex: 1,
    justifyContent: "center",
  },
  numberInput: {
    width: INFINITE_WIDTH,
  },
  expiryInput: {
    ...Platform.select({
      android: {},
      ios: {
        width: 60,
      }
    })
  },
  cvcInput: {
    ...Platform.select({
      android: {},
      ios: {
        width: 40,
      }
    })
  },
  last4Input: {
    width: 60,
    flexGrow:0,
    // marginLeft: 10,
  },
  last4Text: {
    color: "black",
    fontSize: 14,
  },
  zipInput: {
    ...Platform.select({
      android: {},
      ios: {
        width: 60,
      }
    })
  },
  input: {
    height: 40,
    color: "black",
  },
});
