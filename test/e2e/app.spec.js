const express = require('express');
const expect = require('chai').expect;
const path = require('path');
const Nightmare = require('nightmare');

const app = express();

app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../dist')));

const url = 'http://localhost:8888';

const nightmare = new Nightmare();

describe('End to End Tests', () => {
    let httpServer = null;
    let pageObject = null;

    before((done) => {
        httpServer = app.listen(8888);
        done();
    });

    beforeEach(() => {
        pageObject = nightmare.goto(url);
    });

    after((done) => {
        httpServer.close();
        done();
    });

    it('should contain a <h1> element for the page title', () => { 
    return pageObject
        .evaluate(() => document.querySelector('h1').innerText)
        .then(headerText => {
        expect(headerText).to.not.be.null;
        expect(headerText).to.equal('Mortgage Calculator');
        });
    });

    it('should have an input element with the name of "principal"', () =>
    pageObject
        .evaluate(() => document.querySelector('input[name=principal]'))
        .then(input => expect(input).to.exist)
    );

    it('should have an input element with the name of "interestRate"', () =>
    pageObject
        .evaluate(() => document.querySelector('input[name=interestRate]'))
        .then(input => expect(input).to.exist)
    );

    it('should have an input element with the name of "loanTerm"', () =>
    pageObject
        .evaluate(() => document.querySelector('input[name=loanTerm]'))
        .then(input => expect(input).to.exist)
    );

    it('should have an input element with the name of "period"', () =>
    pageObject
        .evaluate(() => document.querySelector('select[name=period]'))
        .then(input => expect(input).to.exist)
    );

    it('should have a button element with id of "calculate"', () =>
    pageObject
        .evaluate(() => document.querySelector('button[id=calculate]'))
        .then(input => expect(input).to.exist)
    );

    it('should have a p element with id of "output"', () =>
    pageObject
        .evaluate(() => document.querySelector('p[id=output]'))
        .then(input => expect(input).to.exist)
    );

    it('should correctly calculate mortgage', () =>
        pageObject
        .wait()
        .type('input[name=principal]', 300000)
        .type('input[name=interestRate]', 3.75)
        .type('input[name=loanTerm]', 30)
        .select('select[name=period]', 12)
        .click('button#calculate')
        .wait('#output')
        .evaluate(() => document.querySelector('#output').innerText)
        .then((outputText) => {
            expect(outputText).to.equal('$1389.35');
        })
        ).timeout(6500);

})