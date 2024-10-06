let ballCount = 0;
let score = 0;
let overScore = [];
let currentOverScore = 0;
let wickets = 0;
let over = 1;
let team = 1;
let team1Score = 0;

function addBallInCont(button) {
  if (wickets < 10 && ballCount < 6) {
    const ballCont = document.querySelector(".ballCont");
    const div = document.createElement("div");
    // div.innerHTML = button.innerHTML;
    ballCont.appendChild(div);
    ballCount++;
    if (button.innerHTML !== "Dot Ball") {
      if (button.innerHTML !== "Wicket") {
        const run = parseInt(button.innerHTML);
        score += run;
        currentOverScore += run;
        div.innerHTML = button.innerHTML;
      } else {
        div.innerHTML = "W";
        wickets++;
        if (wickets == 10) {
          endOver();
        }
      }
    } else {
      div.innerHTML = "D";
    }
    if (ballCount == 6) {
      newOver();
    }
    updateCurrentScore();
  }
}

function addExtraBallInCont(button) {
  if (wickets < 10) {
    const ballCont = document.querySelector(".ballCont");
    const div = document.createElement("div");
    let type = button.innerHTML === "Wide Ball" ? "WB" : "NB";
    score += 1;
    currentOverScore += 1;
    div.innerHTML = type;
    ballCont.appendChild(div);
    updateCurrentScore();
  }
}

function addBallInContAndCheckWinner(button) {
  addBallInCont(button);
  checkWinner();
}
function addExtraBallInContAndCheckWinner(button) {
  addExtraBallInCont(button);
  checkWinner();
}
function newOver() {
  overScore.push(currentOverScore);
  const overWiseScore = document.querySelector(".overWiseScore");
  const div = document.createElement("div");
  div.innerHTML = `Team ${team}: Over ${over}, Score:${currentOverScore}runs`;

  overWiseScore.appendChild(div);
  const newOverBtn = document.createElement("button");
  newOverBtn.innerHTML = "New Over";
  disableBtn();
  document.querySelector(".buttonsCont").appendChild(newOverBtn);
  newOverBtn.addEventListener("click", () => {
    enableBtn();
    document
      .querySelector(".buttonsCont")
      .removeChild(document.querySelector(".buttonsCont button:last-child"));
    const ballCont = document.querySelector(".ballCont");
    ballCont.innerHTML = "";
  });
  ballCount = 0;

  currentOverScore = 0;
  if (over === 20) {
    endOver();
  } else {
    over++;
  }
}

function updateCurrentScore() {
  const currentScore = document.querySelector(".currentScore");
  currentScore.innerHTML = `Current: Team ${team}, Over: ${over}, Score: ${score}runs, Wickets :${wickets}`;
}
function disableBtn() {
  const buttons = document.querySelectorAll(".buttonsCont button");

  buttons.forEach((button) => {
    button.disabled = true;
    button.style.backgroundColor = "gray";
  });
}
function enableBtn() {
  const buttons = document.querySelectorAll(".buttonsCont button");

  buttons.forEach((button) => {
    button.disabled = false;
    button.style.backgroundColor = "#2196f3";
  });
}
function checkWinner() {
  if (team == 2 && score > team1Score) {
    declareWinner(2, 10 - wickets, "wickets");
  } else if (wickets == 10) {
    if (team == 1) {
      endOver();
    } else {
      declareWinner(1, team1Score - score, "runs");
    }
  }
}

function endOver() {
  if (team == 1) {
    team = 2;
    team1Score = score;
    console.log(team1Score);
    score = 0;
    wickets = 0;
    over = 1;
    console.log(over);
    ballCount = 0;
    const FinalMsg = document.querySelector(".FinalMsg");
    FinalMsg.innerHTML = `<h2>Team 1 final score :${team1Score}`;

    const button = document.createElement("button");
    button.innerHTML = "Team 2";
    disableBtn();
    document.querySelector(".buttonsCont").appendChild(button);
    button.addEventListener("click", () => {
      enableBtn();
      updateCurrentScore();
      const ballCont = document.querySelector(".ballCont");
      ballCont.innerHTML = "";
      const overWiseScore = document.querySelector(".overWiseScore");
      overWiseScore.innerHTML = "";
      document
        .querySelector(".buttonsCont")
        .removeChild(document.querySelector(".buttonsCont button:last-child"));
    });
  } else {
    declareWinner(1, team1Score - score, "runs");
  }
}
function declareWinner(winnerTeam, mode, type) {
  const winningText = `Team ${winnerTeam} won by ${mode} ${type}`;
  console.log(winningText);
  const winnerMsg = document.querySelector(".winnerMsg");
  winnerMsg.innerHTML = `Match complete! ${winningText}`;
  disableBtn();
  const overWiseScore = document.querySelector(".overWiseScore");
  overWiseScore.innerHTML = "";
  const FinalMsg = document.querySelector(".FinalMsg");
  FinalMsg.innerHTML = `<h2>Team 1 final score: ${team1Score}runs<br/>Team 2 final score: ${score}runs</h2>`;

  const newGameBtn = document.createElement("button");
  newGameBtn.innerHTML = "New Game";
  document.querySelector(".buttonsCont").appendChild(newGameBtn);
  newGameBtn.addEventListener("click", () => {
    newgame();
  });
}
function newgame() {
  const ballCont = document.querySelector(".ballCont");
  ballCont.innerHTML = "";
  enableBtn();
  const winnerMsg = document.querySelector(".winnerMsg");
  winnerMsg.innerHTML = "";
  const FinalMsg = document.querySelector(".FinalMsg");
  FinalMsg.innerHTML = "";
  const overWiseScore = document.querySelector(".overWiseScore");
  overWiseScore.innerHTML = "";
  const currentScore = document.querySelector(".currentScore");
  currentScore.innerHTML = "";
  ballCount = 0;
  score = 0;
  overScore = [];
  currentOverScore = 0;
  wickets = 0;
  over = 1;
  team = 1;
  team1Score = 0;
  document
    .querySelector(".buttonsCont")
    .removeChild(document.querySelector(".buttonsCont button:last-child"));
}
document.querySelector("#button1").addEventListener("click", (event) => {
  addBallInContAndCheckWinner(event.target);
});
document.querySelector("#button2").addEventListener("click", (event) => {
  addBallInContAndCheckWinner(event.target);
});
document.querySelector("#button3").addEventListener("click", (event) => {
  addBallInContAndCheckWinner(event.target);
});
document.querySelector("#button4").addEventListener("click", (event) => {
  addBallInContAndCheckWinner(event.target);
});
document.querySelector("#button5").addEventListener("click", (event) => {
  addBallInContAndCheckWinner(event.target);
});
document.querySelector("#button6").addEventListener("click", (event) => {
  addBallInContAndCheckWinner(event.target);
});

document.querySelector("#wicket").addEventListener("click", (event) => {
  addBallInContAndCheckWinner(event.target);
});
document.querySelector("#dot").addEventListener("click", (event) => {
  addBallInContAndCheckWinner(event.target);
});
document.querySelector("#wide").addEventListener("click", (event) => {
  addExtraBallInContAndCheckWinner(event.target);
});
document.querySelector("#no").addEventListener("click", (event) => {
  addExtraBallInContAndCheckWinner(event.target);
});
