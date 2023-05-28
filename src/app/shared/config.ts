const appConstants = {
	// baseUrl: "http://localhost:3000",
	baseUrl: process.env.REACT_APP_BASE_URL,
	login: `login`,
	logger: `logger`,
};

const problems = {
	"1": {
		title: "Two Sum",
		description:
			"Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
		functionSignature:
			"function twoSum(nums: number[], target: number): number[]",
		functionDescription:
			"Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
		exampleInput: "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1].",
		exampleOutput:
			"Output: Because nums[0] + nums[1] == 9, we return [0, 1]",
		constraints: [
			"2 <= nums.length <= 10^3",
			"-10^9 <= nums[i] <= 10^9",
			"-10^9 <= target <= 10^9",
			"Only one valid answer exists.",
			"You may not use the same element twice.",
		],
	},
	"2": {
		title: "Calculator with Python",
		description:
			"You are tasked with building a simple calculator tool that can perform basic arithmetic operations. The tool should allow users to input two numbers and choose an operation (addition, multiplication, or division), and then display the result of the operation. Additionally, the tool should be able to handle input validation to prevent errors from occurring.",
		functionSignature:
			"function twoSum(nums: number[], target: number): number[]",
		functionDescription:
			"Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
		exampleInput: "Input: nums = [2,7,11,15], target = 9",
		exampleOutput:
			"Output: Because nums[0] + nums[1] == 9, we return [0, 1].",
		constraints: [
			"2 <= nums.length <= 10^3",
			"-10^9 <= nums[i] <= 10^9",
			"-10^9 <= target <= 10^9",
			"Only one valid answer exists.",
			"You may not use the same element twice.",
		],
	},
	"3": {
		title: "Reverse String",
		description:
			"Write a function that takes a string as input and returns the string reversed.",
		functionSignature: "function reverseString(s: string): string",
		functionDescription:
			"Given a string `s`, you need to reverse the string without using any extra space.",
		exampleInput: 'Input: s = "hello"',
		exampleOutput: 'Output: "olleh"',
		constraints: [
			"1 <= s.length <= 10^5",
			"s consists of printable ASCII characters.",
		],
	},
	"4": {
		title: "Palindrome Number",
		description:
			"Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.",
		functionSignature: "function isPalindrome(x: number): boolean",
		functionDescription:
			"Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise. The function should handle negative numbers as well.",
		exampleInput: "Input: x = 121",
		exampleOutput: "Output: true",
		constraints: ["-2^31 <= x <= 2^31 - 1"],
	},
	"5": {
		title: "Fizz Buzz",
		description:
			"Write a program that outputs the string representation of numbers from 1 to n. But for multiples of three, it should output 'Fizz' instead of the number, and for the multiples of five, it should output 'Buzz'. For numbers which are multiples of both three and five, output 'FizzBuzz'.",
		functionSignature: "function fizzBuzz(n: number): string[]",
		functionDescription:
			"Given an integer `n`, generate a list of strings from 1 to n based on the rules mentioned above.",
		exampleInput: "Input: n = 15",
		exampleOutput:
			"Output: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz']",
		constraints: ["1 <= n <= 10^4"],
	},
	"6": {
		title: "Single Number",
		description:
			"Given a non-empty array of integers, every element appears twice except for one. Find that single number.",
		functionSignature: "function singleNumber(nums: number[]): number",
		functionDescription:
			"Given an array `nums` where every element appears twice except for one, find and return the single number.",
		exampleInput: "Input: nums = [2,2,1]",
		exampleOutput: "Output: 1",
		constraints: [
			"1 <= nums.length <= 3 * 10^4",
			"-3 * 10^4 <= nums[i] <= 3 * 10^4",
			"Each element in the array appears twice except for one element which appears only once.",
		],
	},
	"7": {
		title: "Maximum Subarray",
		description:
			"Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
		functionSignature: "function maxSubArray(nums: number[]): number",
		functionDescription:
			"Given an array `nums`, find the contiguous subarray with the largest sum and return the sum of that subarray.",
		exampleInput: "Input: nums = [-2,1,-3,4,-1,2,1,-5,4]",
		exampleOutput: "Output: 6",
		constraints: [
			"1 <= nums.length <= 2 * 10^4",
			"-2^31 <= nums[i] <= 2^31 - 1",
		],
	},
	"8": {
		title: "Valid Parentheses",
		description:
			"Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
		functionSignature: "function isValid(s: string): boolean",
		functionDescription:
			"Given a string `s` containing parentheses characters, determine if the parentheses are valid. An input string is valid if:",
		exampleInput: 'Input: s = "()[]{}"',
		exampleOutput: "Output: true",
		constraints: [
			"1 <= s.length <= 10^4",
			"s consists only of '(', ')', '{', '}', '[' and ']' characters.",
		],
	},
	"9": {
		title: "Reverse Integer",
		description:
			"Given a signed 32-bit integer `x`, reverse its digits. If reversing `x` causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.",
		functionSignature: "function reverse(x: number): number",
		functionDescription:
			"Given an integer `x`, reverse its digits and return the reversed integer. If the reversed integer is outside the range [-2^31, 2^31 - 1], return 0.",
		exampleInput: "Input: x = 123",
		exampleOutput: "Output: 321",
		constraints: ["-2^31 <= x <= 2^31 - 1"],
	},
	"10": {
		title: "Remove Duplicates from Sorted Array",
		description:
			"Given a sorted array `nums`, remove the duplicates in-place such that each element appears only once and returns the new length.",
		functionSignature: "function removeDuplicates(nums: number[]): number",
		functionDescription:
			"Given a sorted integer array `nums`, modify the array in-place such that each unique element appears only once. Return the new length of the modified array.",
		exampleInput: "Input: nums = [1,1,2]",
		exampleOutput: "Output: 2",
		constraints: [
			"0 <= nums.length <= 3 * 10^4",
			"-10^4 <= nums[i] <= 10^4",
			"nums is sorted in non-decreasing order.",
		],
	},
};

export default appConstants;
export { problems };
