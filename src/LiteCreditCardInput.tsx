import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject
} from 'react';
import {
  Image,
  LayoutAnimation,
  Pressable,
  StyleSheet,
  TextInput,
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
  numberInputStyle?: TextStyle;
  expiryInputStyle?: TextStyle;
  cvcInputStyle?: TextStyle;
  numberInputRef?: RefObject<TextInput>;
  expiryInputRef?: RefObject<TextInput>;
  cvcInputRef?: RefObject<TextInput>;
  placeholderColor?: string;
  placeholders?: {
    number: string;
    expiry: string;
    cvc: string;
  };
  onChange?: (formData: CreditCardFormData) => void;
  onFocusField?: (field: CreditCardFormField) => void;
  testID?: string;
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
    // @ts-expect-error outlineWidth is used to hide the text-input outline on react-native-web
    outlineWidth: 0,
  },
});

const LiteCreditCardInput = (props: Props) => {
  const {
    autoFocus = false,
    style,
    numberInputStyle,
    expiryInputStyle,
    cvcInputStyle,
    numberInputRef,
    expiryInputRef,
    cvcInputRef,
    placeholderColor = 'darkgray',
    placeholders = {
      number: '1234 5678 1234 5678',
      expiry: 'MM/YY',
      cvc: 'CVC',
    },
    onChange = () => {},
    onFocusField = () => {},
    testID,
  } = props;

  const _onChange = (formData: CreditCardFormData): void => {
    // Focus next field when number/expiry field become valid
    if (status.number !== 'valid' && formData.status.number === 'valid' &&
      (formData.status.expiry === "incomplete" || formData.status.expiry === "invalid")) {
        toggleFormState();
        (expiryInputRef) ? expiryInputRef.current?.focus() : expiryInput.current?.focus();
    }

    if (status.expiry !== 'valid' && formData.status.expiry === 'valid' &&
      (formData.status.cvc === "incomplete" || formData.status.cvc === "invalid")) {
        (cvcInputRef) ? cvcInputRef.current?.focus() : cvcInput.current?.focus();
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
    if (autoFocus) {
      (numberInputRef)
        ? numberInputRef.current?.focus()
        : numberInput.current?.focus();
    }
  }, [autoFocus]);

  const cardIcon = useMemo(() => {
    if (values.type && Icons[values.type]) return Icons[values.type];
    return Icons.placeholder;
  }, [values.type]);

  return (
    <View
      style={[s.container, style]}
      testID={testID}
    >
      <View style={[s.leftPart, showRightPart ? s.hidden : s.expanded]}>
        <View style={[s.numberInput]}>
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
      </View>

      <Pressable
        style={({ pressed }) => [
          { opacity: pressed ? 0.8 : 1}
        ]}
        onPress={toggleFormState}
      >
        <Image
          style={s.icon}
          source={{ uri: cardIcon }}
        />
      </Pressable>

      <View style={[s.rightPart, showRightPart ? s.expanded : s.hidden]}>
        <Pressable
          style={({ pressed }) => [
            s.last4,
            { opacity: pressed ? 0.8 : 1}
          ]}
          onPress={toggleFormState}
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
        </Pressable>

        <View style={s.expiryInput}>
          <TextInput
            ref={expiryInputRef || expiryInput}
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

        <View style={s.cvcInput}>
          <TextInput
            ref={cvcInputRef || cvcInput}
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

export default LiteCreditCardInput;
