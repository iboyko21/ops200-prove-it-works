const expect = require('chai').expect;
const Calculator = require('../../src/js/lib/Calculator');

describe('Calculator', () => {
    let calculator = null;

    beforeEach(() => {
        calculator = new Calculator();
    });

    it('should hav an add function', () => {
        expect(calculator.add).to.exist;
    });

    it('should add 2 + 2 together correctly', () => {
        expect(calculator.add(2,2)).to.equal(4);
    });
});