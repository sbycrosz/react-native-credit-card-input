
# React Native Credit Card Form
Easy (and good looking) credit-card form for your React Native Project 💳 💳

<img src="https://github.com/sbycrosz/react-native-credit-card-form/blob/master/ios.gif?raw=true" width=200/>
<img src="https://github.com/sbycrosz/react-native-credit-card-form/blob/master/android.gif?raw=true" width=200/>

## Features
* Skeuomorphic credit-card 💳 (credits to: [react-native-credit-card](https://github.com/sonnylazuardi/react-native-credit-card))
* Credit-card input validations while you're typing
* Credit-card input formatting
* Works on both Android and iOS


## Usage

```bash
npm i -s react-native-credit-card-form
```

then add these lines in your react-native codebase

```js
import CreditCardForm from 'react-native-credit-card-form';

<CreditCardForm onChange={this._onChange} />
```

## API

| Property | Type | Description |
| --- | --- | --- | --- |
|autoFocus | PropTypes.bool | Automatically focus Card Number field on render|
|onChange | PropTypes.func | Will receive a `formData` object every time the form changes |
|imageFront | PropTypes.number | Image for the credit card view `e.g. require("./card.png")` |
|imageBack | PropTypes.number | Image for the credit card view `e.g. require("./card.png")` |
|labelStyle | Text.propTypes.style | Style for credit-card form's labels |
|inputStyle | Text.propTypes.style | Style for credit-card form's textInput |
|validColor | PropTypes.string | Color that's applied for valid text input |
|invalidColor | PropTypes.string | Color that's applied for invalid text input |
|placeholderColor | PropTypes.string | Color that's applied for text input placeholder |

### onChange
will receives a `formData` object every keypress. e.g.

```js
{
  valid: true, // will be true once all field's statuses are "valid"
  focused: "number", // will be one of "number", "expiry", and "cvc"
  values: { // will be in the sanitized and formatted form
  	number: "4242 4242",
  	expiry: "06/19",
  	cvc: "300",

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
* Add props to resize credit-card view
* Expose labels & placeholder as props
* Accept initialValues
* Support `Name` and `postal code` field
* Handles orientation changes


## License
MIT
