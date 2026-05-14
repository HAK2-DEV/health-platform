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

const multiply=(a, b) => a * b

console.log(multiply(5, 7))

const sayHi = () => console.log("안녕")

//4. 매개변수 4개
const aboutMe= (name, age, hobby) => `
     ${name} 님은 ${age} 세이고 취미는 ${hobby}입니다`


console.log(aboutMe("Hak2", 30, "코딩"))



//버튼 글자 바꾸기
const myButton = document.querySelector("#myButton")
const countDisplay = document.querySelector("#counter")

let count = 0

// 클릭 이벤트 등록
myButton.addEventListener("click", () => {
    count = count + 1
    countDisplay.textContent = `클릭횟수: ${count}`

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
resetButton.addEventListener("click", () => {
    count = 0
    countDisplay.textContent = "클릭 횟수 : 0"
    countDisplay.style.color = "black"
})

// =====================================todo list=========
let todos = []
let completed=[]

const todoInput = document.querySelector("#todoInput")
const addButton = document.querySelector("#addButton")
const todoList = document.querySelector("#todoList")

// 새로 -저장 함수

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos))
    localStorage.setItem("completed", JSON.stringify(completed))

}

// 새로 - 불러오기 함수

function loadTodos() {
    const saveTodos = localStorage.getItem("todos")
    const savedCompleted = localStorage.getItem("completed")

    if (saveTodos !== null) {
        todos = JSON.parse(saveTodos)
        completed = JSON.parse(savedCompleted)
    } 
    renderList()
}

//⭐ 새로 — 통계 업데이트 함수

function updateStats() {
    const statsElement =document.querySelector('#todoStats')
    const total = todos.length
    //빈상태

    if (total === 0) {
        statsElement.textContent ="할 일을 추가해주세요"
        return
    }

    // 완료 개수(reduce 사용)
    const doneCount = completed.reduce((acc, c) => c ? acc+1 : acc, 0)
    const remaining = total - doneCount

    // 모두 완료인가? (every 사용)
    const allDone = completed.every(c => c === true)

    if (allDone) {
        statsElement.textContent =`🎉 ${total}개 모두 완료!`
        
    } else {
        statsElement.textContent = `총 ${total}개 | 완료 ${doneCount}개 | 남은 ${remaining}개`
    }
}


//다시 그리기 함수
function renderList() {
    todoList.innerHTML = todos.map((todo, i) => {
        const cssClass = completed[i] ? "completed" : ""

       return  `
        <li class = "${cssClass}" onclick="toggleTodo(${i})">
         ${todo} 
        <button class="btn-danger" onclick="deleteTodo(${i}); event.stopPropagation()"> 삭제 </button>
        </li>
     `
    }).join("")
    updateStats()
}

function toggleTodo(index) {
    completed[index] = !completed[index] // 반대로 
    renderList()
    saveTodos()
}

function deleteTodo(index) {
    todos = todos.filter((_, i) => i !== index) //해당 인덱스 1개 제거
    completed=completed.filter((_, i) => i !== index)
    renderList() // 다시 
    saveTodos()

}

addButton.addEventListener("click", () => {
    const newTodo = todoInput.value

    //빈 칸이면 무시

    if(newTodo === ""){
        return
    }

    todos = [ ...todos, newTodo]
    completed = [...completed, false]
   

    todoInput.value = ""

    renderList() // 함수 호출로 한 줄
    saveTodos()
    
})

todoInput.addEventListener("keydown", event => {
    if (event.key === "Enter"){
        addButton.click()
    }
})

loadTodos()





//========================================퀴즈 앱 ===============//
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
    questionNumber.textContent = `문제 ${currentQuestionIndex + 1} / ${questions.length}`
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
    let message = ` ${questions.length} 문제 중 ${score} 문제 정답!`


    if (score === questions.length) {
        message += " 🏆 만점!"
    } else if (score >= questions.length * 0.6) {
        message += " 👍 잘했어요!"
    } else if (score >= questions.length * 0.4) {
        message += " 📚 공부 더 해요"
    } else {
        message += " 💪 다시 도전!"
    }

    // 새로 추가 - 최고 점수 처리
    const savedBest = localStorage.getItem("bestScore")

    if (savedBest === null) {
        //첫시도
        localStorage.setItem("bestScore", JSON.stringify(score))
        message += "<br><br> 첫 시도 점수: " + score + " / " + questions.length

    } else {
        const bestScore = JSON.parse(savedBest)

        if (score>bestScore) {
            localStorage.setItem("bestScore", JSON.stringify(score))
            message += "<br><br> 🎉 신기록! 이전 최고: " + bestScore + " / " + questions.length

        } else {
            //기존 기록 유지
            message += "<br><br>최고 점수: " + bestScore + " / " + questions.length
        }
    }
    finalScore.innerHTML = message


}

restartButton.addEventListener("click",() => {
    currentQuestionIndex = 0
    score = 0
    quizScreen.style.display = "block"
    resultScreen.style.display = "none"
    showQuestion()  
})
// 시작
showQuestion()


    // === API 사용자 데이터 ===

const loadUsersBtn = document.querySelector("#loadUsersBtn")
const userList = document.querySelector("#userList")

const loadUsers = async () => {
    try {
        //로딩 표시
        userList.innerHTML ="<li> 불러오는 중...</li>"
        loadUsersBtn.disabled = true

        //API 호출
        const response = await fetch ("https://jsonplaceholder.typicode.com/users")
        const users = await response.json()

        //화면에 표시
        userList.innerHTML = users.map(({name, email}) => `
         <li>  
            <strong> ${name}</strong>
            <span>(${email})</span>
        </li>
        `).join("")

    } catch (error) {
        userList.innerHTML =`<li> >❌ 에러: ${error.message}</li>`
    } finally {
        loadUsersBtn.disabled = false
    }
}

loadUsersBtn.addEventListener("click", loadUsers)