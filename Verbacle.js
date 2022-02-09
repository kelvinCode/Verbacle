let allQuestions = [ 
    {
        question: "Legs are to humans as wheels are to ...",
        isInput: true,
        answers: [
            {text: "cars"}, 
            {text: "Cars"},
            {text: "vehicles"},
            {text: "Vehicles"},
            {text: "trucks"},
            {text: "Trucks"}
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
        correctAnswer: "organism"
    }
]

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
let quizOptionsDiv = document.getElementById("quizOptionsDiv")

let currentQuestion = 0
let questionTimer = 1000
let generatedQuiz = allQuestions.sort(() => Math.random() - 0.5)

function giveQuestion() {
    let nextButton = document.createElement("button")
    nextButton.textContent = "Next"
    quizOptionsDiv.appendChild(nextButton)
    let restartButton = document.createElement("button")
    restartButton.textContent = "Restart"
    quizOptionsDiv.appendChild(restartButton)
    questionText.textContent = generatedQuiz[currentQuestion].question
    if (generatedQuiz[currentQuestion].isInput) {
        let answerInput = document.createElement("input")
        answerContainer.appendChild(answerInput)
        answerInput.addEventListener("keypress", inputEntryResponse)
        function inputEntryResponse(target) {
            if (target.key === "Enter") {
                function showNextQuestion1() {
                    currentQuestion++
                    answerContainer.removeChild(answerInput)
                    quizOptionsDiv.removeChild(nextButton)
                    quizOptionsDiv.removeChild(restartButton)
                    giveQuestion()
                }
                if (answerInput.value === generatedQuiz[currentQuestion].correctAnswer) {
                    console.log("You correct, homie")
                    nextButton.addEventListener("click", showNextQuestion1)
                } else {
                    console.log("U ah ded rong")
                    nextButton.addEventListener("click", showNextQuestion1)
                }
            } else {
                return null
            }
        }
    } else {
        generatedQuiz[currentQuestion].answers.forEach(addButtons)
        function addButtons(iLoveJavascript) {
            let answerButton = document.createElement("button")
            answerButton.textContent = iLoveJavascript.text
            answerButton.className = "option"
            answerContainer.appendChild(answerButton)
            answerButton.addEventListener("click", buttonClickResponse)
            function buttonClickResponse() {
                function showNextQuestion2() {
                    let oldAnswerButtons = document.getElementsByClassName("option")
                    currentQuestion++
                    quizOptionsDiv.removeChild(nextButton)
                    quizOptionsDiv.removeChild(restartButton)
                    giveQuestion()
                }
                if (iLoveJavascript.correct) {
                    console.log("I guess you're right")
                    nextButton.addEventListener("click", showNextQuestion2)
                } else {
                    console.log("u wrong")
                    nextButton.addEventListener("click", showNextQuestion2)
                }
            }
        }
    }
}

// current features:
// * every time the page is refreshed, the items in allQuestions are randomly shuffled.
// * function "buttonClickResponse" checks to see if an input answer is correct

// observations:
// * parameter for addButtons always refers to answers array, regardless of parameter name

// things to add:
// * function which deletes the options from the previous question
// so that they don't stack onto the current options.
// * add "restart" button
// * function before "giveQuestion" that makes the intro text and difficulty
// buttons disappear, then calls the "giveQuestion" function
// * add conditional that checks if the input for answer input questions is correct