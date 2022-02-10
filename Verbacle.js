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
let timerContainer = document.getElementById("timerContainer")
let revealContainer = document.getElementById("revealContainer")
let quizOptionsDiv = document.getElementById("quizOptionsDiv")
let quizResultsContainer = document.getElementById("quizResultsContainer")

let currentQuestion = 0
let correctAnswerCount = 0
let generatedQuiz = allQuestions.sort(() => Math.random() - 0.5)
        
function giveQuestion() {
    easyModeButton.removeEventListener("click", giveQuestion)
    if (currentQuestion >= generatedQuiz.length) {
        questionBox.remove()
        let congratsMessage = document.createElement("p")
        congratsMessage.textContent = "congrats bro you made the function work"
        congratsMessage.style.fontFamily = "Corbel"
        congratsMessage.style.textAlign = "center"
        let totalScore = document.createElement("p")
        totalScore.textContent = correctAnswerCount + "/" + generatedQuiz.length
        totalScore.style.fontFamily = "Corbel"
        totalScore.style.textAlign = "center"
        quizResultsContainer.appendChild(congratsMessage)
        quizResultsContainer.appendChild(totalScore)
    } else {
        let nextButton = document.createElement("button")
        nextButton.textContent = "Next"
        nextButton.style.fontFamily = "Corbel"
        quizOptionsDiv.appendChild(nextButton)
        let restartButton = document.createElement("button")
        restartButton.textContent = "Restart"
        restartButton.style.fontFamily = "Corbel"
        quizOptionsDiv.appendChild(restartButton)
        questionText.textContent = generatedQuiz[currentQuestion].question
        let questionTimeAmount = 10
        let questionCountdown = setInterval(deductOne, 1000)
        function deductOne() {
            timerContainer.textContent = questionTimeAmount
            questionTimeAmount--
        }
        if (generatedQuiz[currentQuestion].isInput) {
            let answerInput = document.createElement("input")
            answerContainer.appendChild(answerInput)
            answerInput.addEventListener("keypress", inputEntryResponse)
            function inputEntryResponse(keyboard) {
                if (keyboard.key === "Enter") {
                    generatedQuiz[currentQuestion].answers.find(checkAnswerText)
                    function checkAnswerText(thisAnswer) {
                        if (answerInput.value === thisAnswer.text) {
                            console.log("You correct, homie")
                            correctAnswerCount++
                            nextButton.addEventListener("click", showNextQuestion)
                        } else {
                            console.log("rong")
                            nextButton.addEventListener("click", showNextQuestion)
                        }
                    }
                    function showNextQuestion() {
                        answerContainer.removeChild(answerInput)
                        revealContainer.textContent = null
                        quizOptionsDiv.removeChild(nextButton)
                        quizOptionsDiv.removeChild(restartButton)
                        currentQuestion++
                        giveQuestion()
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
                        correctAnswerCount++
                        nextButton.addEventListener("click", showNextQuestion)
                    } else {
                        console.log("u wrong")
                        nextButton.addEventListener("click", showNextQuestion)
                    }
                    function showNextQuestion() {
                        answerContainer.textContent = null
                        quizOptionsDiv.removeChild(nextButton)
                        quizOptionsDiv.removeChild(restartButton)
                        currentQuestion++
                        giveQuestion()
                    }
                }
            }
        }
    }
}

// current features:
// * every time the page is refreshed, the items in allQuestions are randomly shuffled.
// * function "buttonClickResponse" checks to see if an input answer is correct

// observations:
// * parameter for a function called in the "forEach" parentheses always refers to a 
// single item in the array mentioned before the forEach.
// * length of the array is NOT the same as the total amount of array items when counted, 
// because when you count array items, you have to start at 0.
// * "++" means you want the function to add 1 to the variable
// * Time in Javascript is measured in milliseconds, so type "1000" if you want to put
// a second in your code

// things to add:
// * give the "restart" button its functionality
// * function before "giveQuestion" that makes the intro text and difficulty
// buttons disappear, then calls the "giveQuestion" function
// * add conditional that checks if the input for answer input questions is correct