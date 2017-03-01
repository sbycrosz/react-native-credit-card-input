import connectToState from "./connectToState";
import CCF from "./CreditCardInput";
import LiteCCF from "./LiteCreditCardInput";
import CCFM from "./CreditCardInputModal";

export const CreditCardInput = connectToState(CCF);
export const CreditCardInputModal = connectToState(CCFM);
export const LiteCreditCardInput = connectToState(LiteCCF);
