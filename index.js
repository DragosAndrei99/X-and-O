let squares = document.querySelectorAll('.squares');
let freeSquares = [];
let filledSquares = [];
let gameWon = [];
let squaresArr = Array.from(squares);
const startButton = document.getElementById('startButton');
const XScore = document.getElementById('XScore');
const OScore = document.getElementById('OScore');
let player = '';
let computer = '';
let reverseXandO = true;
const switchButton = document.getElementById('switch');
let round = document.getElementById('round');

function reinitializeSquares(){
    gameWon = [];
    squares = document.querySelectorAll('.squares');
    squaresArr = Array.from(squares);
}

function startGame() {
    round.innerText++;

    if(reverseXandO){
        player = 'X';
        computer = 'O';
    } else {
        player = 'O';
        computer = 'X';
    }
    switchButton.disabled = 'disabled';
    startButton.disabled = 'disabled';

    squares.forEach(square => {
        if (square.innerText === '') {
            square.addEventListener('click', () => {
                playerTurn(square, player);
                disableFilledSquares();
                if(checkWinner()){
                    return newGame();
                } else{
                    checkForTie();
                }
                computerTurn(computer);
                disableFilledSquares();
                if(checkWinner()){
                    return newGame();
                } else{
                    checkForTie();
                }
            })
        }
    })
}

function playerTurn(square, xOrO) {
    square.innerText = xOrO;
}

function checkFilled(){
    squaresArr.forEach(square => {
        if (!(square.innerText === '') && !(filledSquares.includes(square))) {
            filledSquares.push(square)
        }
    })
}

//getting rid of the event listener => disabling the filled squares
function disableFilledSquares() {
    checkFilled();
    cloneAndReplace(filledSquares)
    filledSquares = [];
}

function computerTurn(xOrO) {
    squares.forEach(square => {
        if (square.innerText === '') {
            freeSquares.push(square);
        }
    })
    const randomNum = Math.floor(Math.random() * (freeSquares.length));
    if(freeSquares.length > 0){
        freeSquares[randomNum].innerText = xOrO;
    }
    freeSquares = [];
}

function checkWinner(){
    reinitializeSquares();
    gameWon.push([squaresArr[0],squaresArr[1], squaresArr[2]], [squaresArr[3], squaresArr[4], squaresArr[5]], [squaresArr[6], squaresArr[7], squaresArr[8]],
                [squaresArr[0], squaresArr[3], squaresArr[6]], [squaresArr[1], squaresArr[4], squaresArr[7]], [squaresArr[2], squaresArr[5], squaresArr[8]],
                [squaresArr[0], squaresArr[4], squaresArr[8]], [squaresArr[2], squaresArr[4], squaresArr[6]]);
    
    function loopThroughArray(){
        for(let i = 0; i < gameWon.length; i++){
            if(gameWon[i][0].innerText === gameWon[i][1].innerText 
                && gameWon[i][0].innerText  === gameWon[i][2].innerText  
                && gameWon[i][0].innerText !== ''){
                    console.log('Winner is' + gameWon[i][0].innerText);
                    if(gameWon[i][0].innerText === 'X'){
                        XScore.innerText++;
                    }else if(gameWon[i][0].innerText === 'O'){
                        OScore.innerText++;
                    }
                    return true;
            }
        }
    }
    return loopThroughArray();
}

function checkForTie(){
    reinitializeSquares();
    if(squaresArr.every(square =>{
        return square.innerText !== '';
    })){
        newGame();
    }
}

function newGame(){
    setTimeout(()=>{

        cloneAndReplace(squares);
        reinitializeSquares();
        squares.forEach(square =>{
            square.innerText = '';
        })
    },1000);
    setTimeout(()=>{
        startButton.disabled = '';
        switchButton.disabled = '';
    }, 1500);
}

function switchXAndO(){
    let tempScore = '';
    if(reverseXandO){
        reverseXandO = false;
        tempScore = XScore.innerText;
        XScore.innerText = OScore.innerText;
        OScore.innerText = tempScore;
        XScore.previousElementSibling.innerText = 'Computer(X): '
        OScore.previousElementSibling.innerText = 'Player(O): '

    }else{
        reverseXandO = true;
        tempScore = XScore.innerText;
        XScore.innerText = OScore.innerText;
        OScore.innerText = tempScore;
        XScore.previousElementSibling.innerText = 'Player(X): '
        OScore.previousElementSibling.innerText = 'Computer(O): '
    }
}

//reassigning to squares variable to have also the cloned nodes included in the nodelist
function cloneAndReplace(arr){
    arr.forEach(square => {
        const newSquare = square.cloneNode(true);
        square.replaceWith(newSquare)
    })
}