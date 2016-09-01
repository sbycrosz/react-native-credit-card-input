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

export default class CCInput extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    containerStyle: View.propTypes.style,
    inputStyle: Text.propTypes.style,
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
  };

  focus = () => this.refs.input.focus();

  render() {
    const { label, value, containerStyle, onFocus, onChange, inputStyle } = this.props;
    return (
      <TouchableOpacity onPress={this.focus}
          activeOpacity={0.99}>
        <View style={[ss.container, containerStyle]}>
          <Text style={[ss.label]}>{label}</Text>
          <TextInput ref="input"
              keyboardType="numeric"
              style={[ss.input, inputStyle]}
              value={value}
              onFocus={onFocus}
              onChangeText={onChange} />
        </View>
      </TouchableOpacity>
    );
  }
}
