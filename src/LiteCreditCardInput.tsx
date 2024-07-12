import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Image,
  LayoutAnimation,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import Icons from './Icons';
import {
  useCreditCardForm,
  type CreditCardFormData,
  type CreditCardFormField,
} from './useCreditCardForm';

interface Props {
  autoFocus?: boolean;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  placeholderColor: string;
  placeholders?: {
    number: string;
    expiry: string;
    cvc: string;
  };
  onChange?: (formData: CreditCardFormData) => void;
  onFocusField?: (field: CreditCardFormField) => void;
}

const s = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  icon: {
    width: 48,
    height: 40,
    resizeMode: 'contain',
  },
  expanded: {
    flex: 1,
  },
  hidden: {
    width: 0,
  },
  leftPart: {
    overflow: 'hidden',
  },
  rightPart: {
    overflow: 'hidden',
    flexDirection: 'row',
  },
  last4: {
    flex: 1,
    justifyContent: 'center',
  },
  numberInput: {
    width: 1000,
  },
  expiryInput: {
    width: 80,
  },
  cvcInput: {
    width: 80,
  },
  last4Input: {
    width: 60,
    marginLeft: 20,
  },
  input: {
    height: 40,
    fontSize: 16,
    color: 'black',
  },
});

const LiteCreditCardInput = (props: Props) => {
  const {
    autoFocus = false,
    style,
    inputStyle,
    placeholderColor,
    placeholders = {
      number: '1234 5678 1234 5678',
      expiry: 'MM/YY',
      cvc: 'CVC',
    },
    onChange = () => {},
    onFocusField = () => {},
  } = props;

  const _onChange = (formData: CreditCardFormData): void => {
    // Focus next field when number/expiry field become valid
    if (status.number !== 'valid' && formData.status.number === 'valid') {
      toggleFormState();
      expiryInput.current?.focus();
    }

    if (status.expiry !== 'valid' && formData.status.expiry === 'valid') {
      cvcInput.current?.focus();
    }

    onChange(formData);
  };

  const { values, status, onChangeValue } = useCreditCardForm(_onChange);

  const [showRightPart, setShowRightPart] = useState(false);

  const toggleFormState = useCallback(() => {
    LayoutAnimation.easeInEaseOut();
    setShowRightPart((v) => !v);
  }, []);

  const numberInput = useRef<TextInput>(null);
  const expiryInput = useRef<TextInput>(null);
  const cvcInput = useRef<TextInput>(null);

  useEffect(() => {
    if (autoFocus) numberInput.current?.focus();
  }, [autoFocus]);

  const cardIcon = useMemo(() => {
    if (values.type && Icons[values.type]) return Icons[values.type];
    return Icons.placeholder;
  }, [values.type]);

  return (
    <View style={[s.container, style]}>
      <View style={[s.leftPart, showRightPart ? s.hidden : s.expanded]}>
        <View style={[s.numberInput]}>
          <TextInput
            ref={numberInput}
            keyboardType="numeric"
            style={[s.input, inputStyle]}
            placeholderTextColor={placeholderColor}
            placeholder={placeholders.number}
            value={values.number}
            onChangeText={(v) => onChangeValue('number', v)}
            onFocus={() => onFocusField('number')}
            autoCorrect={false}
            underlineColorAndroid={'transparent'}
          />
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={toggleFormState}
      >
        <Image
          style={s.icon}
          source={{ uri: cardIcon }}
        />
      </TouchableOpacity>

      <View style={[s.rightPart, showRightPart ? s.expanded : s.hidden]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={toggleFormState}
          style={s.last4}
        >
          <View pointerEvents={'none'}>
            <TextInput
              keyboardType="numeric"
              value={
                status.number === 'valid'
                  ? values.number.slice(values.number.length - 4)
                  : ''
              }
              style={[s.input, s.last4Input]}
              readOnly
            />
          </View>
        </TouchableOpacity>

        <View style={s.expiryInput}>
          <TextInput
            ref={expiryInput}
            keyboardType="numeric"
            style={[s.input, inputStyle]}
            placeholderTextColor={placeholderColor}
            placeholder={placeholders.expiry}
            value={values.expiry}
            onChangeText={(v) => onChangeValue('expiry', v)}
            onFocus={() => onFocusField('expiry')}
            autoCorrect={false}
            underlineColorAndroid={'transparent'}
          />
        </View>

        <View style={s.cvcInput}>
          <TextInput
            ref={cvcInput}
            keyboardType="numeric"
            style={[s.input, inputStyle]}
            placeholderTextColor={placeholderColor}
            placeholder={placeholders.cvc}
            value={values.cvc}
            onChangeText={(v) => onChangeValue('cvc', v)}
            onFocus={() => onFocusField('cvc')}
            autoCorrect={false}
            underlineColorAndroid={'transparent'}
          />
        </View>
      </View>
    </View>
  );
};

export default LiteCreditCardInput;
