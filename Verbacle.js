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
        ],
        correctAnswer: "Wrapped"
    },
    {
        question: "All he's good for is splitting ...",
        isInput: false, 
        answers: [
            {text: "Hares", isCorrect: false}, 
            {text: "Hairs", isCorrect: true},
            {text: "Both are correct", isCorrect: false}
        ],
        correctAnswer: "Hairs"
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

let topElements = document.getElementById("topElements")
let introPage = document.getElementById("introPage")
let startButton = document.getElementById("startButton")
startButton.textContent = "START QUIZ"
startButton.addEventListener("click", clearStartPage)

let questionBox = document.getElementById("questionBox")
questionBox.style.opacity = 0
let questionText = document.getElementById("questionText")
let answerContainer = document.getElementById("answerContainer")
let timerContainer = document.getElementById("timerContainer")
let revealContainer = document.getElementById("revealContainer")
let quizOptionsDiv = document.getElementById("quizOptionsDiv")
let resultsBox = document.getElementById("resultsBox")
resultsBox.style.opacity = 0

let currentQuestion = 0
let correctAnswerCount = 0
let generatedQuiz = allQuestions.sort(() => Math.random() - 0.5)

function clearStartPage() {
    startButton.removeEventListener("click", clearStartPage)
    topElements.style.transitionDuration = "0.3s"
    topElements.style.opacity = 0
    introPage.style.transitionDuration = "0.3s"
    introPage.style.opacity = 0
    setTimeout(nextPage, 500)
    function nextPage() {
        topElements.remove()
        introPage.remove()
        startQuiz()
    }
}
        
function startQuiz() {
    setTimeout(constructQuestion, 500)
    function constructQuestion() {
        if (currentQuestion < generatedQuiz.length) {
            let nextButton = document.createElement("button")
            nextButton.textContent = "Next"
            nextButton.style.fontFamily = "Corbel"
            nextButton.style.fontWeight = "bolder"
            nextButton.style.backgroundColor = "lightslategray"
            nextButton.style.borderRadius = "0.5em 0.5em 0.5em 0.5em"
            quizOptionsDiv.appendChild(nextButton)
            questionText.textContent = generatedQuiz[currentQuestion].question
            let questionTimeAmount = 10
            timerContainer.textContent = questionTimeAmount
            let questionCountdown = setInterval(deductOne, 1000)
            function deductOne() {
                if (questionTimeAmount === 0) {
                    revealContainer.style.opacity = 0
                    revealContainer.textContent = "You're out of time."
                    setTimeout(revealTimeoutMessage, 100)
                    function revealTimeoutMessage() {
                        revealContainer.style.transitionDuration = "0.3s"
                        revealContainer.style.opacity = 1
                    }
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
                        generatedQuiz[currentQuestion].answers.every(checkAnswerText)
                        function checkAnswerText(thisAnswer) {
                            inputAnswerChecker++
                            if (answerInput.value === thisAnswer.text) {
                                questionBox.style.color = "limegreen"
                                questionBox.style.backgroundColor = "darkgreen"
                                revealContainer.textContent = "You're correct!"
                                clearInterval(questionCountdown)
                                correctAnswerCount++
                                nextButton.addEventListener("click", showNextQuestion)
                                return false
                            } else if (inputAnswerChecker >= generatedQuiz[currentQuestion].answers.length) {
                                questionBox.style.color = "salmon"
                                questionBox.style.backgroundColor = "darkred"
                                revealContainer.style.width = "20%"
                                revealContainer.textContent = "Sorry, that is wrong. Correct answers include:"
                                let answerCount = 0
                                generatedQuiz[currentQuestion].answers.forEach(showAnswers)
                                function showAnswers(thisAnswer) {
                                    answerCount++
                                    let possibleAnswer = document.createElement("span")
                                    if (answerCount >= generatedQuiz[currentQuestion].answers.length) {
                                        possibleAnswer.innerHTML = " " + "and" + " " + "<b>" + thisAnswer.text + "</b>" + "."
                                    } else {
                                        possibleAnswer.innerHTML = " " + "<b>" + thisAnswer.text + "</b>" + ","
                                    }
                                    revealContainer.appendChild(possibleAnswer)
                                }
                                clearInterval(questionCountdown)
                                nextButton.addEventListener("click", showNextQuestion)
                            } else if (questionTimeAmount === 0) {
                                answerInput.removeEventListener("keypress", inputEntryResponse)
                            } else {
                                return true
                            }
                        }
                        answerInput.removeEventListener("keypress", inputEntryResponse)
                    } else {
                        return null
                    }
                }
            } else {
                generatedQuiz[currentQuestion].answers.forEach(addButton)
                function addButton(thisAnswer) {
                    let answerButton = document.createElement("button")
                    answerButton.id = "option"
                    answerButton.textContent = thisAnswer.text
                    answerButton.style.fontFamily = "Corbel"
                    answerButton.style.fontWeight = "bolder"
                    answerButton.style.backgroundColor = "lightslategray"
                    answerButton.style.padding = "1em 2em 1em 2em"
                    answerButton.style.borderRadius = "0.5em 0.5em 0.5em 0.5em"
                    answerContainer.appendChild(answerButton)
                    answerButton.addEventListener("mouseover", () => {
                        answerButton.style.backgroundColor = "lightgray"
                    })
                    answerButton.addEventListener("mouseout", () => {
                        answerButton.style.backgroundColor = "lightslategray"
                    })
                    answerButton.addEventListener("click", buttonClickResponse)
                    function buttonClickResponse() {
                        if (thisAnswer.isCorrect) {
                            questionBox.style.color = "limegreen"
                            questionBox.style.backgroundColor = "darkgreen"
                            revealContainer.textContent = "You're correct!"
                            clearInterval(questionCountdown)
                            correctAnswerCount++
                            nextButton.addEventListener("click", showNextQuestion)
                        } else if (questionTimeAmount === 0) {
                            generatedQuiz[currentQuestion].answers.forEach(replaceButton)
                        } else {
                            questionBox.style.color = "salmon"
                            questionBox.style.backgroundColor = "darkred"
                            revealContainer.innerHTML = "Sorry, that's wrong. The correct answer is:" + " " + "<b>" + generatedQuiz[currentQuestion].correctAnswer + "</b>"
                            clearInterval(questionCountdown)
                            nextButton.addEventListener("click", showNextQuestion)
                        }
                        generatedQuiz[currentQuestion].answers.forEach(replaceButton)
                    }
                    function replaceButton(thisAnswer) {
                        document.getElementById("option").remove()
                        let emptyButton = document.createElement("button")
                        emptyButton.id = "option"
                        emptyButton.textContent = thisAnswer.text
                        emptyButton.style.fontFamily = "Corbel"
                        emptyButton.style.fontWeight = "bolder"
                        emptyButton.style.backgroundColor = "lightslategray"
                        emptyButton.style.padding = "1em 2em 1em 2em"
                        emptyButton.style.borderRadius = "0.5em 0.5em 0.5em 0.5em"
                        answerContainer.appendChild(emptyButton)
                    }
                }
            }
            questionBox.style.transitionDuration = "0.3s"
            questionBox.style.opacity = 1
            function showNextQuestion() {
                questionBox.style.transitionDuration = "0.3s"
                questionBox.style.opacity = 0
                questionBox.style.color = "khaki"
                questionBox.style.backgroundColor = "darkgoldenrod"
                setTimeout(removeQuestion, 1000)
                function removeQuestion() {
                    answerContainer.textContent = null
                    revealContainer.textContent = null
                    quizOptionsDiv.removeChild(nextButton)
                    currentQuestion++
                    constructQuestion()
                }
            }
        } else if (currentQuestion >= generatedQuiz.length) {
            questionBox.style.transitionDuration = "0.3s"
            questionBox.style.opacity = 0
            setTimeout(nextPage, 1000)
            function nextPage() {
                questionBox.remove()
                resultsBox.append()
                setTimeout(showResults, 1000)
                function showResults() {
                    let congratsMessageTop = document.createElement("p")
                    congratsMessageTop.textContent = "Congrats! Your score is:"
                    congratsMessageTop.style.fontFamily = "Corbel"
                    congratsMessageTop.style.textAlign = "center"
                    let totalScore = document.createElement("p")
                    totalScore.textContent = correctAnswerCount + "/" + generatedQuiz.length
                    totalScore.style.fontFamily = "Corbel"
                    totalScore.style.fontSize = "5em"
                    totalScore.style.textAlign = "center"
                    let congratsMessageBottom = document.createElement("p")
                    congratsMessageBottom.textContent = "You're always free to try again."
                    congratsMessageBottom.style.fontFamily = "Corbel"
                    congratsMessageBottom.style.textAlign = "center"
                    resultsBox.appendChild(congratsMessageTop)
                    resultsBox.appendChild(totalScore)
                    resultsBox.appendChild(congratsMessageBottom)
                    resultsBox.style.transitionDuration = "0.3s"
                    resultsBox.style.opacity = 1
                }
            }
        }
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