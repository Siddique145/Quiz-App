const questions = [
  {
    question: "What is the purpose of the <head> tag in an HTML document?",
    answers: [
      { text: "To define the main content of the page", correct: false },
      { text: "To store metadata and links to external files like CSS and JavaScript", correct: true },
      { text: "To display images and text", correct: false },
      { text: "To create the footer of the page", correct: false },
    ],
  },
  {
    question: "What is the primary purpose of the CSS box model?",
    answers: [
      { text: "To manage the layout of elements by adjusting margin, border, padding, and content", correct: true },
      { text: "To define the fonts used in a page", correct: false },
      { text: "To add background images to elements", correct: false },
      { text: "To position elements on the page", correct: false },
    ],
  },
  {
    question: "What does the 'z-index' property do in CSS?",
    answers: [
      { text: "Defines the order of elements stacked along the z-axis (depth)", correct: true },
      { text: "Controls the opacity of elements", correct: false },
      { text: "Sets the font size of text", correct: false },
      { text: "Changes the position of elements", correct: false },
    ],
  },
  {
    question: "What is the difference between 'null' and 'undefined' in JavaScript?",
    answers: [
      { text: "'null' is an uninitialized variable, 'undefined' means the variable has not been assigned a value", correct: false },
      { text: "'null' means a variable has no value, 'undefined' means a variable does not exist", correct: true },
      { text: "'null' is a value, 'undefined' is a reference", correct: false },
      { text: "'null' is a string, 'undefined' is a number", correct: false },
    ],
  },
  {
    question: "Which of the following is NOT a valid way to declare a variable in JavaScript?",
    answers: [
      { text: "let x;", correct: false },
      { text: "var x;", correct: false },
      { text: "const x;", correct: false },
      { text: "int x;", correct: true },
    ],
  },
  {
    question: "What does the 'this' keyword refer to in JavaScript?",
    answers: [
      { text: "The current function being executed", correct: false },
      { text: "The window or global object", correct: false },
      { text: "The object that is currently executing the code", correct: true },
      { text: "A reference to the last element in an array", correct: false },
    ],
  },
  {
    question: "In CSS, what does the 'display' property do?",
    answers: [
      { text: "Controls the visibility of elements", correct: false },
      { text: "Specifies how an element should be displayed (block, inline, flex, etc.)", correct: true },
      { text: "Applies styles to elements", correct: false },
      { text: "Sets the background color of elements", correct: false },
    ],
  },
  {
    question: "What is the difference between '==' and '===' in JavaScript?",
    answers: [
      { text: "'==' checks for both value and type equality", correct: false },
      { text: "'===' checks for value equality, '==' checks for value and type equality", correct: false },
      { text: "'==' performs a loose comparison (type coercion), '===' checks for strict equality", correct: true },
      { text: "'==' checks for reference equality, '===' checks for value equality", correct: false },
    ],
  },
  {
    question: "What does the 'position' property do in CSS?",
    answers: [
      { text: "Specifies the position of elements relative to the viewport", correct: false },
      { text: "Controls how elements are arranged on the page", correct: false },
      { text: "Specifies how an element is positioned (relative, absolute, fixed, sticky, etc.)", correct: true },
      { text: "Defines the size of an element", correct: false },
    ],
  },
  {
    question: "What is the purpose of the 'event.preventDefault()' method in JavaScript?",
    answers: [
      { text: "It stops the event from bubbling up to parent elements", correct: false },
      { text: "It stops the event from propagating", correct: false },
      { text: "It prevents the default behavior associated with the event (e.g., form submission)", correct: true },
      { text: "It immediately triggers the event handler", correct: false },
    ],
  },
];

const answerButtons = document.getElementById("answer-buttons");
const questionElement = document.getElementById("question");
const nextbtn = document.getElementById("nextbtn");
const scoreElement = document.getElementById("score");
const nextbtnContainer = document.getElementById("nextbtn-container");
const restartbtnContainer = document.getElementById("restartbtn-container");
const restartbtn = document.getElementById("restartbtn");

let currentQuestionIndex = 0;
let score = 0;

// Start the quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreElement.textContent = score; // Display initial score
  nextbtn.style.display = "none"; // Hide Next button initially
  restartbtnContainer.style.display = "none"; // Hide Restart button initially
  showQuestion();
}

// Display the current question and answer choices
function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  const questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

  // Display answer buttons
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

// Reset the state before displaying the next question
function resetState() {
  nextbtn.style.display = "none"; // Hide Next button until answer is selected
  nextbtnContainer.style.display = "none"; // Hide Next button container initially
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild); // Clear previous answers
  }
}

// Handle answer selection
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true"; // Check if the answer is correct

  // Add class to show correct/incorrect answer
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++; // Increment score for correct answers
    scoreElement.textContent = score; // Update score display
  } else {
    selectedBtn.classList.add("incorrect");
  }

  // Disable all buttons after an answer is selected
  const allButtons = answerButtons.querySelectorAll(".btn");
  allButtons.forEach((button) => (button.disabled = true));

  // Show the Next button
  nextbtn.style.display = "inline";
  nextbtnContainer.style.display = "inline";
}

// Move to the next question or show final score
function showNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion(); // Show the next question
  } else {
    showFinalScore(); // If no more questions, show final score
  }
}

// Show the final score after the quiz is complete
function showFinalScore() {
  resetState();
  questionElement.innerHTML = `Quiz Complete! Your final score is: ${score}/${questions.length}`;
  nextbtn.style.display = "none"; // Hide Next button after completion
  restartbtnContainer.style.display = "inline"; // Show the Restart button
  restartbtn.style.display = "inline"; // Show the Restart button
}

// Restart the quiz
function restartQuiz() {
  restartbtnContainer.style.display = "none"; // Hide Restart button
  startQuiz(); // Restart the quiz by calling the startQuiz function
}

nextbtn.addEventListener("click", showNextQuestion); // Event listener for Next button
restartbtn.addEventListener("click", restartQuiz); // Event listener for Restart button

startQuiz(); // Start the quiz when the page loads
