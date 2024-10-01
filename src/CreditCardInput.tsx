import { useEffect, useRef, type RefObject } from 'react';
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
  numberInputStyle?: TextStyle;
  expiryInputStyle?: TextStyle;
  cvcInputStyle?: TextStyle;
  numberInputRef?: RefObject<TextInput>;
  expiryInputRef?: RefObject<TextInput>;
  cvcInputRef?: RefObject<TextInput>;
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
    numberInputStyle,
    expiryInputStyle,
    cvcInputStyle,
    numberInputRef,
    expiryInputRef,
    cvcInputRef,
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
    onChange = () => {},
    onFocusField = () => {},
    testID,
  } = props;

  const { values, onChangeValue } = useCreditCardForm(onChange);

  const numberInput = useRef<TextInput>(null);

  useEffect(() => {
    if (autoFocus) {
      (numberInputRef)
        ? numberInputRef.current?.focus()
        : numberInput.current?.focus();
    }
  }, [autoFocus]);

  return (
    <View
      style={[s.container, style]}
      testID={testID}
    >
      <View style={[s.numberInput]}>
        <Text style={[s.inputLabel, labelStyle]}>{labels.number}</Text>
        <TextInput
          ref={numberInputRef || numberInput}
          keyboardType="numeric"
          style={[s.input, numberInputStyle]}
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
            ref={expiryInputRef}
            keyboardType="numeric"
            style={[s.input, expiryInputStyle]}
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
            ref={cvcInputRef}
            keyboardType="numeric"
            style={[s.input, cvcInputStyle]}
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
