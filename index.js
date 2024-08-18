

//creating variables for the cells for the game, identifying the players, and beginning the game
let cell1 = $('#cell-1');
let cell2 = $('#cell-2');
let cell3 = $('#cell-3');
let cell4 = $('#cell-4');
let cell5 = $('#cell-5');
let cell6 = $('#cell-6');
let cell7 = $('#cell-7');
let cell8 = $('#cell-8');
let cell9 = $('#cell-9');

let player1 = "X";
let player2 = "O";

let turn = 0;
let winner = false;

//uses jquery to hide the alerts initially
$('#gameStart').hide();
$('#winner').hide();
$('#drawGame').hide();

//keeps track of the current player
let currentPlayer = '';

//arrays for what combination of cells will determine a winner
const winningCombos = [[cell1, cell2, cell3], [cell4, cell5, cell6], [cell7, cell8, cell9], [cell1, cell4, cell7], [cell2, cell5, cell8], [cell3, cell6, cell9], [cell1, cell5, cell9], [cell3, cell5, cell7]];

//function to end the game after a winner is declared
const finishGame = () => {
    console.log('Game Over');
    $(".box").css("pointer-events", "none");
    $('#player1').removeClass("bg-success border border-info");
    $('#player2').removeClass("bg-success border border-info");
};

//function to check for a winner 
const checkForWinner = (currentPlayer, a, b, c) => {
    console.log(a);
    console.log(b.text())
    console.log(c.text())
    console.log(currentPlayer);

    console.log(a.text() === currentPlayer && b.text() === currentPlayer && c.text() === currentPlayer);
    if(a.text() === currentPlayer && b.text() === currentPlayer && c.text() === currentPlayer){
        winner = true;
        console.log(`${currentPlayer} wins!`);

        a.removeClass('text-info bg-dark');
        a.addClass('text-dark bg-info');

        b.removeClass('text-info bg-dark');
        b.addClass('text-dark bg-info');

        c.removeClass('text-info bg-dark');
        c.addClass('text-dark bg-info');


        if(currentPlayer === 'X'){
            currentPlayer = "Player 1";
        }
        else{
            currentPlayer = "Player 2";
        }
        $('#winner').text(`End of Game: Winner is ${currentPlayer}`);
        $('#winner').show();

        finishGame();
    }
};

//defines function to run the checkForWinner function
const checkOutcome = () => {
    checkForWinner(currentPlayer, ...winningCombos[0]);
    checkForWinner(currentPlayer, ...winningCombos[1]);
    checkForWinner(currentPlayer, ...winningCombos[2]);
    checkForWinner(currentPlayer, ...winningCombos[3]);
    checkForWinner(currentPlayer, ...winningCombos[4]);
    checkForWinner(currentPlayer, ...winningCombos[5]);
    checkForWinner(currentPlayer, ...winningCombos[6]);
    checkForWinner(currentPlayer, ...winningCombos[7]);

    if(turn === 9 && winner === false){
        finishGame();
        $('#drawGame').show();
        // $('#player1').removeClass("bg-success border border-info");
        // $('#player2').removeClass("bg-success border border-info");
    }
};


//function to start the game and begin incrementing turns starting at 0
const gameStart = () => {
    console.log("Start Game")
    console.log(turn++);
    currentPlayer = player1;
    console.log(currentPlayer);

    $('#player1').addClass("bg-success border border-info");

    //display the start game alert
    $('#gameStart').show();

//jquery to allow the current player to click on a box and hides the start game alert
    $('.box').on('click', function(){
        $('#gameStart').hide();

        $(this).text(currentPlayer);

        //conditional logic to see if there's a winner after a certain number of turns
        if(turn >= 4){
            console.log('possible winner');
            checkOutcome();
        }

        if(winner === false){
                    //conditional logic to alternate between players each turn, adding and removing the background to indicate whose turn it is
        if(currentPlayer === player1){
            currentPlayer = player2;
            console.log(turn++);
            $('#player2').addClass("bg-success border border-info");
            $('#player1').removeClass("bg-success border border-info");
        }
        else{
            currentPlayer = player1;
            console.log(turn++);
            $('#player1').addClass("bg-success border border-info");
            $('#player2').removeClass("bg-success border border-info");
            }
        }
    })
};

//adding functionality to the start and reset buttons
document.getElementById('startButton').addEventListener('click', () => gameStart());

document.getElementById('resetButton').addEventListener('click', () => document.location.reload(true));