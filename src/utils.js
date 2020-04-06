import { VALID, INCOMPLETE, INVALID, MAESTRO, MAESTR0_BASE_LENGTH } from "./constants";

export const toStatus = validation => {
  return validation.isValid ? VALID :
         validation.isPotentiallyValid ? INCOMPLETE :
         INVALID;
};

export const hasProperLength = (cardNumber, length) => cardNumber.split(" ").join("").length >= length;
export const cardStatus = (numberValidation, cardNumber, cardType, cardBaseLength) =>
  hasProperLength(cardNumber, cardBaseLength)
  && numberValidation.card
  && numberValidation.card.type === cardType && VALID;

export const maestroCardStatus = (numberValidation, cardNumber) => cardStatus(numberValidation, cardNumber, MAESTRO, MAESTR0_BASE_LENGTH);
