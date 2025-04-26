let score = {
    wins: 0,
    ties: 0,
    losses: 0,
} || JSON.parse(localStorage.getItem('score')) // only supports getting strings, hence the JSON parse.

updateScoreElement();

let isAutoPlaying = false;
let intervalID;


function autoPlay() {
    if (!isAutoPlaying) {
        intervalID = setInterval(() => {
            const playerMove = getComputerMove();
            verdict(playerMove);
        }, 1000);
        isAutoPlaying = true;
    } else {
        clearInterval(intervalID);
        isAutoPlaying = false;
    }
}

function getComputerMove() {
    const options = ["Rock", "Paper", "Scissors"];
    const randomIndex = Math.floor(Math.random() * options.length)
    return options[randomIndex]
}

function hasPlayerWonRound(player, computer) {
    return (
        (player === "Rock" && computer === "Scissors") || 
        (player === "Scissors" && computer === "Paper") ||
        (player === "Paper" && computer === "Rock")
    );
}
function verdict(player) {
    let computer = getComputerMove();

    let verdict;
    if (hasPlayerWonRound(player, computer)) {
        verdict = "Player Won";
        score.wins += 1;
    } else if (computer === player) { 
        verdict = "Tie";
        score.ties += 1;
    } else { 
        verdict = "Player Lost";
        score.losses += 1;
    }
    //console.log(verdict + " because computer played " + computer)
    document.querySelector('.js-result').innerHTML = verdict;
    moves = `You <img src=images/${player}-emoji.png class="move-icon"> <img src=images/${computer}-emoji.png class="move-icon"> Computer`;
    document.querySelector('.js-moves').innerHTML = moves;

    localStorage.setItem('score', JSON.stringify(score)); // only supports storing strings
    updateScoreElement();
}


function updateScoreElement() {
    let scores = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
    document.querySelector('.js-score').innerHTML = scores;
}

/*
document.querySelector('.auto-play').addEventListener('click', () => {
    autoPlay();
})

^this won't work because by the time something subscribes to the event, it's too late.
*/
