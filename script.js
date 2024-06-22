const cellElements = document.querySelectorAll('[data-cell]');
const winningtext = document.querySelector('#winning-message-text');
const winningmessage = document.querySelector('#winningmessage');
const restart = document.querySelector('#restartButton')
const board = document.querySelector('#board');
const winning_combo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let oTurn;

startGame()
function startGame(){
    oTurn = false;
    cellElements.forEach(cell=>{
    cell.classList.remove('x');
    cell.classList.remove('o');
    cell.addEventListener('click',handleClick,{once:true})
    })
    setBoardHoverClass()
    winningmessage.classList.remove('show')
}

restart.addEventListener('click',startGame)

function handleClick(e){

    //adds class(x or o) to cell on click
    const cell = e.target;
    const currentClass = oTurn ? 'o' : 'x';
    cell.classList.add(currentClass);

    //check for winner
    if(checkWin(currentClass)){
        endGame(false)
    }
    else if(isDraw()){
        endGame(true);
    }
    else{

    //swaps class
    oTurn = !oTurn

    setBoardHoverClass()
    }


}

function setBoardHoverClass(){
    board.classList.remove('x');
    board.classList.remove('o');
    if(oTurn){
        board.classList.add('o')
    }
    else{
        board.classList.add('x')
    }
}

function endGame(draw){
    if(draw){
        winningtext.innerText = `Draw!`
    }

    else{
        winningtext.innerText = `${oTurn?"O's":"X's"} Wins!`
    }
winningmessage.classList.add('show')
}

function checkWin(currentClass){
    return winning_combo.some(combo=>{
        return combo.every(index=>{
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

function isDraw(){
    return [...cellElements].every(cell=>{
        return cell.classList.contains('x')||cell.classList.contains('o')
    })
}