const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const output = document.getElementById("output");

let currentValue = "";
let operator = "";
let result = 0;

for (let button of buttons) {
  button.addEventListener("click", handleButton);
}

function handleButton(event) {
  const buttonValue = event.target.value;
  if (!isNaN(buttonValue) || buttonValue === ".") {
    // Button is a number or decimal point
    currentValue += buttonValue;
    display.value = currentValue;
  } else {
    switch (buttonValue) {
      case "C":
        // Clear button
        currentValue = "";
        operator = "";
        result = 0;
        display.value = "";
        break;
      case "%":
        // Percentage button
        if (currentValue !== "") {
          currentValue = parseFloat(currentValue) / 100;
          display.value = currentValue;
        }
        break;
      case "M+":
        // Memory add button
        if (currentValue !== "") {
          result += parseFloat(currentValue);
        }
        break;
      case "M-":
        // Memory subtract button
        if (currentValue !== "") {
          result -= parseFloat(currentValue);
        }
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        // Operator button
        if (currentValue !== "") {
          if (operator !== "") {
            calculate();
          } else {
            result = parseFloat(currentValue);
          }
          operator = buttonValue;
          currentValue = "";
        }
        break;
      case "=":
        // Equals button
        if (currentValue !== "") {
          calculate();
        }
        break;
      default:
        output.textContent = "Invalid button: " + buttonValue;
    }
  }
}

function calculate() {
  switch (operator) {
    case "+":
      result += parseFloat(currentValue);
      break;
    case "-":
      result -= parseFloat(currentValue);
      break;
    case "*":
      result *= parseFloat(currentValue);
      break;
    case "/":
      result /= parseFloat(currentValue);
      break;
  }
  currentValue = "";
  operator = "";
  display.value = result;
}
