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

console.log(multiply(5,7))

function sayHi() {
    console.log("안뇽")
}

sayHi()

//4. 매개변수 4개
function aboutMe(name, age, hobby) {
    return name + "님은" + age + "세이고" + "취미는" + hobby + "입니다"

}
console.log (aboutMe("Hak2",30 ,"코딩"))



//버튼 글자 바꾸기
const myButton = document.querySelector("#myButton")
const countDisplay = document.querySelector("#counter")

let count = 0 

// 클릭 이벤트 등록
myButton.addEventListener("click", function() {
    count = count + 1
    countDisplay.textContent ="클릭횟수: " + count
    countDisplay.style.color = "red"
    countDisplay.style.fontSize = "30px"
    if (count === 10) {
    alert("축하해요! 10번 클릭")
}
})

const resetButton =document.querySelector("#resetButton")
resetButton.addEventListener("click", function() {
    count = 0
    countDisplay.textContent = "클릭 횟수 : 0"
})


//클릭횟수

