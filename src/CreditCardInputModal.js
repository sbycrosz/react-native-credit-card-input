import React, { Component, PropTypes } from 'react'
import ReactNative, {
  NativeModules,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView
} from 'react-native';

import CCInput from './CCInput'
import { InjectedProps } from './connectToState'

const s = StyleSheet.create({
  rowInput: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'row'
  },
  rowInputLeft: {
    flex: 1,
    marginRight: 20
  },
  rowInputRight: {
    flex: 1,
    marginLeft: 20
  }
});

const CVC_INPUT_WIDTH = 70;
const EXPIRY_INPUT_WIDTH = CVC_INPUT_WIDTH;
const CARD_NUMBER_INPUT_WIDTH_OFFSET = 40;
const CARD_NUMBER_INPUT_WIDTH = Dimensions.get('window').width - EXPIRY_INPUT_WIDTH - CARD_NUMBER_INPUT_WIDTH_OFFSET;
const NAME_INPUT_WIDTH = CARD_NUMBER_INPUT_WIDTH;
const PREVIOUS_FIELD_OFFSET = 40;
const POSTAL_CODE_INPUT_WIDTH = 120;

/* eslint react/prop-types: 0 */ // https://github.com/yannickcr/eslint-plugin-react/issues/106
export default class CreditCardInputModal extends Component {
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
    bgColor: PropTypes.string,
  };

  componentDidMount = () => this._focus(this.props.focused);

  componentWillReceiveProps = newProps => {
    if (this.props.focused !== newProps.focused) this._focus(newProps.focused);
  };

  _focus = field => {
    if (!field) return;

    const scrollResponder = this.refs.Form.getScrollResponder();
    const nodeHandle = ReactNative.findNodeHandle(this.refs[field]);

    NativeModules.UIManager.measureLayoutRelativeToParent(nodeHandle,
      e => { throw e; },
      x => {
        scrollResponder.scrollTo({ x: Math.max(x - PREVIOUS_FIELD_OFFSET, 0), animated: true });
        this.refs[field].focus();
      });
  }

  _inputProps = field => {
    const {
      inputStyle, labelStyle, validColor, invalidColor, placeholderColor,
      placeholders, labels, values, status,
      onFocus, onChange, onBecomeEmpty, onBecomeValid,
    } = this.props;

    return {
      inputStyle, labelStyle, validColor, invalidColor, placeholderColor,
      ref: field, field,

      label: labels[field],
      placeholder: placeholders[field],
      value: values[field],
      status: status[field],

      onFocus, onChange, onBecomeEmpty, onBecomeValid,
    };
  };

  render() {
    const {
      imageFront, imageBack, cardViewSize, inputContainerStyle, bgColor,
      values: { number, expiry, cvc, name }, focused,
      requiresName, requiresCVC, requiresPostalCode,
    } = this.props;

    return (
      <View>
        <ScrollView ref="Form"
            keyboardShouldPersistTaps='always'
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}>
            <CCInput {...this._inputProps('number')}  />
            <View style={s.rowInput}>
              <View style={s.rowInputLeft}>
                <CCInput {...this._inputProps('expiry')} />
              </View>
              <View style={s.rowInputRight}>
                { requiresCVC && <CCInput {...this._inputProps('cvc')} /> }
                { requiresName && <CCInput {...this._inputProps('name')} keyboardType='default' /> }
              </View>
            </View>
        </ScrollView>
      </View>

    );
  }
}

CreditCardInputModal.defaultProps = {
  cardViewSize: {},
  labels: {
    name: "CARDHOLDER'S NAME",
    number: "CARD NUMBER",
    expiry: "EXPIRY",
    cvc: "CVC/CCV",
    postalCode: "POSTAL CODE",
  },
  placeholders: {
    name: "Full Name",
    number: "1234 5678 1234 5678",
    expiry: "MM/YY",
    cvc: "CVC",
    postalCode: "34567",
  },
  validColor: "",
  invalidColor: "red",
  placeholderColor: "gray",
};
