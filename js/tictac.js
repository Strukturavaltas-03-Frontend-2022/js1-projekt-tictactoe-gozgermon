let WhosNext = true; /*true=X false=O*/
const WinnigCombinations = [0b000000111,
    0b000111000,
    0b111000000,
    0b001001001,
    0b010010010,
    0b100100100,
    0b100010001,
    0b001010100]

let x_moves = 0
let o_moves = 0
const check_winner = function () {
    for (let i = 0; i < WinnigCombinations.length; i++) {
        if ((x_moves & WinnigCombinations[i]) == WinnigCombinations[i]) {
            return 'X'
        }
        if ((o_moves & WinnigCombinations[i]) == WinnigCombinations[i]) {
            return 'O'
        }
    }
    return 'none'
}

const ClickHandler = function () {
    let tile_idx=parseInt(this.id)
    let WinnerDisp = document.querySelector("#winner_disp");
    if (!((o_moves | x_moves) & (1 << tile_idx))) {/*rakott e oda valaki már korábban?*/
        if (WhosNext) {
            this.children[0].innerHTML = 'X'
            x_moves = x_moves | (1 << tile_idx)/* feljegyezzük a lépést*/ 
            WhosNext = false
        }
        else {
            this.children[0].innerHTML = 'O'
            o_moves = o_moves | (1 << tile_idx)
            WhosNext = true
        }
        this.children[0].style.color = 'black' 

        if (check_winner() == 'X') {
            WinnerDisp.innerHTML = 'A nyertes:X!!!!'
            RemoveClickHandle()
        }
        if (check_winner() == 'O') {
            WinnerDisp.innerHTML = 'A nyertes:O!!!!'
            RemoveClickHandle()
        }
    }
}

const RemoveClickHandle=() => {
    let tiles = document.querySelectorAll(".tile");
    for (i = 0; i < tiles.length; i = i + 1) {
        tiles[i].removeEventListener("click", ClickHandler);
    }
}


const AddClickHandle = () => {
    let tiles = document.querySelectorAll(".tile");
    for (i = 0; i < tiles.length; i = i + 1) {
        tiles[i].addEventListener("click", ClickHandler);
    }
}

const NewGame = function () {
    x_moves = 0
    o_moves = 0
    let tiles = document.querySelectorAll(".tile");
    let WinnerDisp = document.querySelector("#winner_disp");

    WinnerDisp.innerHTML = 'A nyertes:'

    for (i = 0; i < tiles.length; i = i + 1) {
        tiles[i].children[0].style.color = 'blue'
    }
    AddClickHandle()
}

AddClickHandle()
