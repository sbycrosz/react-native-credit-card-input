import valid from "card-validator";

const toStatus = validation => {
  return validation.isValid ? "valid" :
         validation.isPotentiallyValid ? "incomplete" :
         "invalid";
};

const FALLBACK_CARD = { gaps: [4, 8, 12], lengths: [16], code: { size: 3 } };

export default class CCFieldValidator {
  validateValues = (values) => {
    const numberValidation = valid.number(values.number);
    const expiryValidation = valid.expirationDate(values.expiry);
    const maxCVCLength = (numberValidation.card || FALLBACK_CARD).code.size;
    const cvcValidation = valid.cvv(values.cvc, maxCVCLength);

    //Dedicated validation method for Name since `card-validator` package
    //dont have a Name validation function
    //Also we don't know when and how the user completed the name
    const _name = (values.name.length > 0) ? "incomplete" : "invalid";

    return {
      valid: numberValidation.isValid && expiryValidation.isValid && cvcValidation.isValid,
      status: {
        number: toStatus(numberValidation),
        expiry: toStatus(expiryValidation),
        cvc: toStatus(cvcValidation),
        name: _name,
      },
    };
  };
}
