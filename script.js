const startBtn = document.getElementById("start");
const screen = document.getElementById("screen");
const answerArea = document.getElementById("answerArea");

let numbers = [];
let index = 0;

function randomNumber() {
    return Math.floor(Math.random() * 100)
        .toString()
        .padStart(2, "0");
}

startBtn.onclick = function () {

    numbers = [];
    index = 0;

    let count = Number(document.getElementById("count").value);

    for (let i = 0; i < count; i++) {
        numbers.push(randomNumber());
    }

    startBtn.disabled = true;

    showNumbers();

};

function showNumbers() {

    let speed = Number(document.getElementById("speed").value);

    if (index < numbers.length) {

        screen.innerHTML = numbers[index];

        index++;

        setTimeout(showNumbers, speed);

    } else {

        screen.innerHTML = "";

        answerArea.innerHTML = `
        <textarea id="answer"
        placeholder="Type numbers separated by spaces"></textarea>

        <button onclick="checkAnswer()">
        Check
        </button>
        `;

    }

}

function checkAnswer() {

    let user = document
        .getElementById("answer")
        .value
        .trim()
        .split(/\s+/);

    let correct = 0;

    for (let i = 0; i < numbers.length; i++) {

        if (user[i] === numbers[i]) {

            correct++;

        }

    }

    let percent = Math.round(correct / numbers.length * 100);

    answerArea.innerHTML += `
    <h2 style="margin-top:20px">
    Score: ${correct}/${numbers.length}
    </h2>

    <h3>
    Accuracy: ${percent}%
    </h3>

    <br>

    <b>Correct sequence</b>

    <br><br>

    ${numbers.join(" ")}
    `;

}
