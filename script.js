let buttons = ['empty', 'empty', 'AC', 'DEL', '7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '.', '0', '=', '+'];
let display = document.querySelector(".display");

function renderButtons(){
    let div = document.querySelector('.buttons');

    for (let i = 0; i < buttons.length; i += 4) {
        let row = document.createElement('div');
        row.classList.add("row");

        for (let j = 0; j < 4; j++) {
            let btn = document.createElement('button');
            btn.innerHTML = buttons[i + j];
            btn.id = buttons[i + j];

            
            if (buttons[i + j] in ['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0']) {
                btn.addEventListener('click', () => {
                    display.innerHTML = display.innerText + buttons[i + j];
                });
            }

            row.appendChild(btn);

        }
        div.appendChild(row);
    }
}

renderButtons();
