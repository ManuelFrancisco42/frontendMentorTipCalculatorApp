// Get DOM elements
const billElement = document.getElementById("input-bill");
const tipBtnsElements = document.querySelectorAll(".tip");
const tipCustomElement = document.getElementById("input-tip");
const peopleElement = document.getElementById("input-people");
const errorMsgElement = document.querySelector(".error-msg");
const resultsElements = document.querySelectorAll(".value");
const resetBtnElement = document.querySelector(".reset");

// Add event listeners
billElement.addEventListener("input", setBillValue);
tipBtnsElements.forEach((btn) => {
    btn.addEventListener("click", handleTipClick);
});
tipCustomElement.addEventListener("input", setTipCustomValue);
peopleElement.addEventListener("input", setPeopleValue);
resetBtnElement.addEventListener("click", reset);

// Initial values
let billValue = 0.0;
let tipValue = 0.15;
let peopleValue = 1;

// Validate input using a regex to allow only numbers and a single decimal point
function validateNumberInput(value) {
    const rgx = /^[0-9]*\.?[0-9]*$/;
    return rgx.test(value);
}

// Validate integer input
function validateIntegerInput(value) {
    const rgx = /^[0-9]*$/;
    return rgx.test(value);
}

// Set bill value and recalculate tip
function setBillValue() {
    let value = billElement.value.replace(",", ".");
    if (validateNumberInput(value)) {
        billValue = parseFloat(value) || 0;
    } else {
        billElement.value = billElement.value.slice(0, -1);
    }
    calculateTip();
}

// Handle tip button click, set active state, and clear custom tip input
function handleTipClick(event) {
    tipBtnsElements.forEach((btn) => {
        btn.classList.remove("btn-active");
        if (event.target === btn) {
            btn.classList.add("btn-active");
            tipValue = parseFloat(btn.innerHTML) / 100;
        }
    });
    tipCustomElement.value = "";
    calculateTip();
}

// Set custom tip value and recalculate tip
function setTipCustomValue() {
    let value = tipCustomElement.value;
    if (validateIntegerInput(value)) {
        tipValue = parseFloat(value) / 100 || 0;
    } else {
        tipCustomElement.value = tipCustomElement.value.slice(0, -1);
    }
    tipBtnsElements.forEach((btn) => btn.classList.remove("btn-active"));
    if (value !== "") {
        calculateTip();
    }
}

// Set number of people and handle error message for invalid input
function setPeopleValue() {
    let value = peopleElement.value;
    if (validateIntegerInput(value)) {
        peopleValue = parseInt(value) || 1;
    } else {
        peopleElement.value = peopleElement.value.slice(0, -1);
    }

    if (peopleValue <= 0) {
        errorMsgElement.classList.add("show-error-msg");
        setTimeout(() => {
            errorMsgElement.classList.remove("show-error-msg");
        }, 3000);
    }
    calculateTip();
}

// Calculate and display tip amount and total per person
function calculateTip() {
    if (peopleValue > 0) {
        let tipAmount = (billValue * tipValue) / peopleValue;
        let total = (billValue * (1 + tipValue)) / peopleValue;
        resultsElements[0].innerHTML = "$" + tipAmount.toFixed(2);
        resultsElements[1].innerHTML = "$" + total.toFixed(2);
    }
}

// Reset all values to default
function reset() {
    billElement.value = "0.0";
    setBillValue();
    tipBtnsElements[2].click(); // Assuming the 15% tip button is the third one
    peopleElement.value = "1";
    setPeopleValue();
}
