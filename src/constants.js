/* eslint-disable comma-dangle */
const MAESTRO_CARD_TYPE = {
  niceType: "Maestro",
  type: "maestro",
  patterns: [
    493698,
    [500000, 506698],
    [506779, 508999],
    [56, 59],
    63,
    67,
    6,
    601782,
    508143,
    501081,
    501080,
    501051,
    501059,
    557909,
    501066,
    588729,
    501075,
    501062,
    501060,
    501057,
    501056,
    501055,
    501053,
    501043,
    501041,
    501038,
    501028,
    501023,
    501021,
    501020,
    501018,
    501016
  ],
  gaps: [4, 8, 12],
  lengths: [12, 13, 14, 15, 16, 17, 18, 19],
  code: {
    name: "CVC",
    size: 3
  }
};

const VISA_CARD_TYPE = {
  niceType: "Visa",
  type: "visa",
  patterns: [4, 4026, 417500, 4405, 4508, 4844, 4913, 4917],
  gaps: [4, 8, 12],
  lengths: [16],
  code: {
    name: "CVV",
    size: 3
  }
};

const HIPER_CARD_TYPE = {
  niceType: "Hipercard",
  type: "hipercard",
  patterns: [606282, 637599, 637609, 637612, 384100, 384140, 384160, 606282, 637095, 637568],
  gaps: [4, 8, 12],
  lengths: [16],
  code: {
    name: "CVC",
    size: 3
  }
};

const CABAL_CARD_TYPE = {
  niceType: "Cabal",
  type: "cabal",
  patterns: [627170, 589657, 603522, [604201, 604209], [210, 299], 302, 312, 322, 332, 342, 352, 362, 372, 382, 392, 400],
  gaps: [4, 8, 12],
  lengths: [16],
  code: {
    name: "CVC",
    size: 3
  }
};

export const CARDS_OVERRIDES = [MAESTRO_CARD_TYPE, VISA_CARD_TYPE, HIPER_CARD_TYPE, CABAL_CARD_TYPE];

export const MAESTRO = "maestro";
export const VALID = "valid";
export const INCOMPLETE = "incomplete";
export const INVALID = "invalid";
export const MAESTR0_BASE_LENGTH = 12;
