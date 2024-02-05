import { getCardIssuer } from "../card";

test.each([
  ["Mir card number", "2200 2605 9011 2854", "mir"],
  ["Visa card number", "4539368957764353", "visa"],
  ["MasterCard card number", "2221 0040 0153 3836", "master"],
  ["American Express card number", "377644214980039", "amex"],
  ["Discover card number", "6011 6737 9212 0246", "discover"],
  ["JCB card number", "3528196696487583417", "jcb"],
  ["Diners Club card number", "36692887077693", "diners_club"],
  ["unknown card number", "2104001234404589", null],
  ["empty card number", "  ", null],
])("testing getCardIssuer function with %s", (_, value, expected) => {
  const result = getCardIssuer(value);

  expect(result).toBe(expected);
});
