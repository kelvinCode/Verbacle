let verbacleQuiz = {
    allQuestions: [
        {Q1: {question: "Legs are to humans as wheels are to ...",
            answers: {a: "cars"}, 
            correctAnswer: "a"}
            }, //this kind of question involves an input box
        {Q2: {question: "We ... things up by having a small meal.", 
            answers: {a: "Wrapped", b: "Rapped", c: "Both are correct"},
            correctAnswer: "a"}
            },
        {Q3: {question: "All he's good for is splitting ...", 
            answers: {a: "Hares", b: "Hairs", c: "Both are correct"},
            correctAnswer: "b"}
            },
        {Q4: {question: "Something that is entirely made of organs is called a(n)",
            answers: {a: "organism"}, 
            correctAnswer: "a"}
            }
        ],
    timer: 10,
    maxScore: 4
}

let easyButtonInJS = document.getElementById("easyModeButton")
    easyButtonInJS.textContent = "EASY MODE"
    easyButtonInJS.addEventListener("click", putEasyQuizOnPage)

let mediumButtonInJS = document.getElementById("mediumModeButton")
    mediumButtonInJS.textContent = "MEDIUM MODE"

let hardButtonInJS = document.getElementById("hardModeButton")
    hardButtonInJS.textContent = "HARD MODE"

function putEasyQuizOnPage() {
    let easyQuizInJS = document.getElementById("spaceForQuiz")
        easyQuizInJS.textContent = 
            JSON.stringify(verbacleQuiz.allQuestions[Math.floor(Math.random() * verbacleQuiz.allQuestions.length)])
}