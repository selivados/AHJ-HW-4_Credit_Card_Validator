export function isValidCardNumber(value) {
  value = value.replace(/\D/g, "");

  if (value) {
    let nCheck = 0;
    let bEven = false;

    for (let n = value.length - 1; n >= 0; n--) {
      let nDigit = Number(value.charAt(n));

      if (bEven && (nDigit *= 2) > 9) {
        nDigit -= 9;
      }

      nCheck += nDigit;
      bEven = !bEven;
    }

    return nCheck % 10 === 0;
  }

  return false;
}
