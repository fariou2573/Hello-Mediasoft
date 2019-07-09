'use strict';

class Calculator {
    evaluateExpression(rawExpression) {
        try {
            let evaluatedValue = eval(rawExpression);
            if (evaluatedValue) {
                return evaluatedValue;
            }
        } catch { }
        throw new Error("incorrect expression");
    }
}

const ERROR_MESSAGE =  'Строка не является корректной математической операцией';
const LINE_SEPARATOR = '\r\n';
const CALCULATOR = new Calculator();

let cancelPressed = false;
let response;

while (!cancelPressed) {
    let rawStringValue = prompt(`${response ? response : ''} ${LINE_SEPARATOR}Введите математическое выражение.`);

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