// generic allows you to write reusable and flexible code by parameterizing types.
const displayMessage = <T>(param1: T): T => {
  return param1;
};
console.log(displayMessage('Hi'), typeof displayMessage('Hi'));
console.log(displayMessage(4), typeof displayMessage(4));
