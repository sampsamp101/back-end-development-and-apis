const assert = require("node:assert/strict");
const {isPrime} = require("./index");

// primes
assert.strictEqual(isPrime(2), true);
assert.strictEqual(isPrime(3), true);
assert.strictEqual(isPrime(5), true);
assert.strictEqual(isPrime(97), true);

// not primes
assert.strictEqual(isPrime(4), false);
assert.strictEqual(isPrime(5462), false);
assert.strictEqual(isPrime(100), false);

// edge cases
assert.strictEqual(isPrime(1), false);
assert.strictEqual(isPrime(0), false);
assert.strictEqual(isPrime(-7), false);

console.log("All tests passed!");