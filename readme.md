
# React Native Credit Card Input
Easy (and good looking) credit-card input for your React Native Project 💳 💳

<p align="center">
<img src="https://github.com/sbycrosz/react-native-credit-card-input/blob/master/preview-ios.gif?raw=true" width=200/>
<img src="https://github.com/sbycrosz/react-native-credit-card-input/blob/master/preview-ios-lite.gif?raw=true" width=200/>
<img src="https://github.com/sbycrosz/react-native-credit-card-input/blob/master/preview-android.gif?raw=true" width=200/>
<img src="https://github.com/sbycrosz/react-native-credit-card-input/blob/master/preview-android-lite.gif?raw=true" width=200/>
</p>

Code:

```js
<CreditCardInput onChange={this._onChange} />
// or
<LiteCreditCardInput onChange={this._onChange} />
```


# Features
* Skeuomorphic credit-card 💳 (credits to: [react-native-credit-card](https://github.com/sonnylazuardi/react-native-credit-card))
* Lite version for smaller screens (or if skeuomorphic is not really your thing)
* Credit-card input validations & formatting while you're typing
* Form is fully navigatable using keypad
* Works on both Android and iOS


# Usage

```bash
npm i --save react-native-credit-card-input
```

then add these lines in your react-native codebase

```js
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";

<CreditCardInput onChange={this._onChange} />
// or
<LiteCreditCardInput onChange={this._onChange} />

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
  	name: "Sam",
  	postalCode: "34567",
  },
  status: {  // will be one of ["incomplete", "invalid", and "valid"]
	number: "incomplete",
	expiry: "incomplete",
	cvc: "incomplete",
	name: "incomplete", 
	postalCode: "incomplete",
  },
};

// Notes: 
// cvc, name, & postalCode will only be available when the respective props is enabled (e.g. requiresName, requiresCVC)
```

# Props

## LiteCreditCardInput
| Property | Type | Description |
| --- | --- | --- | --- |
|autoFocus | PropTypes.bool | Automatically focus Card Number field on render|
|onChange | PropTypes.func | Receives a `formData` object every time the form changes |
|onFocus | PropTypes.func | Receives the name of currently focused field |
|placeholders | PropTypes.object | Defaults to <br/>`{ number: "1234 5678 1234 5678", expiry: "MM/YY", cvc: "CVC" }` |
|inputStyle | Text.propTypes.style | Style for credit-card form's textInput |
|validColor | PropTypes.string | Color that will be applied for valid text input. Defaults to: "{inputStyle.color}" |
|invalidColor | PropTypes.string | Color that will be applied for invalid text input. Defaults to: "red" |
|placeholderColor | PropTypes.string | Color that will be applied for text input placeholder. Defaults to: "gray" |

#### NOTES
LiteCreditCardInput does not support `requiresName`, `requiresCVC`, and `requiresPostalCode` at the moment, PRs are welcome :party:


## CreditCardInput
| Property | Type | Description |
| --- | --- | --- | --- |
|autoFocus | PropTypes.bool | Automatically focus Card Number field on render|
|onChange | PropTypes.func | Receives a `formData` object every time the form changes |
|onFocus | PropTypes.func | Receives the name of currently focused field |
|labels | PropTypes.object | Defaults to <br/>`{ number: "CARD NUMBER", expiry: "EXPIRY", cvc: "CVC/CCV" }` |
|placeholders | PropTypes.object | Defaults to <br/>`{ number: "1234 5678 1234 5678", expiry: "MM/YY", cvc: "CVC" }` |
|cardViewSize | PropTypes.object | Size of the credit-card view.<br/>Defaults to `{ width: 300, height: 180 }` (managed by [react-native-credit-card](https://github.com/sonnylazuardi/react-native-credit-card))  |
|imageFront | PropTypes.number | Image for the credit-card view `e.g. require("./card.png")` |
|imageBack | PropTypes.number | Image for the credit-card view `e.g. require("./card.png")` |
|labelStyle | Text.propTypes.style | Style for credit-card form's labels |
|inputStyle | Text.propTypes.style | Style for credit-card form's textInput |
|inputContainerStyle | View.propTypes.style | Style for textInput's container<br/> Defaults to: `{ borderBottomWidth: 1, borderBottomColor: "black" }` |
|validColor | PropTypes.string | Color that will be applied for valid text input. Defaults to: "{inputStyle.color}" |
|invalidColor | PropTypes.string | Color that will be applied for invalid text input. Defaults to: "red" |
|placeholderColor | PropTypes.string | Color that will be applied for text input placeholder. Defaults to: "gray" |
|requiresName | PropTypes.bool | Shows cardholder's name field<br/> Default to `false` |
|requiresCVC | PropTypes.bool | Shows CVC field<br/> Default to `true` |
|requiresPostalCode | PropTypes.bool | Shows postalCode field<br/> Default to `false` |
|validatePostalCode | PropTypes.func | Function to validate postalCode, expects `incomplete`, `valid`, or `invalid` as return values|

# Methods
## setValues
Set values into credit card form 


```js
	// sets 4242 on credit card number field 
	// other fields will stay unchanged
	this.refs.CCInput.setValues({ number: "4242" });
```

**Known issues:** clearing a field e.g. `setValues({ expiry: "" })` will trigger the logic to `move to previous field` and trigger other kind of weird side effects. **PR plz**


## focus
focus on to specified field

```js
	// focus to expiry field
	this.refs.CCInput.focus("expiry");
```

# Example

In the `example` directory, run:

```bash
npm install

react-native run-ios
# or
react-native run-android
```

# Missing Something? Something is not working?
* Open a GitHub issue, or
* Send a pull request :D
* Make sure `npm run lint` passed

# Future Improvement
* Add unit tests
* Accept name / postalCode fields for LiteCreditCardInput
* Create example with [react-native-awesome-card-io](https://github.com/Kerumen/react-native-awesome-card-io)

# Production App using react-native-credit-card-input
* Grain.com.sg ([iOS](https://itunes.apple.com/us/app/grain-never-worry-about-food/id1088932420)) – Gourmet food delivery in Singapore
