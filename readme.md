
# React Native Credit Card Input
💳 💳 Easy (and good looking) credit-card input for your React Native Project.

<img src="https://github.com/sbycrosz/react-native-credit-card-input/blob/master/preview-ios.gif?raw=true" width=200/>
<img src="https://github.com/sbycrosz/react-native-credit-card-input/blob/master/preview-android.gif?raw=true" width=200/>
<img src="https://github.com/sbycrosz/react-native-credit-card-input/blob/master/preview-ios-lite.gif?raw=true" width=200/>
<img src="https://github.com/sbycrosz/react-native-credit-card-input/blob/master/preview-android-lite.gif?raw=true" width=200/>

## Features
* Skeuomorphic credit-card 💳 (credits to: [react-native-credit-card](https://github.com/sonnylazuardi/react-native-credit-card))
* Lite version for smaller screens (or if skeuomorphic is not really your thing)
* Credit-card input validations & formatting while you're typing
* Works on both Android and iOS


## Usage

```bash
npm i --save react-native-credit-card-input
```

then add these lines in your react-native codebase

```js
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";

<CreditCardInput onChange={this._onChange} />
// or 
<LiteCreditCardInput onChange={this._onChange} /> 

// Note for LiteCreditCardInput:
// You'll need to enable LayoutAnimation on android to see animation
// UIManager.setLayoutAnimationEnabledExperimental(true);

```

## API

### Applicable for both
| Property | Type | Description |
| --- | --- | --- | --- |
|autoFocus | PropTypes.bool | Automatically focus Card Number field on render|
|onChange | PropTypes.func | Receives a `formData` object every time the form changes |

### CreditCardInput
| Property | Type | Description |
| --- | --- | --- | --- |
|labels | PropTypes.object | Defaults to <br/>`{ number: "CARD NUMBER", expiry: "EXPIRY", cvc: "CVC/CCV" }` |
|placeholders | PropTypes.object | Defaults to <br/>`{ number: "1234 5678 1234 5678", expiry: "MM/YY", cvc: "CVC" }` |
|cardViewSize | PropTypes.object | Size of the credit-card view.<br/>Defaults to `{ width: 300, height: 180 }` (managed by [react-native-credit-card](https://github.com/sonnylazuardi/react-native-credit-card))  |
|imageFront | PropTypes.number | Image for the credit-card view `e.g. require("./card.png")` |
|imageBack | PropTypes.number | Image for the credit-card view `e.g. require("./card.png")` |
|labelStyle | Text.propTypes.style | Style for credit-card form's labels |
|inputStyle | Text.propTypes.style | Style for credit-card form's textInput |
|inputContainerStyle | View.propTypes.style | Style for textInput's container<br/> Defaults to: `{ borderBottomWidth: 1, borderBottomColor: "black" }` |
|validColor | PropTypes.string | Color that will be applied for valid text input |
|invalidColor | PropTypes.string | Color that will be applied for invalid text input |
|placeholderColor | PropTypes.string | Color that will be applied for text input placeholder |


### LiteCreditCardInput
| Property | Type | Description |
| --- | --- | --- | --- |
|placeholders | PropTypes.object | Defaults to <br/>`{ number: "1234 5678 1234 5678", expiry: "MM/YY", cvc: "CVC" }` |
|inputStyle | Text.propTypes.style | Style for credit-card form's textInput |
|validColor | PropTypes.string | Color that will be applied for valid text input |
|invalidColor | PropTypes.string | Color that will be applied for invalid text input |
|placeholderColor | PropTypes.string | Color that will be applied for text input placeholder |

### onChange
Receives a `formData` object every time the form changes. e.g.

```js
{
  valid: true, // will be true once all field's statuses are "valid"
  focused: "number", // will be one of "number", "expiry", and "cvc"
  values: { // will be in the sanitized and formatted form
  	number: "4242 4242",
  	expiry: "06/19",
  	cvc: "300",
  	type: "visa", // will be one of null, "visa", "master-card", "american-express", "diners-club", "discover", "jcb", "unionpay", "maestro"
  },
  status: {  // will be one of "incomplete", "invalid", and "valid"
	number: "incomplete",
	expiry: "incomplete"
	cvc: "incomplete"
  },
};
```



## Example

In the `example` directory, do:

```bash
npm install
react-native run-ios
# or
react-native run-android
```

## Missing something?
Submit a pull request :D

## TODO
* Add eslint
* Add some unit tests for the formatter/validator logic
* Accept initialValues


## License
MIT
