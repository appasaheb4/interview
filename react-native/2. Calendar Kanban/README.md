1. Explain the difference between React Native's useEffect and useLayoutEffect. When would you use one over the other?

2. How does React Native handle animations? Compare Animated API and LayoutAnimation.

3. What are the key differences between React Native's old architecture (Bridge) and the new architecture (Fabric and TurboModules)?

4. How would you optimize the performance of a React Native application? Provide examples.

5. Explain how React Native handles navigation. Compare React Navigation and React Native Navigation.

6. What are the challenges of integrating native modules in React Native, and how do you handle them for both iOS and Android?

7. How does React Native handle asynchronous operations? Discuss the role of Promises, async/await, and EventEmitters.

8. What is the purpose of the Metro bundler in React Native, and how does it differ from Webpack?

9. How would you implement deep linking in a React Native application?

10. What are the best practices for managing state in a React Native application? Compare Redux, Context API, and third-party libraries like MobX or Recoil.

## Coding Question

```

Write a function to find all subsequences of a given string. A subsequence is a sequence derived from another string by deleting some or no elements without changing the order of the remaining elements.

Example:
Input: "abc"
Output: ["", "a", "b", "c", "ab", "ac", "bc", "abc"]


// answer
function subsequences(str) {
  const result = [];

  function helper(current, index) {
    if (index === str.length) {
      result.push(current);
      return;
    }

    // Include the current character
    helper(current + str[index], index + 1);

    // Exclude the current character
    helper(current, index + 1);
  }

  helper("", 0);
  return result;
}

const input = "abc";
const subsequences = subsequences(input);
console.log(subsequences);
```

## Assignment repo link: https://github.com/appasaheb4/calendar-kanban

## Android Build Link: https://appho.st/d/1arBx2Sv

## Video Link: https://youtu.be/fF0VrqsIc3U
