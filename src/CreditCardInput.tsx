import { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import {
  useCreditCardForm,
  type CreditCardFormData,
  type CreditCardFormField,
} from './useCreditCardForm';

interface Props {
  autoFocus?: boolean;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  placeholderColor?: string;
  labels?: {
    number: string;
    expiry: string;
    cvc: string;
  };
  placeholders?: {
    number: string;
    expiry: string;
    cvc: string;
  };
  onChange: (formData: CreditCardFormData) => void;
  onFocusField?: (field: CreditCardFormField) => void;
  testID?: string;
}

const s = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  icon: {
    width: 48,
    height: 40,
    resizeMode: 'contain',
  },
  numberInput: {},
  extraContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  expiryInputContainer: {
    flex: 1,
    marginRight: 5,
  },
  cvcInputContainer: {
    flex: 1,
    marginLeft: 5,
  },
  input: {
    height: 40,
    fontSize: 16,
    borderBottomColor: 'darkgray',
    borderBottomWidth: 1,
    // @ts-expect-error outlineWidth is used to hide the text-input outline on react-native-web
    outlineWidth: 0,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 600,
  },
});

const CreditCardInput = (props: Props) => {
  const {
    autoFocus,
    style,
    labelStyle,
    inputStyle,
    placeholderColor = 'darkgray',
    labels = {
      number: 'CARD NUMBER',
      expiry: 'EXPIRY',
      cvc: 'CVC/CVV',
    },
    placeholders = {
      number: '1234 5678 1234 5678',
      expiry: 'MM/YY',
      cvc: 'CVC',
    },
    onChange,
    onFocusField = () => {},
    testID,
  } = props;

  const { values, onChangeValue } = useCreditCardForm(onChange);

  const numberInput = useRef<TextInput>(null);

  useEffect(() => {
    if (autoFocus) numberInput.current?.focus();
  }, [autoFocus]);

  return (
    <View
      style={[s.container, style]}
      testID={testID}
    >
      <View style={[s.numberInput]}>
        <Text style={[s.inputLabel, labelStyle]}>{labels.number}</Text>
        <TextInput
          ref={numberInput}
          keyboardType="numeric"
          autoComplete="cc-number"
          style={[s.input, inputStyle]}
          placeholderTextColor={placeholderColor}
          placeholder={placeholders.number}
          value={values.number}
          onChangeText={(v) => onChangeValue('number', v)}
          onFocus={() => onFocusField('number')}
          autoCorrect={false}
          underlineColorAndroid={'transparent'}
          testID="CC_NUMBER"
        />
      </View>

      <View style={[s.extraContainer]}>
        <View style={s.expiryInputContainer}>
          <Text style={[s.inputLabel, labelStyle]}>{labels.expiry}</Text>
          <TextInput
            keyboardType="numeric"
            autoComplete="cc-exp"
            style={[s.input, inputStyle]}
            placeholderTextColor={placeholderColor}
            placeholder={placeholders.expiry}
            value={values.expiry}
            onChangeText={(v) => onChangeValue('expiry', v)}
            onFocus={() => onFocusField('expiry')}
            autoCorrect={false}
            underlineColorAndroid={'transparent'}
            testID="CC_EXPIRY"
          />
        </View>

        <View style={s.cvcInputContainer}>
          <Text style={[s.inputLabel, labelStyle]}>{labels.cvc}</Text>
          <TextInput
            keyboardType="numeric"
            autoComplete="cc-csc"
            style={[s.input, inputStyle]}
            placeholderTextColor={placeholderColor}
            placeholder={placeholders.cvc}
            value={values.cvc}
            onChangeText={(v) => onChangeValue('cvc', v)}
            onFocus={() => onFocusField('cvc')}
            autoCorrect={false}
            underlineColorAndroid={'transparent'}
            testID="CC_CVC"
          />
        </View>
      </View>
    </View>
  );
};

export default CreditCardInput;
