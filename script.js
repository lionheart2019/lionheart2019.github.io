const startBtn = document.getElementById("start");
const screen = document.getElementById("screen");
const timer = document.getElementById("timer");
const answerArea = document.getElementById("answerArea");

let numbers = [];
let memorizeSeconds = 0;
let recallSeconds = 0;

function randomPair() {
    return Math.floor(Math.random() * 100)
        .toString()
        .padStart(2, "0");
}

startBtn.onclick = function () {

    numbers = [];
    screen.innerHTML = "";
    answerArea.innerHTML = "";

    const count = Number(document.getElementById("count").value);

    memorizeSeconds = Number(
        document.getElementById("memorizeTime").value
    );

    recallSeconds = Number(
        document.getElementById("recallTime").value
    );

    for (let i = 0; i < count; i++) {
        numbers.push(randomPair());
    }

    showNumbers();

};

function showNumbers() {

    screen.innerHTML = "";

    numbers.forEach(n => {

        screen.innerHTML +=
        `<div class="number">${n}</div>`;

    });

    startMemorizeTimer();

}

function startMemorizeTimer() {

    let time = memorizeSeconds;

    timer.innerHTML =
    "Memorize: " + formatTime(time);

    const interval = setInterval(() => {

        time--;

        timer.innerHTML =
        "Memorize: " + formatTime(time);

        if (time <= 0) {

            clearInterval(interval);

            startRecall();

        }

    },1000);

}

function formatTime(sec){

    const m =
    Math.floor(sec/60);

    const s =
    sec%60;

    return String(m).padStart(2,"0")
    + ":"
    + String(s).padStart(2,"0");

}
function startRecall() {

    screen.innerHTML = "";

    timer.innerHTML =
    "Recall: " + formatTime(recallSeconds);

    answerArea.innerHTML = `
    <textarea id="answer"
    placeholder="اكتب الأرقام بنفس الترتيب، وافصل بينها بمسافة"></textarea>

    <button onclick="finishGame()">
    Finish
    </button>
    `;

    let time = recallSeconds;

    const interval = setInterval(() => {

        time--;

        timer.innerHTML =
        "Recall: " + formatTime(time);

        if (time <= 0) {

            clearInterval(interval);

            finishGame();

        }

    },1000);

}

function finishGame() {

    const textarea =
    document.getElementById("answer");

    let user = [];

    if(textarea){

        user = textarea.value
        .trim()
        .split(/\s+/);

    }

    let correct = 0;

    let report = "";

    for(let i=0;i<numbers.length;i++){

        if(user[i]===numbers[i]){

            correct++;

            report += `
            <div class="correct">
            ${i+1}. ✔ ${numbers[i]}
            </div>
            `;

        }else{

            report += `
            <div class="wrong">
            ${i+1}. ✘
            الصحيح: <b>${numbers[i]}</b>
            |
            إجابتك:
            <b>${user[i]||"--"}</b>
            </div>
            `;

        }

    }

    const score =
    Math.round(correct/numbers.length*100);

    const best =
    Number(localStorage.getItem("bestScore")||0);

    if(score>best){

        localStorage.setItem("bestScore",score);

    }

    answerArea.innerHTML = `
    <div class="result">

    <h2>Score: ${score}%</h2>

    <h3>${correct} / ${numbers.length}</h3>

    <h3>Best Score:
    ${localStorage.getItem("bestScore")}%
    </h3>

    <br>

    <button onclick="location.reload()">
    Play Again
    </button>

    <hr><br>

    ${report}

    </div>
    `;

        }
