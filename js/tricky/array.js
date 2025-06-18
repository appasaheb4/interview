var words = [
  'language',
  'number',
  'developer',
  'feature',
  'browsers',
  'communicate',
  'climbing',
];
//Please sort this array by the second character of each element.
//For example [‘language’, ‘feature’, ‘developer’, ‘climbing’, 'communicate', 'browsers', 'number']
// let originalArray = [];
// Object.entries(words).filter((item) => {
//   originalArray.push(item[1][1]);
// });
// let finalArray = [];
// originalArray.sort()?.filter((item) => {
//   finalArray.push(words[words.findIndex((word) => word[1] === item)]);
// });
// console.log(finalArray);
let sortedWords = words.sort((a, b) => {
  return a[1].localeCompare(b[1]);
});
console.log(sortedWords);
