/**
 * sendPaymentRequestToAPi method test suite.
 */
const sinon = require('sinon');
const { expect } = require('chai');
const Utils = require('./utils');
const sendPaymentRequestToAPi = require('./3-payment');

describe('sendPaymentRequestToApi', function() {
  describe('#Utils.calculateNumber()', function() {
    it('should be called with args from sendPaymentRequestToApi', function() {
      const spy = sinon.spy(Utils, 'calculateNumber');
      sendPaymentRequestToAPi(100, 20);
      expect(spy.calledOnce).to.equal(true);
      expect(spy.calledWith('SUM', 100, 20)).to.equal(true);
      spy.restore();
    });
  });
});
