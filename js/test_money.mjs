// const assert = require("assert");
// const Money = require("./money");
// const Portfolio = require("./portfolio");

import * as assert from "assert";
import {Money} from "./money.mjs";
import {Portfolio} from "./portfolio.mjs";

// Old refactored tests
// let fiver = new Money(5)
// let tenner = fiver.times(2)
// assert.strictEqual(tenner.amount, 10)

// assert.deepStrictEqual(fiveDollars.times(2), tenDollars);

class MoneyTest {
    testMultiplication() {
        let tenEuros = new Money(10, "EUR");
        // let twentyEuros = tenEuros.times( 2);
        let twentyEuros = new Money(20, "EUR")
        // assert.strictEqual(twentyEuros.amount, 20);
        // assert.strictEqual(twentyEuros.currency, "EUR");
        assert.deepStrictEqual(tenEuros.times(2), twentyEuros)
    }

    testDivision() {
        let originalMoney = new Money(4002, "KRW");
        let actualMoneyAfterDivision = originalMoney.divide(4);
        let expectedMoneyAfterDivison = new Money(1000.5, "KRW");
        assert.deepStrictEqual(actualMoneyAfterDivision, expectedMoneyAfterDivison);
    }

    testAddition() {
        let fiveDollars = new Money(5, "USD");
        let tenDollars = new Money(10, "USD");
        let fifteenDollars = new Money(15, "USD");
        let portfolio = new Portfolio();
        portfolio.add(fiveDollars, tenDollars);
        assert.deepStrictEqual(portfolio.evaluate("USD"), fifteenDollars);
    }

    testAdditionOfDollarsAndEuros() {
        let fiveDollars = new Money(5, "USD")
        let tenEuros = new Money(10, "EUR");
        let portfolio = new Portfolio();
        portfolio.add(fiveDollars, tenEuros);
        let expectedValue = new Money(17, "USD")
        assert.deepStrictEqual(portfolio.evaluate("USD"), expectedValue)
    }

    getAllTestMethods() {
        // return ["testMultiplication", 'testDivision', 'testAddition']
        let moneyPrototype = MoneyTest.prototype
        let allProps = Object.getOwnPropertyNames(moneyPrototype)
        return allProps.filter(p => {
            return typeof moneyPrototype[p] === 'function' && p.startsWith("test")
        })
    }

    runAllTests() {
        // this.testMultiplication()
        // this.testDivision()
        // this.testAddition()
        let testMethods = this.getAllTestMethods()
        testMethods.forEach(m => {
            console.log("Running: %s()", m)
            let method = Reflect.get(this, m)
            try {
                Reflect.apply(method, this, [])
            } catch (e) {
                if (e instanceof assert.AssertionError) {
                    console.log(e)
                } else {
                    throw e
                }
            }
        })
    }
}

new MoneyTest().runAllTests()
