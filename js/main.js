const X_CLASS = 'x';
const O_CLASS = 'o';

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const fieldEl = document.querySelectorAll('[data-cell]');
const board = document.querySelector('#board');
const messageEl = document.querySelector('#winner-message')
const btn = document.querySelector('#restart-btn')
const message = document.querySelector('[data-winning-message-text]')

let oTurn;
btn.addEventListener('click', start);
start();
function start() {
    oTurn = false;
    fieldEl.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    messageEl.classList.remove('show');

}

function handleClick(e) {
    // place mark
    // console.log(e.target)
    let cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);

    // check for win
    if (checkWin(currentClass)) {
        endGame(false);
        console.log('winner');
    } else if (checkDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }

    // check for draw
    // switch turn

    console.log('click');
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    oTurn = !oTurn;
}
function checkDraw() {
    return [...fieldEl].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}
function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (oTurn) {
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

// Ovdje prolazimo kroz niz nizova kako bismo utvrdili
// da li  su tri kliknuta elemnta pogadju neku od kombinacija

function checkWin(currentClass) {
    console.log('====== Ovo je klasa', currentClass)
    // kada su sve tri kombinacije unutrar every true, onda vrati ovdje true
    return WINNING_COMBINATIONS.some(combination => {
        console.log("ovo je kombinacija", combination);

        // every provjerava da li svaki elemnt ima istu klasu
        return combination.every(i => {
            console.log('Ovo je prolaz', i);
            // Ovdje vrti dok god ne naidje na TRUE
            // console.log(fieldEl[i], i, currentClass);
            console.log(fieldEl)
            console.log(fieldEl[i].classList.contains(currentClass));
            // Vraca true kada naidje na poziciju elemnt u nizu elemenata
            return fieldEl[i].classList.contains(currentClass);
        });
    });
}

function endGame(draw) {
    if (draw) {
        message.innerText = 'draw';
    } else {
        message.innerText = `${oTurn ? "O's" : "X's"} Wins!`;
    }
    messageEl.classList.add('show');
}

// console.log(18 >= 10);