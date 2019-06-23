const URL = "http://it-pokemon.webappcraft.com/";
let idQuiz = 0;
let games = 0;

async function startNewQuiz() {
    const options = {
        method: "POST"
    };

    const response = await fetch(URL + 'quiz', options);
    if (response.status === 200) {
        let jsonresponse = await response.json();
        idQuiz = jsonresponse.id;
        games = jsonresponse.questionCount;
        console.log(idQuiz);
        getQuestion();
    }
}


async function getQuestion() {
    const response = await fetch(URL + "quiz/" + idQuiz + "/question");
    if (response.status === 200) {
        let jsonresponse = await response.json();
        let question = jsonresponse.name;
        document.getElementById('question').innerText = question;
        console.log(question);
        games = games - 1;
    }
    if (response.status === 404) {
        document.getElementById('question').innerText = "Quiz given by quizId was not found"
    }
}

function pokeAnswer() {
    checkAnswer(0);
}

function itAnswer() {
    checkAnswer(1)
}

async function checkAnswer(answerId) {
    const body = {
        answer: answerId
    };
    const options = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
        }

    };
    const response = await fetch(URL + "quiz/" + idQuiz + "/answer", options);
    if (response.status === 200) {
        const responsejson = await response.json();
        console.log(responsejson.details.url);
        if (responsejson.correct === true) {
            correctAnswer(responsejson);
        }
        incorrectAnswer(responsejson);

    }

}

function incorrectAnswer(responsejson) {
    document.getElementById('answer').innerText = "Incorrect";
    document.getElementById('answerurl').setAttribute("href", responsejson.details.url);
}

function correctAnswer(responsejson) {
    document.getElementById('answer').innerText = "Correct";
    document.getElementById('answerurl').setAttribute("href", responsejson.details.url);
}

async function nextQuestion() {
    if (games === 0) {
        const response = await fetch(URL + "quiz/" + idQuiz + "/score");
        if (response.status === 200) {
            let jsonresponse = await response.json();
            let quizscore = jsonresponse.score;
            document.getElementById('score').innerText = "END, your score is: " + quizscore;
        }
    }
    getQuestion();

}








