
var maxScore = 100;
var scores, roundScore, activePlayer, gamePlaying, previousDice, previousDice2;

init();



document.querySelector('.btn-roll').addEventListener('click', function() {
    
    if(gamePlaying) {
       // 1. Random number
        
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        
    
        // 2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        var diceDOM2 = document.querySelector('.dice2');
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png';
        
        
        // 3. Update the roundscore If the rolled number was NOT a 1 & throw was not six second time in a row.
        if (dice === 6 && previousDice === 6) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = 0;
            nextPlayer();
        }
        
        if (dice2 === 6 && previousDice2 === 6) {
            nextPlayer();
        }
        
        if (dice !== 1) {
            if (dice2 !== 1) {
                roundScore += dice;
                roundScore += dice2;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
                previousDice = dice;
                previousDice2 = dice2;
            } else {
                //Next player
                nextPlayer();                 
            
            } 
            
        }
            
        
        //previousDice = dice;
    
    
        
    }
    
    
    
});

document.querySelector('.btn-setScore').addEventListener('click', function() {
    var num1 = prompt('Enter a value', "0");
    var num2 = parseInt(num1);
    if (num2 > 0) {
        maxScore = num2;
    }
    
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
       // Add CURRENT score to Global Score
        scores[activePlayer] += roundScore;
    
    
    
        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
    
        // Check if player won the game
        if (scores[activePlayer] >= maxScore) {      
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';     
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        
        } 
    }
    
    
    
    
    
    
    
});


// Changes player to next one
function nextPlayer() {
    
    //Initialize previous dice
    previousDice = 0;
    previousDice2 = 0;
    
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
        
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
        
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
        
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');
        
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    previousDice = 0;
    
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');   
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
    
    
}

function setScore (score) {
    maxScore = score;
}



//document.querySelector('.dice').style.display = 'none';

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//var x = document.querySelector('#score-0').textContent;
//console.log(x);