import { isValidCardNumber } from "../validator";

test.each([
  ["correct Mir card number", "2200 2605 9011 2854", true],
  ["uncorrect Mir card number", "2200 2605 9011 2853", false],
  ["correct Visa card number", "4539368957764353", true],
  ["uncorrect Visa card number", "4539368957764352", false],
  ["correct MasterCard card number", "5576 6276 7858 3009", true],
  ["uncorrect MasterCard card number", "5576 6276 7858 3008", false],
  ["empty card number", "  ", false],
])("testing isValidCardNumber function with %s", (_, value, expected) => {
  const result = isValidCardNumber(value);

  expect(result).toBe(expected);
});
