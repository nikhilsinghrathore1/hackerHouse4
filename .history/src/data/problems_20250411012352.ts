import { Problem } from '../types/problem';

export const problems: Problem[] = [
  {
    id: 'two-sum',
    title: '1. Two Sum',
    difficulty: 'Easy',
    description: `
      <p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to target</em>.</p>
      <p>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p>
      <p>You can return the answer in any order.</p>
    `,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]'
      },
      {
        input: 'nums = [3,3], target = 6',
        output: '[0,1]'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    defaultCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Your code here
    
};`
  },
  {
    id: 'palindrome',
    title: '9. Palindrome Number',
    difficulty: 'Easy',
    description: `
      <p>Given an integer <code>x</code>, return <code>true</code> if <code>x</code> is a palindrome, and <code>false</code> otherwise.</p>
      <p>A <strong>palindrome</strong> is a number that reads the same backward as forward.</p>
    `,
    examples: [
      {
        input: 'x = 121',
        output: 'true',
        explanation: '121 reads as 121 from left to right and from right to left.'
      },
      {
        input: 'x = -121',
        output: 'false',
        explanation: 'From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.'
      },
      {
        input: 'x = 10',
        output: 'false',
        explanation: 'Reads 01 from right to left. Therefore it is not a palindrome.'
      }
    ],
    constraints: [
      '-2^31 <= x <= 2^31 - 1'
    ],
    defaultCode: `/**
 * @param {number} x
 * @return {boolean}
 */
function isPalindrome(x) {
    // Your code here
    
};`
  },
  {
    id: 'fizzbuzz',
    title: '412. Fizz Buzz',
    difficulty: 'Easy',
    description: `
      <p>Given an integer <code>n</code>, return <em>a string array</em> <code>answer</code> (<strong>1-indexed</strong>) where:</p>
      <ul>
        <li><code>answer[i] == "FizzBuzz"</code> if <code>i</code> is divisible by <code>3</code> and <code>5</code>.</li>
        <li><code>answer[i] == "Fizz"</code> if <code>i</code> is divisible by <code>3</code>.</li>
        <li><code>answer[i] == "Buzz"</code> if <code>i</code> is divisible by <code>5</code>.</li>
        <li><code>answer[i] == i</code> (as a string) if none of the above conditions are true.</li>
      </ul>
    `,
    examples: [
      {
        input: 'n = 3',
        output: '["1","2","Fizz"]'
      },
      {
        input: 'n = 5',
        output: '["1","2","Fizz","4","Buzz"]'
      },
      {
        input: 'n = 15',
        output: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]'
      }
    ],
    constraints: [
      '1 <= n <= 10^4'
    ],
    defaultCode: `/**
 * @param {number} n
 * @return {string[]}
 */
function fizzBuzz(n) {
    // Your code here
    
};`
  },
  {
    id: 'merge-sorted',
    title: '88. Merge Sorted Array',
    difficulty: 'Easy',
    description: `
      <p>You are given two integer arrays <code>nums1</code> and <code>nums2</code>, sorted in <strong>non-decreasing order</strong>, and two integers <code>m</code> and <code>n</code>, representing the number of elements in <code>nums1</code> and <code>nums2</code> respectively.</p>
      <p><strong>Merge</strong> <code>nums1</code> and <code>nums2</code> into a single array sorted in <strong>non-decreasing order</strong>.</p>
      <p>The final sorted array should not be returned by the function, but instead be stored inside the array <code>nums1</code>. To accommodate this, <code>nums1</code> has a length of <code>m + n</code>, where the first <code>m</code> elements denote the elements that should be merged, and the last <code>n</code> elements are set to <code>0</code> and should be ignored. <code>nums2</code> has a length of <code>n</code>.</p>
    `,
    examples: [
      {
        input: 'nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3',
        output: '[1,2,2,3,5,6]',
        explanation: 'The arrays we are merging are [1,2,3] and [2,5,6]. The result of the merge is [1,2,2,3,5,6].'
      },
      {
        input: 'nums1 = [1], m = 1, nums2 = [], n = 0',
        output: '[1]',
        explanation: 'The arrays we are merging are [1] and []. The result of the merge is [1].'
      },
      {
        input: 'nums1 = [0], m = 0, nums2 = [1], n = 1',
        output: '[1]',
        explanation: 'The arrays we are merging are [] and [1]. The result of the merge is [1].'
      }
    ],
    constraints: [
      'nums1.length == m + n',
      'nums2.length == n',
      '0 <= m, n <= 200',
      '1 <= m + n <= 200',
      '-10^9 <= nums1[i], nums2[j] <= 10^9'
    ],
    defaultCode: `/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1, m, nums2, n) {
    // Your code here
    
};`
  },
  {
    id: 'reverse-string',
    title: '344. Reverse String',
    difficulty: 'Easy',
    description: `
      <p>Write a function that reverses a string. The input string is given as an array of characters <code>s</code>.</p>
      <p>You must do this by modifying the input array <a href="https://en.wikipedia.org/wiki/In-place_algorithm" target="_blank">in-place</a> with <code>O(1)</code> extra memory.</p>
    `,
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]'
      },
      {
        input: 's = ["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]'
      }
    ],
    constraints: [
      '1 <= s.length <= 10^5',
      's[i] is a printable ascii character.'
    ],
    defaultCode: `/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
function reverseString(s) {
    // Your code here
    
};`
  }
];
