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
    easyButtonInJS.style.fontFamily = "Verdana"
    easyButtonInJS.style.fontWeight = "bolder"
    easyButtonInJS.style.fontSize = "200%"
    easyButtonInJS.addEventListener("click", putEasyQuizOnPage)

let mediumButtonInJS = document.getElementById("mediumModeButton")
    mediumButtonInJS.textContent = "MEDIUM MODE"
    mediumButtonInJS.style.fontFamily = "Verdana"
    mediumButtonInJS.style.fontWeight = "bolder"
    mediumButtonInJS.style.fontSize = "200%"

let hardButtonInJS = document.getElementById("hardModeButton")
    hardButtonInJS.textContent = "HARD MODE"
    hardButtonInJS.style.fontFamily = "Verdana"
    hardButtonInJS.style.fontWeight = "bolder"
    hardButtonInJS.style.fontSize = "200%"

function putEasyQuizOnPage() {
    let easyQuizInJS = document.getElementById("spaceForQuiz")
        easyQuizInJS.textContent = allQuestions[1].question
}