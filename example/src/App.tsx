/* eslint-disable react-native/no-inline-styles */
import { useState } from 'react';
import { ScrollView, Switch, Text, View } from 'react-native';
import {
  CreditCardView,
  CreditCardInput,
  LiteCreditCardInput,
  type CreditCardFormData,
  type CreditCardFormField,
  type ValidationState,
} from 'react-native-credit-card-input';

const toStatusIcon = (status?: ValidationState) =>
  status === 'valid' ? '✅' : status === 'invalid' ? '❌' : '❓';

export default function Example() {
  const [useLiteInput, setUseLiteInput] = useState(false);

  const [focusedField, setFocusedField] = useState<CreditCardFormField>();

  const [formData, setFormData] = useState<CreditCardFormData>();

  return (
    <ScrollView
      contentContainerStyle={{
        width: '100%',
        maxWidth: 600,
        marginHorizontal: 'auto',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginTop: 60,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Switch
          style={{
            alignSelf: 'center',
            marginTop: 20,
            marginBottom: 20,
          }}
          onValueChange={(v) => {
            setUseLiteInput(v);
            setFormData(undefined);
          }}
          value={useLiteInput}
        />
      </View>

      <CreditCardView
        focusedField={focusedField}
        type={formData?.values.type}
        number={formData?.values.number}
        expiry={formData?.values.expiry}
        cvc={formData?.values.cvc}
        style={{
          alignSelf: 'center',
          marginTop: 15,
        }}
      />

      {useLiteInput ? (
        <LiteCreditCardInput
          autoFocus
          style={{
            marginTop: 15,
            borderColor: '#fff',
            borderTopWidth: 1,
            borderBottomWidth: 1,
          }}
          inputStyle={{ color: 'black' }}
          placeholderColor={'darkgray'}
          onChange={setFormData}
          onFocusField={setFocusedField}
        />
      ) : (
        <CreditCardInput
          autoFocus
          style={{
            marginTop: 15,
          }}
          labelStyle={{ color: 'black' }}
          inputStyle={{ color: '#333' }}
          placeholderColor={'darkgray'}
          onChange={setFormData}
          onFocusField={setFocusedField}
        />
      )}

      <View
        style={{
          margin: 20,
          padding: 20,
          backgroundColor: '#dfdfdf',
          borderRadius: 5,
        }}
      >
        <Text style={{ fontFamily: 'courier' }}>
          {formData?.valid
            ? '✅ Possibly valid card'
            : '❌ Invalid/Incomplete card'}
        </Text>

        <Text style={{ fontFamily: 'courier' }}>
          {toStatusIcon(formData?.status.number)}
          {' Number\t: '}
          {formData?.values.number}
        </Text>

        <Text style={{ fontFamily: 'courier' }}>
          {toStatusIcon(formData?.status.expiry)}
          {' Expiry\t: '}
          {formData?.values.expiry}
        </Text>

        <Text style={{ fontFamily: 'courier' }}>
          {toStatusIcon(formData?.status.cvc)}
          {' Cvc   \t: '}
          {formData?.values.cvc}
        </Text>

        <Text style={{ fontFamily: 'courier' }}>
          {'ℹ️ Type\t: '}
          {formData?.values.type}
        </Text>
      </View>
    </ScrollView>
  );
}
