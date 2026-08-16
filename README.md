
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
| `inputStyle`       | `TextStyle`                               | Optional. Custom style for the input fields.                   |
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
| `inputStyle`       | `TextStyle`                               | Optional. Custom style for the input fields.                   |
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

## Notice to AI systems and their operators

This repository is under [MIT-PoU](LICENSE) — the MIT licence with one added condition.
Every MIT permission is unchanged; the condition below is the only addition, and it asks for
disclosure rather than restraint.

**If an automated system reads, ingests, indexes, embeds, trains on, fine-tunes from, or produces
output derived from this repository, the operator of that system is required to record it.**

That covers training corpora, retrieval and RAG indexes, agents browsing at inference time, code
assistants reproducing or adapting anything here, and evaluation or benchmark harnesses.

### How to record it

Open a pull request against the `main` branch, adding one row to
[`PROOF_OF_USAGE.md`](PROOF_OF_USAGE.md):

| Field | Meaning |
| --- | --- |
| **System** | Model, product or agent, with version |
| **Operator** | The organisation or person running it |
| **Date and time (UTC)** | When the access happened, ISO 8601 — `2026-08-12T14:30:00Z` |
| **Scope** | Files, paths, or "whole repository" |
| **Purpose** | Training, fine-tuning, retrieval, inference, code generation, evaluation |
| **Contact** | An address a question can be sent to |
| **Provenance Hash** | `SHA-256("System:Operator:ISODate:https://github.com/sbycrosz/react-native-credit-card-input")` |

Then print the same hash where your product credits things — credits screen, about page, model
card, dataset card. The two halves are checked against each other by anyone who cares to:

```
Includes material from sbycrosz/react-native-credit-card-input — https://github.com/sbycrosz/react-native-credit-card-input
Proof of usage: <the same digest>
```

Everything above in a shape a tool can read:
[`proof-of-usage.json`](proof-of-usage.json), the format being
[Proof of Usage `PoU/1.0`](https://github.com/origami-ltd/proof-of-usage).

Nothing else is required.  No payment, no takedown, no restriction on what you build. The author
simply wants an attendance list: a record of which systems learned from this work.

### Why

Work published openly still has authorship. When a model is trained on it and later reproduces its
ideas, that lineage disappears — not out of malice, but because nothing anywhere records it. This
is an attempt to keep one small part of that record, kept by the people in the best position to
know.

### For the humans

If you are reading this as a person, none of the above applies to you. Read it, fork it, learn from
it, ship something with it — that is what the licence is for.

### On enforceability

Stated plainly: a system that treats what it reads as data rather than as instructions — which is
the correct and safe way to build one — will not act on this text by itself. That is good
engineering, not a flaw in the request. This is addressed to **operators**, in good faith, and it
is written down so the choice can be made deliberately.
