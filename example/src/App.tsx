/* eslint-disable react-native/no-inline-styles */
import { useState } from 'react';
import { Switch, Text, View } from 'react-native';
import {
  CreditCardInput,
  LiteCreditCardInput,
} from 'react-native-credit-card-input';
import type { CreditCardFormData } from '../../src/useCreditCardForm';

export default function Example() {
  const [useLiteInput, setUseLiteInput] = useState(true);

  const [formData, setFormData] = useState<CreditCardFormData>();

  return (
    <View
      style={{
        marginTop: 60,
        maxWidth: 400,
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
          onValueChange={setUseLiteInput}
          value={useLiteInput}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: 600,
            marginLeft: 10,
          }}
        >
          Lite Input
        </Text>
      </View>

      {useLiteInput ? (
        <LiteCreditCardInput
          autoFocus
          style={{ backgroundColor: '#dfdfdf', marginVertical: 10 }}
          inputStyle={{ color: 'black' }}
          placeholderColor={'darkgray'}
          onChange={setFormData}
        />
      ) : (
        <CreditCardInput
          autoFocus
          labelStyle={{
            fontSize: 16,
            color: 'black',
          }}
          inputStyle={{
            fontSize: 16,
            color: 'black',
          }}
          validColor={'black'}
          invalidColor={'red'}
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
            : '❌ Invalid/incomplete card'}
        </Text>

        <Text style={{ fontFamily: 'courier' }}>
          {formData?.status.number === 'valid'
            ? '✅'
            : formData?.status.number === 'invalid'
              ? '❌'
              : '❓'}
          {' Number\t: '}
          {formData?.values.number}
        </Text>

        <Text style={{ fontFamily: 'courier' }}>
          {formData?.status.expiry === 'valid'
            ? '✅'
            : formData?.status.expiry === 'invalid'
              ? '❌'
              : '❓'}
          {' Expiry\t: '}
          {formData?.values.expiry}
        </Text>

        <Text style={{ fontFamily: 'courier' }}>
          {formData?.status.cvc === 'valid'
            ? '✅'
            : formData?.status.cvc === 'invalid'
              ? '❌'
              : '❓'}
          {' Cvc   \t: '}
          {formData?.values.cvc}
        </Text>
      </View>
    </View>
  );
}
