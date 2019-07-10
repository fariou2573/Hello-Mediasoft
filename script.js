'use strict';

class Util {
    static isNullOrUndefined(value) {
        return value === null || value === undefined;
    }
}

class Calculator {
    static ALLOWED_MATH_SYMBOLS_REGEXP = /^([-+]?[0-9]*\.?[0-9]+[\/\+\-\*])+([-+]?[0-9]*\.?[0-9]+)/;
    static FIND_WHITESPACE_REGEXP = /\s/g;

    isValidExpression(rawExpression) {
        return Calculator.ALLOWED_MATH_SYMBOLS_REGEXP.test(rawExpression);
    }

    evaluateExpression(rawExpression) {
        let preprocessedExpression =
            !Util.isNullOrUndefined(rawExpression) ? rawExpression.replace(Calculator.FIND_WHITESPACE_REGEXP, '') : '';

        if (this.isValidExpression(preprocessedExpression)) {
            try {
                let evaluatedValue = eval(preprocessedExpression);
                if (!Util.isNullOrUndefined(evaluatedValue)) {
                    return evaluatedValue;
                }
            } catch { }
        }

        throw new Error("incorrect expression");
    }
}

const LINE_SEPARATOR = '\r\n';
const ERROR_MESSAGE =  'Строка не является корректной математической операцией';
const WELCOME_MESSAGE = `Введите математическое выражение. ${LINE_SEPARATOR} Допустимые операции + - / *`;
const CALCULATOR = new Calculator();

let cancelPressed = false;
let response;

while (!cancelPressed) {
    let isResponsePresent = !Util.isNullOrUndefined(response);
    let rawStringValue = prompt(`${isResponsePresent ? response : ''} ${LINE_SEPARATOR}${WELCOME_MESSAGE}`);

    if (!rawStringValue) {
        cancelPressed = true;
        continue;
    }

    try {
        response = CALCULATOR.evaluateExpression(rawStringValue);
    } catch (error) {
        response = ERROR_MESSAGE;
    }
}