let startBtn = document.querySelector('#start-btn');
let quizArea = document.querySelector('#quiz-area');
let feedbackEl = document.querySelector('#quiz-feedback');
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

function startQuiz() {
  // Start a timer and show the first question.
  console.log('start quiz');
  interval = setInterval(() => {
    timeRemaining--;
  }, 1000);
  renderQuestion(questions[questionIndex]);
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
    } else {
      feedbackEl.textContent = 'Wrong!';
    }
    questionIndex++;
    if (questionIndex < questions.length) {
      renderQuestion(questions[questionIndex]);
    } else {
      // Last question show end quiz screen.
      console.log('quiz end');
    }
  }
}

startBtn.addEventListener('click', startQuiz);
quizArea.addEventListener('click', handleClick);