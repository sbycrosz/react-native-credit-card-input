import React, { Component, PropTypes } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  findNodeHandle
} from "react-native";

import Icons from "./Icons";
import CCInput from "./CCInput";
import { InjectedProps } from "./connectToState";
import _ from 'lodash';

const INFINITE_WIDTH = 1000;

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
    focused: "number",
    invalidColor: "red",
    placeholderColor: "gray",
  };

  shouldComponentUpdate(nextProps, nextState) {
    let diffProps = _.reduce(nextProps, (result, value, key) => {
        return _.isEqual(value, this.props[key]) ?
            result : result.concat(key);
    }, []);

    console.error('CCDEBUG: props changed: ' + JSON.stringify(diffProps));
    let diffState = _.reduce(nextState, (result, value, key) => {
        return _.isEqual(value, this.state[key]) ?
            result : result.concat(key);
    }, []);

    console.error('CCDEBUG: state changed: ' + JSON.stringify(diffState));
    return diffProps.length > 0 || diffState.length > 0;
  }

  componentWillReceiveProps (newProps) {
    if (this.props.focused !== newProps.focused) {
      console.error('CCDEBUG: props changed new focus, call focus');
      this._focus(newProps.focused);
    }

    let diff = _.reduce(newProps, (result, value, key) => {
        return _.isEqual(value, this.props[key]) ?
            result : result.concat(key);
    }, []);
    console.error('CCDEBUG: props changed: ' + JSON.stringify(diff));
  }

  _focusNumber() {
    console.error('CCDEBUG focus number');
    this._focus("number");
  }

  _focusExpiry() {
    console.error('CCDEBUG focus expiry');
    this._focus("expiry");
  };

  _focus(field) {
    console.error('CCDEBUG lite input focus: ' + field);

    if (!field || this.props.focused == field) {
      return;
    }

    console.error('CCDEBUG lite input focus: ' + this[field]);
    this[field].focus();
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
    console.error('CCDEBUG: destructured focused: ' + focused);

    console.error('CCDEBUG: props focused: ' + this.props.focused);
    let showRightPart = !focused || (focused != "number");
    let creditNumberStyle = [];
    let infoStyle = [];
    let onPressFunc = () => {};

    if (showRightPart) {
      creditNumberStyle = [s.hiddenViewStyle, s.leftPart];
      infoStyle = [s.expandedViewStyle, s.rightPart];
      onPressFunc = this._focusNumber.bind(this);
      console.error('CCDEBUG: showRightPart true');
    } else {
      console.error('CCDEBUG: showRightPart false');
      creditNumberStyle = [s.expandedViewStyle, s.leftPart];
      infoStyle = [s.hiddenViewStyle, s.rightPart];
      onPressFunc = this._focusExpiry.bind(this);
    }

    console.error('CCDEBUG number style: ' + JSON.stringify(StyleSheet.flatten(creditNumberStyle)));
    console.error('CCDEBUG info style: ' + JSON.stringify(StyleSheet.flatten(infoStyle)));
    return (
      <View style={s.container}>
        <View style={creditNumberStyle}
              key={'leftSide'}>
          <CCInput {...this._inputProps("number")}
              containerStyle={s.numberInput} />
        </View>
        <TouchableOpacity onPress={onPressFunc}>
          <Image style={s.icon}
                 source={{ uri: Icons[this._iconToShow()] }} />
        </TouchableOpacity>
        <View style={infoStyle}
              key={'rightSide'}>
          <TouchableOpacity onPress={this._focusNumber}
                            style={s.last4}>
            <CCInput field="last4"
                     value={last4Value}
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
  hiddenViewStyle: {
    width: 0,
  },
});
