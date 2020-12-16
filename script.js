let startBtn = document.querySelector('#start-btn');
let quizArea = document.querySelector('#quiz-area');
let startScreenEl = document.querySelector('#start-screen');
let feedbackEl = document.querySelector('#quiz-feedback');
let timeSpan = document.querySelector('#time');
let highscoresEl = document.querySelector('#highscores-area');
let scoresListEl = document.querySelector('#scores');
let viewScoresEl = document.querySelector('#view-scores');
let clearScoresBtn = document.querySelector('#clear-btn');
let backBtn = document.querySelector('#back-btn');
// Correct answer is based off array index.
let questions = [
  {
    questionText: 'Commonly used data types DO NOT include:',
    answers: ['strings', 'booleans', 'alerts', 'numbers'],
    correctAnswer: 2,
  },
  {
    questionText: 'The condition in an if/else statement is enclosed within _____.',
    answers: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
    correctAnswer: 2,
  },
  {
    questionText: 'Arrays in Javascript can be used to store _____.',
    answers: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
    correctAnswer: 3,
  },
  {
    questionText: 'String values must be enclosed within ____ when being assigned to variables.',
    answers: ['commas', 'curly brackets', 'quotes', 'parentheses'],
    correctAnswer: 2,
  },
  {
    questionText: 'A very useful tool used during development and debugging for printing content to the debugger is:',
    answers: ['Javascript', 'terminal/bash', 'for loops', 'console.log'],
    correctAnswer: 3,
  }
];
let questionIndex = 0;
let timeRemaining = 75;
let interval;
let highscores = localStorage.getItem('highscores');

if (highscores) {
  highscores = JSON.parse(highscores);
} else {
  highscores = [];
}

function startQuiz() {
  // Start a timer and show the first question.
  console.log('start quiz');
  interval = setInterval(() => {
    timeRemaining--;
    timeSpan.textContent = timeRemaining;
  }, 1000);
  startScreenEl.setAttribute('style', 'display: none;');
  quizArea.setAttribute('style', 'display: block;');
  renderQuestion(questions[questionIndex]);
}

function endQuiz() {
  clearInterval(interval);
  quizArea.innerHTML = '';

  let endScreen = document.createElement('div');
  let h1 = document.createElement('h1');
  h1.textContent = 'All done!';

  let p = document.createElement('p');
  p.textContent = `Your final score is ${timeRemaining}`;
  endScreen.appendChild(h1);
  endScreen.appendChild(p);

  let label = document.createElement('label');
  label.setAttribute('for', 'initials-input');
  label.textContent = 'Enter initials: ';
  let input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('id', 'initials-input');
  input.setAttribute('placeholder', 'Initials go here');
  let btn = document.createElement('button');
  btn.textContent = 'Submit';

  btn.addEventListener('click', function() {
    // Save the users initials and high score to localstorage
    let initials = input.value;
    if (initials) {
      let score = {
        initials: initials,
        score: timeRemaining
      };
      highscores.push(score);
      localStorage.setItem('highscores', JSON.stringify(highscores));
      // redirect to highscores page
      showHighScores();
    }
  });

  endScreen.append(label, input, btn);
  quizArea.appendChild(endScreen);
}

function renderQuestion(question) {
  quizArea.innerHTML = '';
  let questionEl = document.createElement('div');
  questionEl.setAttribute('class', 'question-card')

  let questionHeader = document.createElement('h1');
  questionHeader.textContent = question.questionText;
  questionEl.appendChild(questionHeader);

  for (let i = 0; i < question.answers.length; i++) {
    let btn = document.createElement('button');
    btn.setAttribute('class', 'answer');
    btn.textContent = `${i + 1}. ${question.answers[i]}`;
    if (i === question.correctAnswer) {
      btn.setAttribute('data-answer', 'true');
    }
    questionEl.appendChild(btn);
  }
  quizArea.appendChild(questionEl);
}

function handleClick(event) {
  let target = event.target;

  if (target.matches('button.answer')) {
    if (target.getAttribute('data-answer')) {
      feedbackEl.textContent = 'Correct!';
      feedbackEl.setAttribute('class', 'correct message');
    } else {
      feedbackEl.textContent = 'Wrong!';
      feedbackEl.setAttribute('class', 'wrong message');
      timeRemaining -= 10;
      timeSpan.textContent = timeRemaining;
    }
    questionIndex++;
    if (questionIndex < questions.length) {
      renderQuestion(questions[questionIndex]);
    } else {
      // Last question show end quiz screen.
      endQuiz();
    }
  }
}

function showHighScores() {
  document.querySelector('header').setAttribute('style', 'display: none;');
  quizArea.setAttribute('style', 'display: none;');
  startScreenEl.setAttribute('style', 'display: none;');
  highscoresEl.setAttribute('style', 'display: block;');
  scoresListEl.innerHTML = '';
  highscores
    .sort((a, b) => b.score - a.score)
    .forEach((score, i) => {
      let li = document.createElement('li');
      li.textContent = `${i + 1}. ${score.initials} ${score.score}`;
      scoresListEl.appendChild(li);
    });
}

startBtn.addEventListener('click', startQuiz);
quizArea.addEventListener('click', handleClick);
viewScoresEl.addEventListener('click', showHighScores);
clearScoresBtn.addEventListener('click', function () {
  highscores = [];
  localStorage.removeItem('highscores');
  scoresListEl.innerHTML = '';
});

backBtn.addEventListener('click', function () {
  document.querySelector('header').setAttribute('style', 'display: inital;');
  highscoresEl.setAttribute('style', 'display: none;');
  quizArea.setAttribute('style', 'display: none;');
  startScreenEl.setAttribute('style', 'display: block;');
  questionIndex = 0;
  timeRemaining = 75;
});

feedbackEl.addEventListener('animationend', function () {
  this.setAttribute('class', '');
  this.textContent = '';
});