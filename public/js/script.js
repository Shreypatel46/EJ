const question=[
    {
        question:"what is Applied Mutivariate Statistical Analysis?",
        answer:[
            {text:"If i would have  known that then padma might get promoted ",correct: true},
            {text:"Elle",correct: false},
            {text:"NO",correct: false},
            {text:"What DA?",correct: false},
        ]
    },
    {
        question:"IS dubey happy in reltionship?",
        answer:[
            {text:"HAPPY as FUCK",correct: false},
            {text:"YEH TO DUBEY NE KABHI SOCHA HI NAHI",correct: false},
            {text:"BANDI KA FLEX MARNA BHARI PAAD GAYA",correct: false},
            {text:"YEH KAHA AA GAYE HAM...!!",correct: true},
        ]
    },
    {
        question:"WHICH TYPE OF HEALTH ISSUE DID VAIBHAV FACE",
        answer:[
            {text:"AAB TU YEH DISCUSSION KAREGA BHOSDIWALE",correct: false},
            {text:"KOI NA BATA DO ME TO COMFORTABLE HU",correct: false},
            {text:"ABB ZYDA HO RHA DUBEY CHUP HO JAYEYO",correct: false},
            {text:"SHREY NE TO DEKHA THA VO BATYE GA",correct: true},
        ]
    }
];

const questionElement= document.getElementById("question");
console.log(question);
const answerButton= document.getElementById("answer-button");
console.log(answerButton);

const nextButton= document.getElementById("next-btn");
console.log(nextButton);


let currentQuestionIndex=0;
let score =0;
function startQuiz(){
    currentQuestionIndex =0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion=question[currentQuestionIndex];
    let questionNO =currentQuestionIndex+1;
    questionElement.innerHTML=questionNO+"."+currentQuestion.question;

    currentQuestion.answer.forEach(ans => {
        const button=document.createElement("button");
        button.classList.add("btn");
        button.innerHTML=ans.text;
        answerButton.appendChild(button);
        if(ans.correct){
            button.dataset.correct=ans.correct;
        }
        button.addEventListener("click",selectAnswer);

    });
}
function resetState(){
     nextButton.style.display= "none";
     while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
     }
}
function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect =selectedBtn.dataset.correct=== "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.ariaDisabled=true;
    });
    nextButton.style.display="block";
}
function showscore(){
    resetState();
    questionElement.innerHTML=`your score ${score}out of ${question.length}!`;
    nextButton.innerHTML="play again";
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<question.length){
        showQuestion();
    }else{
        showscore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<question.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();

