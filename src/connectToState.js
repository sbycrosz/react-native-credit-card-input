import React, { Component, PropTypes } from 'react';

import CCFieldFormatter from "./CCFieldFormatter";
import CCFieldValidator from "./CCFieldValidator";

export const InjectedProps = {
  focused: PropTypes.string,
  values: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  onFocus: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBecomeEmpty: PropTypes.func.isRequired,
  onBecomeValid: PropTypes.func.isRequired,
};

export default function connectToState(CreditCardInput) {
  class StateConnection extends Component {
    static propTypes = {
      autoFocus: PropTypes.bool,
      onChange: PropTypes.func.isRequired,
    };

    constructor() {
      super();
      this.state = {
        focused: "",
        values: { number: "", expiry: "", cvc: "" },
        status: { number: "incomplete", expiry: "incomplete", cvc: "incomplete" },
      };
    }

    componentDidMount = () => this.props.autoFocus && this._focus("number")

    _focusPreviousField = field => {
      if (field === "expiry") this._focus("number")
      if (field === "cvc") this._focus("expiry")
    };

    _focusNextField = field => {
      if (field === "number") this._focus("expiry")
      if (field === "expiry") this._focus("cvc")
    };

    _change = (field, value) => {
      const values = CCFieldFormatter.formatValues({ ...this.state.values, [field]: value });
      const validation = CCFieldValidator.validateValues(values);
      const newState = { values, ...validation };

      this.setState(newState);
      this.props.onChange(newState);
    };

    _focus = field => this.setState({ focused: field });

    render() {
      return (
        <CreditCardInput
            {...this.props}
            {...this.state}
            onFocus={this._focus}
            onChange={this._change}
            onBecomeEmpty={this._focusPreviousField}
            onBecomeValid={this._focusNextField} />
      );
    }
  }

  StateConnection.defaultProps = {
    autoFocus: false,
    onChange: () => {},
  };

  return StateConnection;
}
