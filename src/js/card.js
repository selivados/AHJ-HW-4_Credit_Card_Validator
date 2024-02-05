function range(start, end) {
  let result = [];

  for (let i = start; i <= end; i++) {
    result.push(String(i));
  }

  return result;
}

const cardIssuersDict = {
  mir: {
    title: "Mir",
    iinRange: range(2200, 2204),
    length: [16, 17, 18, 19],
  },
  visa: {
    title: "Visa",
    iinRange: ["4"],
    length: [13, 16, 19],
  },
  master: {
    title: "MasterCard",
    iinRange: [...range(51, 55), ...range(222100, 272099)],
    length: [16],
  },
  amex: {
    title: "American Express",
    iinRange: ["34", "37"],
    length: [15],
  },
  discover: {
    title: "Discover",
    iinRange: ["6011", ...range(622126, 622925), ...range(644, 649), "65"],
    length: [16, 17, 18, 19],
  },
  jcb: {
    title: "JCB",
    iinRange: range(3528, 3589),
    length: [16, 17, 18, 19],
  },
  diners_club: {
    title: "Diners Club",
    iinRange: [...range(300, 305), "36", "38"],
    length: [14, 16],
  },
};

export function getCardIssuer(value) {
  value = value.replace(/\D/g, "");

  for (const cardIssuer in cardIssuersDict) {
    const iinRange = cardIssuersDict[cardIssuer].iinRange;

    for (const str of iinRange) {
      if (value.startsWith(str)) {
        return cardIssuer;
      }
    }
  }

  return null;
}
