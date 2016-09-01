import valid from "card-validator";

const toStatus = validation => {
  return validation.isValid ? "valid" :
         validation.isPotentiallyValid ? "incomplete" :
         "invalid";
};

const CCFieldValidator = {
  validateValues: function(values) {
    const numberValidation = valid.number(values.number);
    const expiryValidation = valid.expirationDate(values.expiry);
    const maxCVCLength = (numberValidation.card || { code: { size: 3 } }).code.size;
    const cvcValidation = valid.cvv(values.cvc, maxCVCLength);

    return {
      number: toStatus(numberValidation),
      expiry: toStatus(expiryValidation),
      cvc: toStatus(cvcValidation),
    };
  },
};

export default CCFieldValidator;
