let allQuestions = [
    {id: "1", question: "Legs are to humans as wheels are to ...", 
        correctAnswer: "cars"},
    {id: "2", question: "We ... things up by having a small meal.", 
        answers: {a: "Wrapped", b: "Rapped", c: "Both are correct"},
        correctAnswer: "a"},
    {id: "3", question: "All he's good for is splitting ...", 
        answers: {a: "Hares", b: "Hairs", c: "Both are correct"},
        correctAnswer: "b"},
    {id: "4", question: "Something that is entirely made of organs is called a(n)", 
        correctAnswer: "organism"},
]

let easyButtonInJS = document.getElementById("easyModeButton")
    easyButtonInJS.textContent = "EASY MODE"
    easyButtonInJS.addEventListener("click", putEasyQuizOnPage)

let mediumButtonInJS = document.getElementById("mediumModeButton")
    mediumButtonInJS.textContent = "MEDIUM MODE"

let hardButtonInJS = document.getElementById("hardModeButton")
    hardButtonInJS.textContent = "HARD MODE"

function putEasyQuizOnPage() {
    let easyQuizInJS = document.getElementById("spaceForQuiz")
        easyQuizInJS.textContent = allQuestions[1].question
        easyQuizInJS.style.fontFamily = "Corbel"
}