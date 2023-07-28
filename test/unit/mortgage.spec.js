const expect = require('chai').expect;
const Mortgage = require('../../src/js/lib/Mortgage');

describe('Mortgage Calculator', () => {
    let mortgage = null;

    beforeEach(() => {
        mortgage = new Mortgage(300000,3.75,30,12);
    });

    it('should have a monthly payment method', () => {
        expect(mortgage.monthlyPayment).to.exist;
    });
    
    it('should return correct monthly payment', () => {
        expect(mortgage.monthlyPayment()).to.equal('1389.35');
    });
});