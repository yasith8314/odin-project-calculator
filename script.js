let buttons = ['empty', 'empty', 'AC', 'DEL', '7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '.', '0', '=', '+'];
let display = document.querySelector(".display");

let num1 = null;
let num2 = null;
let operator = null;


function calculate(num1, num2, op) {
    if (op == '+') {
        console.log(op);
        return num1 + num2;
    }
    else if (op == '-') {
        return num1 - num2;
    }
    else if (op == '*') {
        return num1 * num2;
    }
    else if (op == '/') {
        if (num2 == 0) {
            return "ERROR";
        }
        return num1 / num2;
    }
    
    return "ERROR";
}

function adjustFontToFit() {
    let fontSize = 60;
    display.style.fontSize = fontSize + 'px';

    while ((display.scrollWidth > display.clientWidth || display.scrollHeight > display.clientHeight) && fontSize > 5) {
        fontSize--;
        display.style.fontSize = fontSize + 'px';
    }
}


function renderButtons(){
    let div = document.querySelector('.buttons');

    for (let i = 0; i < buttons.length; i += 4) {
        let row = document.createElement('div');
        row.classList.add("row");

        for (let j = 0; j < 4; j++) {
            if (buttons[i + j] == 'empty') {
                continue;
            }

            let btn = document.createElement('button');
            btn.innerHTML = buttons[i + j];
            btn.id = buttons[i + j];

            if (['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'].includes(buttons[i + j])) {
                btn.addEventListener('click', () => {
                    if (display.innerHTML.length >= 14) {
                        return;
                    }

                    display.innerHTML = display.innerText + buttons[i + j];
                    adjustFontToFit();
                });
            }

            else if (buttons[i + j] == '.') {
                btn.addEventListener('click', () => {
                    if (display.innerText == '') {
                        display.innerText = '0.';
                    }
                    
                    else if (!(display.innerText.includes('.'))) {
                        display.innerHTML = display.innerText + buttons[i + j];
                    } 
                    document.getElementById(".").disabled = true;
                    
                });
            }

            else if (buttons[i + j] == "AC") {
                btn.addEventListener('click', () => {
                    display.innerHTML = '';
                    num1 = null;
                    num2 = null;
                    document.getElementById(".").disabled = false;
                });
            }
            else if (buttons[i + j] == "DEL") {
                btn.addEventListener('click', () => {
                    let num = display.innerHTML;
                    if (num == '') {
                        return;
                    }
                    else if (num[num.length - 1] == '.') {
                        document.getElementById(".").disabled = false;
                    }
                    display.innerHTML = num.slice(0, num.length - 1);
                });
            }

            else if (['+', '-', '/', '*'].includes(buttons[i + j])) {
                btn.addEventListener('click', () => {
                    if (num1 == null) {
                        num1 = parseFloat(display.innerText);
                        display.innerHTML = '';
                        document.getElementById(".").disabled = false;
                        operator = buttons[i + j];
                    }
                });
            }
            else if (buttons[i + j] == '=') {
                btn.addEventListener('click', () => {
                    if (num2 == null) {
                        num2 = parseFloat(display.innerText);
                        
                        if (typeof num2 != 'number' || typeof num1 != 'number') {
                            display.innerHTML = 'ERROR';
                            return;
                        }
                        
                        let ans = calculate(num1, num2, operator);

                        if (typeof ans == 'number' && ans % 1 != 0) {
                            let decimalLength = Math.log10(parseInt(ans));
                            ans = parseFloat(ans.toFixed(Math.max(14 - decimalLength, 1)));
                        }

                        display.innerHTML = ans;

                        num1 = null;
                        num2 = null;
                        operator = null;
                    }
                });
            }


            row.appendChild(btn);
        }
        div.appendChild(row);
    }
}

document.addEventListener("keydown", (event) => {
    let keys = ['Escape', 'Backspace', '7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '.', '0', 'Enter', '+'];

    if (keys.includes(event.key)) {
         event.preventDefault(); 
        document.getElementById(buttons[keys.indexOf(event.key) + 2]).click();
    }
});

renderButtons();

function triggerAnimation(btn) {
  btn.classList.add('animate');
  setTimeout(() => btn.classList.remove('animate'), 100); // match transition time
}

document.querySelectorAll('button').forEach(btn => btn.addEventListener("click", function() {
    triggerAnimation(this);
}));
