const visaElectron = ['4026', '4508', '4844', '4913', '4917', '417500'];
const americanExpress = ['34', '37'];
const dinersClub = ['36', '38'];
const discoverCard = ['6011', '622126', '622925', '644', '649', '65'];
function nestedCardDetails(number) {
  if (americanExpress?.some((item) => number?.toString()?.startsWith(item))) {
    return 'American Express';
  } else if (dinersClub?.some((item) => number?.toString()?.startsWith(item))) {
    return 'Diners Club';
  }
  return 'Invalid card details';
}

function cardIdentify(number) {
  const length = number.toString().length;
  if (!isNaN(number) && (length == 14 || length == 15 || length == 16)) {
    if (number?.toString()?.split('')[0] == '4') {
      if (visaElectron.some((item) => number?.toString()?.startsWith(item))) {
        return 'Visa Electron';
      }
      return 'Visa';
    } else {
      if (discoverCard.some((item) => number?.toString()?.startsWith(item))) {
        return 'Discover Card';
      }
      return nestedCardDetails(number?.toString());
    }
  }
  return 'Invalid card details';
}
console.log({details: cardIdentify('6229264852345618')});
