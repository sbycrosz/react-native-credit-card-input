import connectToState from "./connectToState";
import CCF from "./CreditCardForm";
import LiteCCF from "./LiteCreditCardForm";

export const CreditCardForm = connectToState(CCF);
export const LiteCreditCardForm = connectToState(LiteCCF);
