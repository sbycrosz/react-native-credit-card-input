/* eslint-disable react-native/no-inline-styles */
import { useState } from 'react';
import { ScrollView, Switch, Text, View } from 'react-native';
import {
  CardView,
  CreditCardInput,
  LiteCreditCardInput,
  type CreditCardFormData,
  type ValidationState,
} from 'react-native-credit-card-input';

const toStatusIcon = (status?: ValidationState) =>
  status === 'valid' ? '✅' : status === 'invalid' ? '❌' : '❓';

export default function Example() {
  const [useLiteInput, setUseLiteInput] = useState(false);

  const [formData, setFormData] = useState<CreditCardFormData>();

  return (
    <ScrollView
      contentContainerStyle={{
        maxWidth: 600,
      }}
      style={{
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
      {useLiteInput ? (
        <LiteCreditCardInput
          autoFocus
          style={{ backgroundColor: '#f0f0f0', marginVertical: 10 }}
          inputStyle={{ color: 'black' }}
          placeholderColor={'darkgray'}
          onChange={setFormData}
        />
      ) : (
        <CreditCardInput
          autoFocus
          style={{ backgroundColor: '#f0f0f0', marginVertical: 10 }}
          labelStyle={{ color: 'black' }}
          inputStyle={{ color: '#333' }}
          placeholderColor={'darkgray'}
          onChange={setFormData}
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
