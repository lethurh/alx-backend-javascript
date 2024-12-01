// utils.js
const Utils = {
  calculateNumber: function (type, a, b) {
    if (type === 'SUM') {
      return Math.round(a) + Math.round(b);
    }
    throw new Error('Invalid type');
  },
};

module.exports = Utils;
