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
            {text: "Wrapped", isCorrect: true}, 
            {text: "Rapped", isCorrect: false},
            {text: "Both are correct", isCorrect: false}
        ]
    },
    {
        question: "All he's good for is splitting ...",
        isInput: false, 
        answers: [
            {text: "Hares", isCorrect: false}, 
            {text: "Hairs", isCorrect: true},
            {text: "Both are correct", isCorrect: false}
        ]
    },
    {
        question: "Something that is entirely made of organs is called a(n)",
        isInput: true, 
        answers: [
            {text: "organism"}, 
            {text: "Organism"},
        ]
    }
]

let introPage = document.getElementById("introPage")
let easyModeButton = document.getElementById("easyModeButton")
easyModeButton.textContent = "EASY MODE"
easyModeButton.addEventListener("click", clearStartPage)
let mediumModeButton = document.getElementById("mediumModeButton")
mediumModeButton.textContent = "MEDIUM MODE"
mediumModeButton.addEventListener("click", giveQuestion)
let hardModeButton = document.getElementById("hardModeButton")
hardModeButton.textContent = "HARD MODE"
hardModeButton.addEventListener("click", giveQuestion)

let quizPage = document.getElementById("quizPage")
let questionBox = document.getElementById("questionBox")
let questionText = document.getElementById("questionText")
let answerContainer = document.getElementById("answerContainer")
let timerContainer = document.getElementById("timerContainer")
let revealContainer = document.getElementById("revealContainer")
let quizOptionsDiv = document.getElementById("quizOptionsDiv")
let resultsPage = document.getElementById("resultsPage")

let currentQuestion = 0
let correctAnswerCount = 0
let generatedQuiz = allQuestions.sort(() => Math.random() - 0.5)

function clearStartPage() {
    easyModeButton.removeEventListener("click", clearStartPage)
    introPage.style.transitionDuration = "0.3s"
    introPage.style.opacity = 0
    setTimeout(nextPage, 1000)
    function nextPage() {
        introPage.remove()
        giveQuestion()
    }
}
        
function giveQuestion() {
    quizPage.style.transitionDuration = "0.5s"
    quizPage.style.opacity = 1
    if (currentQuestion < generatedQuiz.length) {
        let nextButton = document.createElement("button")
        nextButton.textContent = "Next"
        nextButton.style.fontFamily = "Corbel"
        quizOptionsDiv.appendChild(nextButton)
        let restartButton = document.createElement("button")
        restartButton.textContent = "Restart"
        restartButton.style.fontFamily = "Corbel"
        quizOptionsDiv.appendChild(restartButton)
        questionText.textContent = generatedQuiz[currentQuestion].question
        let questionTimeAmount = 15
        timerContainer.textContent = questionTimeAmount
        let questionCountdown = setInterval(deductOne, 1000)
        function deductOne() {
            if (questionTimeAmount === 0) {
                console.log("you're outta time buddy")
                nextButton.addEventListener("click", showNextQuestion)
                clearInterval(questionCountdown)
            } else {
                questionTimeAmount--
            }
            timerContainer.textContent = questionTimeAmount
        }
        if (generatedQuiz[currentQuestion].isInput) {
            let answerInput = document.createElement("input")
            answerContainer.appendChild(answerInput)
            answerInput.addEventListener("keypress", inputEntryResponse)
                function inputEntryResponse(keyboard) {
                if (keyboard.key === "Enter") {
                    let inputAnswerChecker = 0
                    generatedQuiz[currentQuestion].answers.forEach(checkAnswerText)
                    function checkAnswerText(thisAnswer) {
                        inputAnswerChecker++
                        if (answerInput.value === thisAnswer.text) {
                            console.log("You correct, homie")
                            clearInterval(questionCountdown)
                            correctAnswerCount++
                            nextButton.addEventListener("click", showNextQuestion)
                        } else if (inputAnswerChecker >= generatedQuiz[currentQuestion].answers.length) {
                            console.log("rong")
                            clearInterval(questionCountdown)
                            nextButton.addEventListener("click", showNextQuestion)
                        }
                    }
                } else {
                    return null
                }
            }
        } else {
            generatedQuiz[currentQuestion].answers.forEach(addButton)
            function addButton(thisAnswer) {
                let answerButton = document.createElement("button")
                answerButton.textContent = thisAnswer.text
                answerButton.style.fontFamily = "Corbel"
                answerButton.style.padding = "1em 2em 1em 2em"
                answerButton.className = "option"
                answerContainer.appendChild(answerButton)
                answerButton.addEventListener("click", buttonClickResponse)
                function buttonClickResponse() {
                    if (thisAnswer.isCorrect) {
                        console.log("I guess you're right")
                        clearInterval(questionCountdown)
                        correctAnswerCount++
                        nextButton.addEventListener("click", showNextQuestion)
                    } else {
                        console.log("u wrong")
                        clearInterval(questionCountdown)
                        nextButton.addEventListener("click", showNextQuestion)
                    }
                }
            }
        }
        function showNextQuestion() {
            answerContainer.textContent = null
            revealContainer.textContent = null
            quizOptionsDiv.removeChild(nextButton)
            quizOptionsDiv.removeChild(restartButton)
            currentQuestion++
            giveQuestion()
        }
    } else if (currentQuestion >= generatedQuiz.length) {
        questionBox.remove()
        let congratsMessage = document.createElement("p")
        congratsMessage.textContent = "congrats bro you made the function work"
        congratsMessage.style.fontFamily = "Corbel"
        congratsMessage.style.textAlign = "center"
        let totalScore = document.createElement("p")
        totalScore.textContent = correctAnswerCount + "/" + generatedQuiz.length
        totalScore.style.fontFamily = "Corbel"
        totalScore.style.textAlign = "center"
        resultsPage.appendChild(congratsMessage)
        resultsPage.appendChild(totalScore)
    }
}

// current features:
// * every time the page is refreshed, the items in allQuestions are randomly shuffled.
// * function "buttonClickResponse" checks to see if an input answer is correct
// * function "checkAnswerText" uses a forEach method on the answers array, adds 1 to an  
// index number after each iteration, and tells the user that they're right if their input 
// matches one answer in the array, and wrong if the index is over the array length

// observations:
// * parameter for a function called in the "forEach" parentheses always refers to a 
// single item in the array mentioned before the forEach.
// * because you have to start from 0 when counting array items using an index, the 
// array.length ends up being +1 higher than the last number counted by the index, 
// since the array.length assumes that the array items are being counted from 1. 
// * "++" means you want the function to add 1 to the variable
// * Time in Javascript is measured in milliseconds, so type "1000" if you want to put
// a second in your code

// things to add:
// * give the "restart" button its functionality
// * function before "giveQuestion" that makes the intro text and difficulty
// buttons disappear, then calls the "giveQuestion" function