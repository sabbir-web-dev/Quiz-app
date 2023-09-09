
const optionBox = document.getElementById("op-box")
var question = document.querySelector("#question");
var options= document.querySelectorAll(".btn");
var random = Math.floor(Math.random()*options.length);
const nextBtn = document.getElementById("next");
const massage =document.getElementById("result")
callApi();

function callApi (){
    var apiUrl = "https://opentdb.com/api.php?amount=50&category=9&difficulty=easy&type=multiple";
    fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
        var dataIs = data.results;
        var randomNumber = Math.floor(Math.random()*dataIs.length);

        const questions = dataIs[randomNumber];
        optionHendel(questions);
        question.innerHTML = questions.question;

       

    })
    .catch(err => console.log(err))
}

let cAnsData = '' ;
let optionHendel = (data) =>{
    const crectAns = data.correct_answer;
    const rongAns = data.incorrect_answers;

    rongAns.push(crectAns)
    shuffleArray(rongAns);
    cAnsData = crectAns;
    
}

function shuffleArray(arr) {
  const shuffledArr = [...arr]; 

  for (let i = shuffledArr.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i (inclusive)
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap elements at randomIndex and i
    [shuffledArr[i], shuffledArr[randomIndex]] = [shuffledArr[randomIndex], shuffledArr[i]];
  }

  boxHendeler(shuffledArr);

}

function boxHendeler (result){
    let option = result;
    for (let i = 0; i < option.length; i++) {
        optionBox.innerHTML += `
        <button class="btn" id="${i}">${option[i]}</button>
        `
    }
    var optionsST= document.querySelectorAll(".btn")
    optionClick(optionsST);
}


let optionClick = (option) => {
    const optionBtn = option;
    optionBtn.forEach(btn => {
        const Btn = btn;
       Btn.addEventListener('click', ()=>{
            optionCheck(Btn);
            btnDisable();
       })
    });
}

let optionCheck = (text) =>{
    const btnText = text.textContent;
    nextBtn.style.display = "block";
    console.log(btnText)
    console.log(cAnsData)
   if(btnText === cAnsData){
    rightMassage(text)
   }
   else{
    wrongMassage(text)
   }

}
const btnDisable = ()=>{
    var optionsST= document.querySelectorAll(".btn")
    optionsST.forEach(element => {
        element.disabled = true;
    });
}

const wrongMassage = (div) => {
    const wrong = div ;
    wrong.style.background = "#f43e3e";
    massage.innerHTML = `
        <p><small> correct anwser is.  </small> <strong style="color:#31b668", margin-bottom:10px >${ cAnsData} </stromg> </p>
    `
}

const rightMassage = (div) =>{
    const right = div;
    console.log(right)
    right.style.background ="#3ef4a5"
}

nextBtn.addEventListener("click", () =>{
    location.reload()
})