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

    return {
      valid: numberValidation.isValid && expiryValidation.isValid && cvcValidation.isValid,
      status: {
        number: toStatus(numberValidation),
        expiry: toStatus(expiryValidation),
        cvc: toStatus(cvcValidation),
      },
    };
  };
}
