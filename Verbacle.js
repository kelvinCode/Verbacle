let allQuestions = [ 
    {
        question: "Legs are to humans as wheels are to ...",
        isInput: true,
        answers: [
            {text: "cars", correct: true}, //input box question
        ]
    },
    {
        question: "We ... things up by having a small meal.",
        isInput: false, 
        answers: [
            {text: "Wrapped", correct: true}, 
            {text: "Rapped", correct: false},
            {text: "Both are correct", correct: false}
        ]
    },
    {
        question: "All he's good for is splitting ...",
        isInput: false, 
        answers: [
            {text: "Hares", correct: false}, 
            {text: "Hairs", correct: true},
            {text: "Both are correct", correct: false}
        ]
    },
    {
        question: "Something that is entirely made of organs is called a(n)",
        isInput: true, 
        answers: [
            {text: "organism", correct: true}, 
        ]
    }
]

//randomly sort the array then let a function present the generated quiz

let easyModeButton = document.getElementById("easyModeButton")
    easyModeButton.textContent = "EASY MODE"
    easyModeButton.addEventListener("click", giveQuestion)

let mediumModeButton = document.getElementById("mediumModeButton")
    mediumModeButton.textContent = "MEDIUM MODE"

let hardModeButton = document.getElementById("hardModeButton")
    hardModeButton.textContent = "HARD MODE"

let questionBox = document.getElementById("questionBox")
let questionText = document.getElementById("questionText")
let answerContainer = document.getElementById("answerContainer")
let nextButtonDiv = document.getElementById("nextButtonDiv")

let currentQuestion = 0
let questionTimer = 1000
let generatedQuiz = allQuestions.sort(() => Math.random() - 0.5)
// every time the page is refreshed, the items in allQuestions are randomly shuffled.

function giveQuestion() {
    questionText.textContent = generatedQuiz[currentQuestion].question
    if (generatedQuiz[currentQuestion].isInput === true) {
        let answerInput = document.createElement("input")
        answerContainer.appendChild(answerInput)
    } else {
        generatedQuiz[currentQuestion].answers.forEach(answers => {
            let answerButton = document.createElement("button")
                answerButton.textContent = answers.text
            answerContainer.appendChild(answerButton)
        });
    }
    let nextButton = document.createElement("button")
        nextButton.textContent = "Next"
        nextButton.addEventListener("click", nextQuestion)
    nextButtonDiv.appendChild(nextButton)
}

function nextQuestion() {
    currentQuestion++
    giveQuestion()
}

//things to add:
//* function which deletes the options from the previous question
// so that they don't stack onto the current options.
//* add "restart" button
//* function before "giveQuestion" that makes the intro text and difficulty
// buttons disappear, then calls the "giveQuestion" function