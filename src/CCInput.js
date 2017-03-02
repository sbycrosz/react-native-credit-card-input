import React, { Component, PropTypes } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

const ss = StyleSheet.create({
  container: {
    marginLeft: 0,
  },
  label: {
    fontWeight: "bold",
  },
  input: {
    height: 36,
    flex: 1,
    color: 'black',
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3'
  }
});

export default class CCInput extends Component {
  static propTypes = {
    field: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    keyboardType: PropTypes.string,

    status: PropTypes.oneOf(["valid", "invalid", "incomplete"]),

    containerStyle: View.propTypes.style,
    inputStyle: Text.propTypes.style,
    labelStyle: Text.propTypes.style,
    validColor: PropTypes.string,
    invalidColor: PropTypes.string,
    placeholderColor: PropTypes.string,

    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    onBecomeEmpty: PropTypes.func,
    onBecomeValid: PropTypes.func,
  };

  static defaultProps = {
    label: "",
    value: "",
    status: "incomplete",
    keyboardType: "numeric",
    containerStyle: {},
    inputStyle: {},
    labelStyle: {},
    onFocus: () => {},
    onChange: () => {},
    onBecomeEmpty: () => {},
    onBecomeValid: () => {},
  };

  componentWillReceiveProps = newProps => {
    const { status, value, onBecomeEmpty, onBecomeValid, field } = this.props;
    const { status: newStatus, value: newValue } = newProps;

    if (value !== "" && newValue === "") onBecomeEmpty(field);
    if (status !== "valid" && newStatus === "valid") onBecomeValid(field);
  };

  focus = () => this.refs.input.focus();

  _onFocus = () => this.props.onFocus(this.props.field);
  _onChange = value => this.props.onChange(this.props.field, value);

  render() {
    const { label, value, placeholder, status, keyboardType,
            containerStyle, inputStyle, labelStyle,
            validColor, invalidColor, placeholderColor } = this.props;
    return (
      <TouchableOpacity onPress={this.focus}
          activeOpacity={0.99}>
        <View style={[ss.container, containerStyle]}>
          { !!label && <Text style={[ss.label, labelStyle]}>{label}</Text>}
          <TextInput ref="input"
              keyboardType={keyboardType}
              autoCapitalise="words"
              autoCorrect={false}
              style={[
                ss.input,
                inputStyle,
                ((validColor && status === "valid") ? { color: validColor } :
                 (invalidColor && status === "invalid") ? { color: invalidColor } :
                 {}),
              ]}
              underlineColorAndroid={"transparent"}
              placeholderColor={placeholderColor}
              placeholder={placeholder}
              value={value}
              onFocus={this._onFocus}
              onChangeText={this._onChange} />
        </View>
      </TouchableOpacity>
    );
  }
}
