import React, { Component, PropTypes } from 'react'
import ReactNative, {
  NativeModules,
  View,
  Text,
  StyleSheet
} from 'react-native';
import { removeNonNumber } from './Utilities'
import CCInput from './CCInput'
import { InjectedProps } from './connectToState'
import CreditCard from 'react-native-credit-card'
const s = StyleSheet.create({
  container: {
    flex: 1
  },
  cardView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    marginTop: 20
  },
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

export default class CreditCardInput extends Component {
  static propTypes = {
    ...InjectedProps,
    creditCard: PropTypes.bool,
    labels: PropTypes.object,
    placeholders: PropTypes.object,

    cardViewSize: PropTypes.object,
    imageFront: PropTypes.number,
    imageBack: PropTypes.number,
    labelStyle: Text.propTypes.style,
    inputStyle: Text.propTypes.style,
    inputContainerStyle: View.propTypes.style,
    containerStyle: View.propTypes.style,

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

    const nodeHandle = ReactNative.findNodeHandle(this.refs[field]);

    NativeModules.UIManager.measureLayoutRelativeToParent(nodeHandle,
      e => { throw e; },
      x => {
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
      imageFront, imageBack, cardViewSize, inputContainerStyle, containerStyle, bgColor,
      values: { number, expiry, cvc, name }, focused,
      requiresName, requiresCVC, requiresPostalCode,
    } = this.props;

    return (
      <View style={[s.container, containerStyle]}>
        {
          this.props.creditCard ? (
            <View style={s.cardView}>
              <CreditCard
                {...cardViewSize}
                focused={focused}
                bgColor={bgColor}
                imageFront={imageFront}
                imageBack={imageBack}
                name={requiresName ? name : ' ' }
                number={removeNonNumber(number)}
                expiry={expiry}
                cvc={cvc}
                shiny={false}
                clickable={false}
                bar />
            </View>
          ) : null
        }
          <View style={s.form}>
            <CCInput {...this._inputProps('number')} inputStyle={inputContainerStyle}  />
            <View style={s.rowInput}>
              <View style={s.rowInputLeft}>
                <CCInput {...this._inputProps('expiry')} inputStyle={inputContainerStyle}/>
              </View>
              <View style={s.rowInputRight}>
                { requiresCVC && <CCInput {...this._inputProps('cvc')} inputStyle={inputContainerStyle}/> }
                { requiresName && <CCInput {...this._inputProps('name')} keyboardType='default' inputStyle={inputContainerStyle}/> }
              </View>
            </View>
          </View>
      </View>
    );
  }
}

CreditCardInput.defaultProps = {
  creditCard: true,
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
