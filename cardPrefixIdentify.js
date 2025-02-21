const preDiscoverCard = ['6011', '622126', '622925', '644', '649', '65'];
function nestedCardDetails(number) {
  if (
    number?.toString().split('')[0] + '' + number?.toString().split('')[1] ==
      '34' ||
    number?.toString().split('')[0] + '' + number?.toString().split('')[1] ==
      '37'
  ) {
    if (number.toString().length == 15) {
      return 'American Express';
    }
    return 'Enter correct card details';
  } else if (
    number?.toString().split('')[0] + '' + number?.toString().split('')[1] ==
      '36' ||
    number?.toString().split('')[0] + '' + number?.toString().split('')[1] ==
      '38'
  ) {
    if (number.toString().length == 14 || number.toString().length == 15) {
      return 'Diners Club';
    }
    return 'Enter correct card details';
  }
  return 'Invalid card details';
}

function cardIdentify(number) {
  const length = number.toString().length;
  if (
    length == 14 ||
    length == 15 ||
    (length == 16 && Number.isInteger(number))
  ) {
    if (number?.toString()?.toString().split('')[0] == '4') {
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
      if (preDiscoverCard.some((item) => number.toString().startsWith(item))) {
        return 'Discover Card';
      }
      return nestedCardDetails(number?.toString());
    }
  }
  return 'Invalid card details';
}

console.log({details: cardIdentify(6221274689234561)});
