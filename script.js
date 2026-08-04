const startBtn = document.getElementById("start");
const screen = document.getElementById("screen");
const answerArea = document.getElementById("answerArea");

let numbers = [];
let current = 0;

function randomPair() {
    return Math.floor(Math.random() * 100)
        .toString()
        .padStart(2, "0");
}

startBtn.onclick = () => {

    numbers = [];
    current = 0;
const memorizeTime =
Number(document.getElementById("memorizeTime").value);

const recallTime =
Number(document.getElementById("recallTime").value);
    const count = Number(document.getElementById("count").value);

    for (let i = 0; i < count; i++) {
        numbers.push(randomPair());
    }

    startBtn.style.display = "none";

screen.innerHTML =
numbers.join(" ");

let timeLeft = memorizeTime;

const timer = setInterval(() => {

timeLeft--;

screen.innerHTML =
numbers.join(" ") +
"<br><br><h2>Memorize: " +
timeLeft +
" sec</h2>";

if(timeLeft <= 0){

clearInterval(timer);

screen.innerHTML="";

showAnswerPage();

let recall = recallTime;

const recallTimer = setInterval(()=>{

recall--;

document.querySelector("h2").innerHTML =
"Recall: " + recall + " sec";

if(recall <= 0){

clearInterval(recallTimer);
    function finishGame() {

    const user = document
        .getElementById("answer")
        .value
        .trim()
        .split(/\s+/);

    let correct = 0;
    let report = "";

    for (let i = 0; i < numbers.length; i++) {

        if (user[i] === numbers[i]) {

            correct++;

            report += `
            <div style="color:#22c55e;margin:6px;">
            ${i + 1}. ✔ ${numbers[i]}
            </div>
            `;

        } else {

            report += `
            <div style="color:#ff7070;margin:6px;">
            ${i + 1}. ✘
            الصحيح: <b>${numbers[i]}</b>
            |
            إجابتك: <b>${user[i] || "--"}</b>
            </div>
            `;

        }

    }

    const score = Math.round(correct / numbers.length * 100);

    answerArea.innerHTML = `
    <h2>النتيجة</h2>

    <h1>${score}%</h1>

    <h3>${correct} / ${numbers.length}</h3>

    <button onclick="location.reload()">
    العب مرة أخرى
    </button>

    <hr>

    ${report}
    `;
    }



}

},1000);

}

},1000);
};

function showNext() {

    const speed = Number(document.getElementById("speed").value);

    if (current >= numbers.length) {

        screen.innerHTML = "";

        showAnswerPage();

        return;
    }

    screen.innerHTML = `
        <div style="
        font-size:120px;
        font-weight:bold;
        margin-top:40px;
        ">
        ${numbers[current]}
        </div>
    `;

    current++;

    setTimeout(showNext, speed);

}

function showAnswerPage() {

    answerArea.innerHTML = `
    <h2>Recall</h2>

    <textarea
    id="answer"
    placeholder="07 54 81 23 ..."
    ></textarea>

    <button onclick="finishGame()">
    Finish
    </button>
    `;

}

function finishGame() {

    const user =
        document
        .getElementById("answer")
        .value
        .trim()
        .split(/\s+/);

    let correct = 0;

    let report = "";

    for (let i = 0; i < numbers.length; i++) {

        if (user[i] === numbers[i]) {

            correct++;

        } else {

            report += `
            <div style="
            color:#ff7070;
            margin:6px;
            ">
            ${i + 1}.
            Correct:
            <b>${numbers[i]}</b>
            |
            Yours:
            <b>${user[i] || "--"}</b>
            </div>
            `;

        }

    }

    const score =
        Math.round(correct / numbers.length * 100);

    answerArea.innerHTML = `

    <h2>Score</h2>

    <h1>${score}%</h1>

    <h3>${correct} / ${numbers.length}</h3>

    <br>

    <button onclick="location.reload()">
    Play Again
    </button>

    <br><br>

    ${report}

    `;

}
