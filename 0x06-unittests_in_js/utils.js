/**
 * utility module
 */
const Utils = {
  /**
 * Adds, subtracts or divides two numbers depending
 * on operator type specified
 * @param   {string}  type  - SUM, SUBTRACT, or DIVIDE
 * @param   {number}  a
 * @param   {number}  b
 * @returns {number}  -  The result of operation of a and b
 */
  calculateNumber(type, a, b) {
    const numOne = Math.round(a);
    const numTwo = Math.round(b);
    switch (type) {
      case 'SUM':
        return numOne + numTwo;
      case 'SUBTRACT':
        return numOne - numTwo;
      case 'DIVIDE':
        if (!numTwo) return 'Error';
        return numOne / numTwo;
      default:
        throw new Error('Operation not supported. Type must be SUM, SUBTRACT or DIVIDE');
    }
  },
};

module.exports = Utils;
