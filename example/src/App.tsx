import { useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import {
  CreditCardView,
  CreditCardInput,
  LiteCreditCardInput,
  type CreditCardFormData,
  type CreditCardFormField,
  type ValidationState,
} from 'react-native-credit-card-input';

const s = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 600,
    marginHorizontal: 'auto',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginTop: 60,
  },
  switch: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  cardView: {
    alignSelf: 'center',
    marginTop: 15,
  },
  cardInput: {
    marginTop: 15,
    borderColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  infoContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: '#dfdfdf',
    borderRadius: 5,
  },
  info: {
    fontFamily: Platform.select({
      ios: 'Courier',
      android: 'monospace',
      web: 'monospace',
    }),
  },
});

const toStatusIcon = (status?: ValidationState) =>
  status === 'valid' ? '✅' : status === 'invalid' ? '❌' : '❓';

export default function Example() {
  const [useLiteInput, setUseLiteInput] = useState(false);

  const [focusedField, setFocusedField] = useState<CreditCardFormField>();

  const [formData, setFormData] = useState<CreditCardFormData>();

  return (
    <ScrollView contentContainerStyle={s.container}>
      <Switch
        style={s.switch}
        onValueChange={(v) => {
          setUseLiteInput(v);
          setFormData(undefined);
        }}
        value={useLiteInput}
      />

      <CreditCardView
        focusedField={focusedField}
        type={formData?.values.type}
        number={formData?.values.number}
        expiry={formData?.values.expiry}
        cvc={formData?.values.cvc}
        style={s.cardView}
        monthYearLabel="Month/Year"
      />

      {useLiteInput ? (
        <LiteCreditCardInput
          autoFocus
          style={s.cardInput}
          onChange={setFormData}
          onFocusField={setFocusedField}
        />
      ) : (
        <CreditCardInput
          autoFocus
          style={s.cardInput}
          onChange={setFormData}
          onFocusField={setFocusedField}
        />
      )}

      <View style={s.infoContainer}>
        <Text style={s.info}>
          {formData?.valid
            ? '✅ Possibly valid card'
            : '❌ Invalid/Incomplete card'}
        </Text>

        <Text style={s.info}>
          {toStatusIcon(formData?.status.number)}
          {' Number\t: '}
          {formData?.values.number}
        </Text>

        <Text style={s.info}>
          {toStatusIcon(formData?.status.expiry)}
          {' Expiry\t: '}
          {formData?.values.expiry}
        </Text>

        <Text style={s.info}>
          {toStatusIcon(formData?.status.cvc)}
          {' Cvc   \t: '}
          {formData?.values.cvc}
        </Text>

        <Text style={s.info}>
          {'ℹ️ Type  \t: '}
          {formData?.values.type}
        </Text>
      </View>
    </ScrollView>
  );
}
