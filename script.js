console.log("script.js 연결 성공!")

let userName = "HAK2"
let userAge = 30

console.log("내 이름:", userName)
console.log("내 나이:", userAge)

//alert("안녕, " +  userName + " !" + " 내 나이는 " + userAge +"야.")
//alert("다음에 보자!")

//1. 환영 메세지 함수
function welcome(userName) {
    alert("환영합니다, " + userName + "님!")


}

//2. 나이 계산 함수

function calculateAge(birthYear) {
    const currentYear = 2026
    return currentYear - birthYear
}

//3. 자기소개 함수
function introduce(name, job) {
    return name + "(" + job + ")"

}

//사용
welcome("HAK2")
console.log(calculateAge(1990))
console.log(introduce("HAK2", "개발자"))

function multiply(a, b) {
    return a * b
}

console.log(multiply(5, 7))

function sayHi() {
    console.log("안뇽")
}

sayHi()

//4. 매개변수 4개
function aboutMe(name, age, hobby) {
    return name + "님은" + age + "세이고" + "취미는" + hobby + "입니다"

}
console.log(aboutMe("Hak2", 30, "코딩"))



//버튼 글자 바꾸기
const myButton = document.querySelector("#myButton")
const countDisplay = document.querySelector("#counter")

let count = 0

// 클릭 이벤트 등록
myButton.addEventListener("click", function () {
    count = count + 1
    countDisplay.textContent = "클릭횟수: " + count

    // 조건문으로 변경
    if (count === 10) {
        alert("🎉 10번 달성!")
    }
    else if (count === 20) {
        alert("👏 20번 달성! 대단해요!")
    }
    else if (count >= 30 && count <= 50) {
        countDisplay.style.color = "orange"
    }

})


const resetButton = document.querySelector("#resetButton")
resetButton.addEventListener("click", function () {
    count = 0
    countDisplay.textContent = "클릭 횟수 : 0"
    countDisplay.style.color = "black"
})


let todos = []
let completed=[]

const todoInput = document.querySelector("#todoInput")
const addButton = document.querySelector("#addButton")
const todoList = document.querySelector("#todoList")

//다시 그리기 함수
function renderList() {
    todoList.innerHTML = ""
    for (let i =0; i<todos.length; i ++) {
        const isDone =completed[i]
        const cssClass = isDone ? "completed" : ""

        todoList.innerHTML += 
        "<li class ='"+ cssClass+ "' onclick='toggleTodo(" + i + ")'>" + todos[i] + 
        " <button onclick='deleteTodo(" + i + "); event.stopPropagation()'> 삭제 </button>" +
        "</li>"
     
    }
}

function toggleTodo(index) {
    completed[index] = !completed[index] // 반대로 
    renderList()
}

function deleteTodo(index) {
    todos.splice(index, 1) //해당 인덱스 1개 제거
    completed.splice(index, 1)
    renderList() // 다시 

}

addButton.addEventListener("click", function() {
    const newTodo = todoInput.value

    //빈 칸이면 무시

    if(newTodo === ""){
        return
    }

    todos.push(newTodo)
    completed.push(false)
   

    todoInput.value = ""

    renderList() // 함수 호출로 한 줄

    
})

todoInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter"){
        addButton.click()
    }
})



//===퀴즈 앱 ===//
function selectAnswer(answerIndex) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer

    // 정답 판정

    if (answerIndex === correctAnswer) {
        score ++
         alert("✅ 정답!")
    } else {
        alert("❌ 오답!")
    }
    // 다음 문제로
    currentQuestionIndex++

    // 마지막 문제였으면 결과화면
    if (currentQuestionIndex >= questions.length) {
        showResult()
    } else {
        showQuestion()
    }
}
//1. 데이터: 문제 목록(객체배열)
const questions =[
    { 
        question: "JavaScript에서 변수를 선언하는 키워드는?",
        options: ["var", "let", "const", "모두 다"],
        correctAnswer: 3
    },
 {
        question: "배열의 끝에 항목을 추가하는 메서드는?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correctAnswer: 0
    },
    {
        question: "=== 와 == 의 차이는?",
        options: ["같음", "===는 타입까지 비교", "==이 더 정확", "차이 없음"],
        correctAnswer: 1
    },
    {
        question: "for 반복문에서 i++ 의 의미는?",
        options: ["i를 곱하기 2", "i를 1 증가", "i를 1 감소", "i를 비교"],
        correctAnswer: 1
    },
    {
        question: "addEventListener의 첫 인자에 들어가는 것은?",
        options: ["함수", "이벤트 이름", "요소", "인덱스"],
        correctAnswer: 1
    }
]

//2. 상태(status) 변수

let currentQuestionIndex = 0 //지금 몇번 문제?
let score = 0 // 맞춘 개수

// 3. DOM 요소 가져오기

const quizScreen = document.querySelector("#quizScreen")
const resultScreen = document.querySelector("#resultScreen")
const questionNumber = document.querySelector("#questionNumber")
const questionText = document.querySelector("#questionText")
const optionsContainer = document.querySelector("#optionsContainer")
const finalScore = document.querySelector("#finalScore")
const restartButton = document.querySelector("#restartButton")


//4. 현재 문제 화면에 표시
function showQuestion() {
    const q = questions[currentQuestionIndex]

    // 문제 번호 표시
    questionNumber.textContent = "문제 " + (currentQuestionIndex + 1) + " / "+ questions.length
    //질문 표시
    questionText.textContent = q.question
    //보기 4개 그리기
    optionsContainer.innerHTML = ""
    for (let i=0; i<q.options.length; i++) {
        optionsContainer.innerHTML += "<button onclick='selectAnswer(" + i + ")'>" + q.options[i] + "</button>"

    }
}

function showResult() {
    //1. 화면 전환
    quizScreen.style.display = "none"
    resultScreen.style.display ="block"

    // 2. 점수 표시
    let message = questions.length + "문제 중"+ score + "문제 정답!"


    if (score === questions.length) {
        message += " 🏆 만점!"
    } else if (score >= questions.length * 0.6) {
        message += " 👍 잘했어요!"
    } else if (score >= questions.length * 0.4) {
        message += " 📚 공부 더 해요"
    } else {
        message += " 💪 다시 도전!"
    }
    finalScore.textContent = message


}

restartButton.addEventListener("click", function() {
    currentQuestionIndex = 0
    score = 0
    quizScreen.style.display = "block"
    resultScreen.style.display = "none"
    showQuestion()  
})
// 시작
showQuestion()
