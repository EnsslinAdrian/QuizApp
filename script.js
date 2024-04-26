let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3
    },

    {
        "question": "Was ist Python?",
        "answer_1": "Eine Datenbank-Software",
        "answer_2": "Eine Programmiersprache",
        "answer_3": "Ein Betriebssystem",
        "answer_4": "Ein Netzwerkprotokoll",
        "right_answer": 2
    },

    {
        "question": "Was bedeutet 'OOP' in der Programmierung?",
        "answer_1": "Open Office Protocol",
        "answer_2": "Object Oriented Programming",
        "answer_3": "Operating Operational Process",
        "answer_4": "Official Operational Procedure",
        "right_answer": 2
    },

    {
        "question": "Welche Sprache wird hauptsächlich für die Entwicklung von Android-Apps verwendet?",
        "answer_1": "Swift",
        "answer_2": "C++",
        "answer_3": "Java",
        "answer_4": "JavaScript",
        "right_answer": 3
    },

    {
        "question": "Was beschreibt 'CSS'?",
        "answer_1": "Customer Support Software",
        "answer_2": "Cascading Style Sheets",
        "answer_3": "Centralized System Services",
        "answer_4": "Core Security Standards",
        "right_answer": 2
    },

    {
        "question": "Was ist ein Framework in der Softwareentwicklung?",
        "answer_1": "Eine Hardware-Plattform",
        "answer_2": "Ein Programmiertool",
        "answer_3": "Eine Server-Software",
        "answer_4": "Eine Software-Struktur zur Unterstützung der Entwicklung",
        "right_answer": 4
    },

    {
        "question": "Welche Sprache wird traditionell für die Programmierung von iOS-Apps verwendet?",
        "answer_1": "Objective-C",
        "answer_2": "Python",
        "answer_3": "Ruby",
        "answer_4": "PHP",
        "right_answer": 1
    },

    {
        "question": "Was ist ein Algorithmus?",
        "answer_1": "Eine spezielle Art von Software-Bug",
        "answer_2": "Eine Dokumentationsmethode",
        "answer_3": "Eine Fehlerbehebungstechnik",
        "answer_4": "Eine Schritt-für-Schritt-Anweisung zur Lösung eines Problems",
        "right_answer": 4
    }

];

let currentQuestion = 0;
let rightQuestions = 0;
let Audio_succes = new Audio('audio/right.mp3');
let Audio_fall = new Audio('audio/fail.mp3');

function init() {
    document.getElementById('questionLength').innerHTML = questions.length;
    showQuestion();
}

function showQuestion() {
    if (gameIsOver()) {
        showEndScreen();
    } else {
        updateProgressBar();
        updateToNextQuestion();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);

    document.getElementById('progressbar').innerHTML = `${percent} %`;
    document.getElementById('progressbar').style = `width: ${percent}%`;
}

function updateToNextQuestion() {
    let question = questions[currentQuestion];

    document.getElementById('current-position').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function showEndScreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display: none';
    document.getElementById('header-image').src = './img/pokal.png'

    document.getElementById('questionPosition').innerHTML = questions.length;
    document.getElementById('amount-right-questions').innerHTML = rightQuestions;
}

function answer(selection) {
    let question = questions[currentQuestion]; // currentQuestion ist unser zähler für unser Json der am anfang bei null ist
    let selecteQuestionNum = selection.slice(-1); // nimmt von der onclick funktion answer_1 die letzte ziffer mit .slice(-1) selecteQuestionNum ist damit die Zahl

    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (rightAnswerSelected(selecteQuestionNum)) {
        rightQuestions++;
        document.getElementById(selection).parentNode.classList.add('bg-success'); //parentNode benutzt man um auf das elternelement zuzugreifen 
        Audio_succes.play();
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        Audio_fall.play();
    }
    document.getElementById('next-button').disabled = false; // disable = false benutzen wir weil wir dem buttun disable gegeben haben und wenn diese funktion ausgeführt wird wird es deaktieviert
}

function rightAnswerSelected(selecteQuestionNum) {
    return selecteQuestionNum == questions['right_answer'];
}

function nextQuestion() {
    currentQuestion++; // currentQuestion wird um 1 erhöt damit sind wir beim näschten json
    document.getElementById('next-button').disabled = true;
    resetAnswerButtons();
    showQuestion();
}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function restartGame() {
    document.getElementById('header-image').src = './img/question.jpg';
    document.getElementById('endScreen').style = 'display: none';
    document.getElementById('questionBody').style = '';
    currentQuestion = 0;
    rightQuestions = 0;
    init();
}