
# React Native Credit Card Input - Finally updated in 2024!
[Example on Expo Snack](https://snack.expo.io/@sbycrosz/react-native-credit-card-example) - Easy (and good looking) credit-card input for your React Native Project 💳 💳 


<p align="center">
<img src="https://github.com/sbycrosz/react-native-credit-card-input/blob/main/previews/ccinput.gif?raw=true" width=150/>
<img src="https://github.com/sbycrosz/react-native-credit-card-input/blob/main/previews/ccinputlite.gif?raw=true" width=150/>
</p>

Code:

```ts
<CreditCardInput />
// or
<LiteCreditCardInput />
```

# Features
* Skeuomorphic credit-card 💳 
* Lite version for smaller screens / compact layout
* Credit-card input validations & formatting while you're typing
* Form is fully navigatable using keypad
* Works on both Android, iOS **and Web!**

# Usage

```bash
yarn add react-native-credit-card-input
```

then add these lines in your react-native codebase

```js
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";

<CreditCardInput onChange={_onChange} />
// or
<LiteCreditCardInput onChange={_onChange} />

// Note: You'll need to enable LayoutAnimation on android to see LiteCreditCardInput's animations
// UIManager.setLayoutAnimationEnabledExperimental(true);

```

And then on your onChange handler:

```js
_onChange => form => console.log(form);

// will print:
{
  valid: true, // will be true once all fields are "valid" (time to enable the submit button)
  values: { // will be in the sanitized and formatted form
  	number: "4242 4242",
  	expiry: "06/19",
  	cvc: "300",
  	type: "visa", // will be one of [null, "visa", "master-card", "american-express", "diners-club", "discover", "jcb", "unionpay", "maestro"]
  },
  status: {  // will be one of ["incomplete", "invalid", and "valid"]
	number: "incomplete",
	expiry: "incomplete",
	cvc: "incomplete",
  },
};

```

# Example

[Expo Snack](https://snack.expo.io/@sbycrosz/react-native-credit-card-example)

Or run it locally 

```bash
yarn install

yarn example ios
# or
yarn example android
# or
yarn example web
```

# Should I used this in my project?

- Yes, if you need a quick credit card input component for your project or proof of concept.
- Yes, if the current UI/component fit your use case
- Otherwise, you're probably better off using [your favorite form library](https://react-hook-form.com/) and implementing the validation with the [card-validator](https://www.npmjs.com/package/card-validator) package!


# Components

## LiteCreditCardInput
| Prop               | Type                                      | Description                                                   |
|--------------------|-------------------------------------------|---------------------------------------------------------------|
| `autoFocus`        | `boolean`                                 | Optional. Specifies if the input should auto-focus.            |
| `style`            | `ViewStyle`                               | Optional. Custom style for the component's container.          |
| `numberInputStyle` | `TextStyle`                               | Optional. Custom style for the card number input field.             |
| `expiryInputStyle` | `TextStyle`                               | Optional. Custom style for the expiry input field.             |
| `cvcInputStyle`    | `TextStyle`                               | Optional. Custom style for the CVC input field.                    |
| `numberInputRef`   | `Ref<TextInput>`                          | Optional. Reference object for the card number input field.        |
| `expiryInputRef`   | `Ref<TextInput>`                          | Optional. Reference object for the expiry input field.             |
| `cvcInputRef`      | `Ref<TextInput>`                          | Optional. Reference object for the CVC input field.                |
| `placeholderColor` | `string`                                  | Optional. Color for the placeholder text.                      |
| `placeholders`     | `{ number: string; expiry: string; cvc: string; }` | Optional. Custom placeholders for the input fields.            |
| `onChange`         | `(formData: CreditCardFormData) => void`  | Required. Callback function called when form data changes.     |
| `onFocusField`     | `(field: CreditCardFormField) => void`    | Optional. Callback function called when a field gains focus.   |

## CreditCardInput
| Prop               | Type                                      | Description                                                   |
|--------------------|-------------------------------------------|---------------------------------------------------------------|
| `autoFocus`        | `boolean`                                 | Optional. Specifies if the input should auto-focus.            |
| `style`            | `ViewStyle`                               | Optional. Custom style for the component's container.          |
| `labelStyle`       | `TextStyle`                               | Optional. Custom style for the labels.                         |
| `numberInputStyle` | `TextStyle`                               | Optional. Custom style for the card number input field.             |
| `expiryInputStyle` | `TextStyle`                               | Optional. Custom style for the expiry input field.             |
| `cvcInputStyle`    | `TextStyle`                               | Optional. Custom style for the CVC input field.                    |
| `numberInputRef`   | `Ref<TextInput>`                          | Optional. Reference object for the card number input field.        |
| `expiryInputRef`   | `Ref<TextInput>`                          | Optional. Reference object for the expiry input field.             |
| `cvcInputRef`      | `Ref<TextInput>`                          | Optional. Reference object for the CVC input field.                |
| `placeholderColor` | `string`                                  | Optional. Color for the placeholder text.                      |
| `labels`           | `{ number: string; expiry: string; cvc: string; }` | Optional. Custom labels for the input fields.                  |
| `placeholders`     | `{ number: string; expiry: string; cvc: string; }` | Optional. Custom placeholders for the input fields.            |
| `onChange`         | `(formData: CreditCardFormData) => void`  | Required. Callback function called when form data changes.     |
| `onFocusField`     | `(field: CreditCardFormField) => void`    | Optional. Callback function called when a field gains focus.   |


## CardView

| Prop              | Type                                                      | Description                                                    |
|-------------------|-----------------------------------------------------------|----------------------------------------------------------------|
| `focusedField`    | `'name' \| 'number' \| 'expiry' \| 'cvc'`                 | Optional. Specifies which field is currently focused.           |
| `type`            | `CreditCardIssuer`                                        | Optional. Specifies the type of the credit card issuer.         |
| `name`            | `string`                                                  | Optional. The name on the credit card.                          |
| `number`          | `string`                                                  | Optional. The credit card number.                               |
| `expiry`          | `string`                                                  | Optional. The expiry date of the credit card.                   |
| `cvc`             | `string`                                                  | Optional. The CVC code of the credit card.                      |
| `placeholders`    | `{ number: string; expiry: string; cvc: string; name: string; }` | Optional. Custom placeholders for the input fields.            |
| `style`           | `ViewStyle`                                               | Optional. Custom style for the component's container.           |
| `fontFamily`      | `string`                                                  | Optional. Custom font family for the text.                      |
| `imageFront`      | `ImageSourcePropType`                                     | Optional. Image source for the front of the credit card.        |
| `imageBack`       | `ImageSourcePropType`                                     | Optional. Image source for the back of the credit card.         |
