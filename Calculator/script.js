var buttons = document.querySelectorAll("#calc span");
var operators = ["+", "-", "×", "÷"];
var decimalAdded = false;

buttons.forEach(function(button) {
  button.addEventListener("click", function(e) {
    var display = document.querySelector(".display");
    var displayVal = display.innerHTML;
    var btnVal = this.innerHTML;

    if (btnVal === "C") {
      display.innerHTML = "";
      decimalAdded = false;
    } else if (btnVal === "=") {
      var equation = displayVal;
      var lastChar = equation[equation.length - 1];

      equation = equation.replace(/×/g, "*").replace(/÷/g, "/");

      if (operators.indexOf(lastChar) > -1 || lastChar === ".")
        equation = equation.replace(/.$/, "");

      if (equation) {
        var result = eval(equation);
        display.innerHTML = parseFloat(result.toFixed(2));
      }

      decimalAdded = false;
    } else if (operators.indexOf(btnVal) > -1) {
      var lastChar = displayVal[displayVal.length - 1];

      if (displayVal !== "" && operators.indexOf(lastChar) === -1)
        display.innerHTML += btnVal;
      else if (displayVal === "" && btnVal === "-") display.innerHTML += btnVal;

      if (operators.indexOf(lastChar) > -1 && displayVal.length > 1) {
        display.innerHTML = displayVal.replace(/.$/, btnVal);
      }

      decimalAdded = false;
    } else if (btnVal === ".") {
      if (!decimalAdded) {
        display.innerHTML += btnVal;
        decimalAdded = true;
      }
    } else {
      display.innerHTML += btnVal;
    }

    e.preventDefault();
  });
});

const themeSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function toggleTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
}

themeSwitch.addEventListener("change", toggleTheme, false);
