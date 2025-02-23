function nestedCardDetails(number) {
  if (
    number?.toString().split('')[0] + '' + number?.toString().split('')[1] ==
      '34' ||
    number?.toString().split('')[0] + '' + number?.toString().split('')[1] ==
      '37'
  ) {
    return 'American Express';
  } else if (
    number?.toString().split('')[0] + '' + number?.toString().split('')[1] ==
      '36' ||
    number?.toString().split('')[0] + '' + number?.toString().split('')[1] ==
      '38'
  ) {
    return 'Diners Club';
  }
  return 'Invalid card details';
}

function cardIdentify(number) {
  const length = number.toString().length;
  if (
    (length == 14 || length == 15 || length == 16) &&
    Number.isInteger(number)
  ) {
    if (number?.toString()?.split('')[0] == '4') {
      if (
        number?.toString().substring(0, 4) == '4026' ||
        number?.toString().substring(0, 4) == '4508' ||
        number?.toString().substring(0, 4) == '4844' ||
        number?.toString().substring(0, 4) == '4913' ||
        number?.toString().substring(0, 4) == '4917' ||
        number?.toString().substring(0, 6) == '417500'
      ) {
        return 'Visa Electron';
      }
      return 'Visa';
    } else {
      return nestedCardDetails(number?.toString());
    }
  }
  return 'Invalid card details';
}
console.log({details: cardIdentify(4175004852345618)});
