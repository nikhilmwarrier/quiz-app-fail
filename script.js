/*
TODO: Add Point count system
TODO: Disable options after clicking
TODO: Add Homepge
TODO: Add manifest, make PWA
*/


const startBtn = document.querySelector('#start-btn');
const nextBtn = document.querySelector('#next-btn');

const body = document.querySelector('body');

const questContainer = document.querySelector('#question-container');
const questElem = document.querySelector('#question');
const ansBtnElem = document.querySelector('#answer-buttons');
const correctAnsElem = document.querySelector('#right-answers');
const shareScore = document.querySelector('.sharescore');


let countRightAnswers = 0;
let shuffledQuestions, currentQuestionIndex

startBtn.addEventListener('click', startGame);

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
});


function startGame() {
    console.log('started!!!');
    startBtn.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questContainer.classList.remove('hide');
    body.classList.remove('correct');
    body.classList.remove('wrong');
    countRightAnswers = 0;
    correctAnsElem.classList.add('hide');
    correctAnsElem.classList.remove('high');
    correctAnsElem.classList.remove('low');

    setNextQuestion()
    
}

function setNextQuestion() {
    console.log('so far so good!');
    resetState();
    body.classList.remove('correct');
    body.classList.remove('wrong');
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questElem.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer);
        ansBtnElem.appendChild(button);
    });
}

function resetState() {
    nextBtn.classList.add('hide');
    while(ansBtnElem.firstChild) {
        ansBtnElem.removeChild(ansBtnElem.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const correct = selectedBtn.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(ansBtnElem.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    });

    if (selectedBtn.dataset = correct) {
        countRightAnswers++;
     // +1, change it if you need +10, +25 etc
     }

    if(shuffledQuestions.length > currentQuestionIndex + 1){
        nextBtn.classList.remove('hide');
    }else{
        nextBtn.classList.add('hide');
        startBtn.innerText = "Restart"
        startBtn.classList.remove('hide');

            if(countRightAnswers > (questions.length/4)*3){
                correctAnsElem.classList.add('high');
            }
            else if(countRightAnswers < (questions.length/4)){
                correctAnsElem.classList.add('low');
            }
        
        shareScore.classList.remove('hide');
        correctAnsElem.classList.remove('hide');
        correctAnsElem.innerHTML = 
        "Your score :  " + countRightAnswers + "/" + questions.length; // span will show the score
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if(correct){
        element.classList.add('correct');
    }else{
        element.classList.add('wrong');

    }
    nextBtn.classList.remove('hide');
}

function clearStatusClass(element){
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

shareScore.addEventListener('click', event => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: document.querySelector('link[rel=canonical]') ? document.querySelector('link[rel=canonical]').href : document.location.href;
      }).then(() => {
        console.log('Thanks for sharing!');
      })
      .catch(console.error);
    } else {
      // fallback
    }
  });


