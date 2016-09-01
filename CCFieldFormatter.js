import valid from "card-validator";
import { removeNonNumber } from "./Utilities";

const limitLength = (string = "", maxLength) => string.substr(0, maxLength);
const addGaps = (string = "", gaps) => {
  var offsets = [0].concat(gaps).concat([string.length]);

  return offsets.map((end, index) => {
    if (index === 0) return "";
    const start = offsets[index - 1];
    return string.substr(start, end - start);
  }).filter(part => part !== "").join(" ");
};

const CCFieldFormatter = {
  formatValues: function(values) {
    return {
      number: this._formatNumber(values),
      expiry: this._formatExpiry(values),
      cvc: this._formatCVC(values),
    };
  },

  _formatNumber: ({ number }) => {
    const numberSanitized = removeNonNumber(number);
    const card = valid.number(numberSanitized).card || { gaps: [4, 8, 12], lengths: [16] };
    const maxLength = card.lengths[card.lengths.length - 1];
    const lengthSanitized = limitLength(numberSanitized, maxLength);
    const formatted = addGaps(lengthSanitized, card.gaps);
    return formatted;
  },
  _formatExpiry: ({ expiry }) => {
    const sanitized = limitLength(removeNonNumber(expiry), 4);
    if (sanitized.match(/^[2-9]$/)) { return `0${sanitized}`; }
    if (sanitized.length > 2) { return `${sanitized.substr(0, 2)}/${sanitized.substr(2, sanitized.length)}`; }
    return sanitized;
  },
  _formatCVC: ({ number, cvc }) => {
    const numberValidation = valid.number(number);
    const maxCVCLength = (numberValidation.card || { code: { size: 3 } }).code.size;
    return limitLength(removeNonNumber(cvc), maxCVCLength);
  },
};

export default CCFieldFormatter;
