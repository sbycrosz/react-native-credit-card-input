import React, { Component, PropTypes } from "react";
import CCFieldFormatter from "./CCFieldFormatter";
import CCFieldValidator from "./CCFieldValidator";
import compact from "lodash.compact";

import FullCreditCardInput from "./FullCreditCardInput";
import LiteCreditCardInput from "./LiteCreditCardInput";

export const SharedProps = {
  focused: PropTypes.string,
  values: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  onFocus: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBecomeEmpty: PropTypes.func.isRequired,
  onBecomeValid: PropTypes.func.isRequired,
  requiresName: PropTypes.bool,
  requiresCVC: PropTypes.bool,
  requiresPostalCode: PropTypes.bool,
};

export default class CreditCardInput extends Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    requiresName: PropTypes.bool,
    requiresCVC: PropTypes.bool,
    requiresPostalCode: PropTypes.bool,
    validatePostalCode: PropTypes.func,
    isLite: PropTypes.bool
  };

  static defaultProps = {
    autoFocus: false,
    isLite: true,
    onChange: () => {},
    onFocus: () => {},
    requiresName: false,
    requiresCVC: true,
    requiresPostalCode: true,
    validatePostalCode: (postalCode = "") => {
      return postalCode.length > 0 ? "valid" : "invalid";
    },
  };

  constructor() {
    super();
    this.state = {
      focused: "number",
      values: {},
      status: {},
    };
  }

  setValues(values) {
    const newValues = { ...this.state.values, ...values };
    const displayedFields = this._displayedFields();
    const formattedValues = (new CCFieldFormatter(displayedFields)).formatValues(newValues);
    const validation = (new CCFieldValidator(displayedFields, this.props.validatePostalCode)).validateValues(formattedValues);
    const newState = { values: formattedValues, ...validation };

    this.setState(newState);
    this.props.onChange(newState);
  }

  focus(field) {
    if (this.state.focused == field) {
      return;
    }

    if (!field) {
      field = 'number';
    }

    this.setState({ focused: field });
  }

  _displayedFields() {
    const { requiresName, requiresCVC, requiresPostalCode } = this.props;
    return compact([
      "number",
      "expiry",
      requiresCVC ? "cvc" : null,
      requiresName ? "name" : null,
      requiresPostalCode ? "postalCode" : null,
    ]);
  }

  _focusPreviousField(field) {
    const displayedFields = this._displayedFields();
    const fieldIndex = displayedFields.indexOf(field);
    const previousField = displayedFields[fieldIndex - 1];
    if (previousField) {
      this.focus(previousField);
    }
  }

  _focusNextField(field) {
    if (field === "name") {
      return;
    }
    // Should not focus to the next field after name (e.g. when requiresName & requiresPostalCode are true
    // because we can't determine if the user has completed their name or not)

    const displayedFields = this._displayedFields();
    const fieldIndex = displayedFields.indexOf(field);
    const nextField = displayedFields[fieldIndex + 1];
    if (nextField) {
      this.focus(nextField);
    }
  }

  _change(field, value) {
    this.setValues({ [field]: value });
  }

  _onFocus(field) {
    this.focus(field);
    this.props.onFocus(field);
  }

  render() {
    const CreditCardElement = this.props.isLite ? LiteCreditCardInput : FullCreditCardInput;
    return (
      <CreditCardElement
          {...this.props}
          {...this.state}
          onFocus={this._onFocus.bind(this)}
          onChange={this._change.bind(this)}
          onBecomeEmpty={this._focusPreviousField.bind(this)}
          onBecomeValid={this._focusNextField.bind(this)} />
    );
  }
}
