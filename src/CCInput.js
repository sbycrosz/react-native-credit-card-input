import React, { Component, PropTypes } from 'react';
import ReactNative, {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const ss = StyleSheet.create({
  container: {
    marginLeft: 20,
  },
  label: {
    fontWeight: "bold",
  },
  input: {
    height: 40,
    flex: 1,
  },
});

export default class CCInput extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string,

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

  componentWillReceiveProps = newProps => {
    const { status, value, onBecomeEmpty, onBecomeValid } = this.props;
    const { status: newStatus, value: newValue } = newProps;

    if (value !== "" && newValue === "") onBecomeEmpty();
    if (status !== "valid" && newStatus === "valid") onBecomeValid();
  };

  focus = () => this.refs.input.focus();

  render() {
    const { label, value, placeholder, status,
            containerStyle, inputStyle, labelStyle,
            validColor, invalidColor, placeholderColor,
            onFocus, onChange  } = this.props;
    return (
      <TouchableOpacity onPress={this.focus}
          activeOpacity={0.99}>
        <View style={[ss.container, containerStyle]}>
          <Text style={[ss.label, labelStyle]}>{label}</Text>
          <TextInput ref="input"
              keyboardType="numeric"
              style={[
                ss.input,
                inputStyle,
                (
                  status === "valid" ? { color: validColor } :
                  status === "invalid" ? { color: invalidColor } :
                  {}
                ),
              ]}
              placeholderColor={placeholderColor}
              placeholder={placeholder}
              value={value}
              onFocus={onFocus}
              onChangeText={onChange} />
        </View>
      </TouchableOpacity>
    );
  }
}

CCInput.defaultProps = {
  label: "",
  value: "",
  status: "incomplete",
  containerStyle: {},
  inputStyle: {},
  labelStyle: {},
  onFocus: () => {},
  onChange: () => {},
  onBecomeEmpty: () => {},
  onBecomeValid: () => {},
};
