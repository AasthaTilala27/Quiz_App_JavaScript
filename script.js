const questions = [
  {
    question:
      "1. Which method is used to add an element at the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answer: "push()",
  },

  {
    question: "2. Which method removes the last element from an array?",
    options: ["push()", "pop()", "shift()", "splice()"],
    answer: "pop()",
  },

  {
    question: "3. What will be the output of typeof [] ?",
    options: ["array", "object", "undefined", "string"],
    answer: "object",
  },

  {
    question: "4. Which keyword is used to declare a block-scoped variable?",
    options: ["var", "const", "let", "define"],
    answer: "let",
  },

  {
    question:
      "5. Which method converts a JavaScript object into a JSON string?",
    options: [
      "JSON.parse()",
      "JSON.stringify()",
      "JSON.object()",
      "JSON.convert()",
    ],
    answer: "JSON.stringify()",
  },

  {
    question: "6. What will be the output of 10 + '5' ?",
    options: ["15", "105", "Error", "NaN"],
    answer: "105",
  },

  {
    question:
      "7. Which loop executes at least one time even if the condition is false?",
    options: ["for", "while", "do...while", "for...of"],
    answer: "do...while",
  },

  {
    question: "8. Which operator is used to check both value and data type?",
    options: ["==", "=", "===", "!="],
    answer: "===",
  },

  {
    question: "9. Which method is used to select an element by its ID?",
    options: [
      "querySelectorAll()",
      "getElementsByClassName()",
      "getElementById()",
      "getElementsByTagName()",
    ],
    answer: "getElementById()",
  },

  {
    question: "10. Which event occurs when a user clicks on an HTML element?",
    options: ["onhover", "onclick", "onchange", "onload"],
    answer: "onclick",
  },
];

let index = 0;
var id;
var timeUpQuestions = [];
var nextQuestions = [];
var score = 0;
var flag = 0;

function getData(index) {
  clearInterval(id);

  document.querySelectorAll(".timer span")[0].innerText = "01";
  document.querySelectorAll(".timer span")[1].innerText = "00";

  if (index == questions.length - 1) {
    document.querySelector(".next").disabled = true;
    document.querySelector(".next").classList.add("no-cursor");
  } else if (index == 0) {
    document.querySelector(".pre").disabled = true;
    document.querySelector(".pre").classList.add("no-cursor");
  } else if (index != 0) {
    document.querySelector(".pre").classList.remove("no-cursor");
    document.querySelector(".pre").disabled = false;
    document.querySelector(".next").disabled = false;
    document.querySelector(".next").classList.remove("no-cursor");
  }

  document.querySelector(".questionlist").innerHTML = `
         <article>
                <h2>${questions[index].question}</h2>
                <main>

                    <aside><input type="radio" name="mcq" form="myform" value="${questions[index].options[0]}" id="id1">
                    <label for="id1">${questions[index].options[0]}</label>
                    </aside>
                    <aside><input type="radio" name="mcq" form="myform" value="${questions[index].options[1]}" id="id2">
                    <label for="id2">${questions[index].options[1]}</label>
                    </aside>
                    <aside><input type="radio" name="mcq" form="myform" value="${questions[index].options[2]}" id="id3">
                    <label for="id3">${questions[index].options[2]}</label>
                    </aside>
                    <aside><input type="radio" name="mcq" form="myform" value="${questions[index].options[3]}" id="id4">
                    <label for="id4">${questions[index].options[3]}</label>
                    </aside>
                 

                </main>

        </article>
    `;

  setTimeout(() => {
    document.querySelectorAll(".timer span")[0].innerText = "00";
    document.querySelectorAll(".timer span")[1].innerText = "59";
  }, 1000);

  setTimeout(() => {
    id = setInterval(() => {
      if (document.querySelectorAll(".timer span")[1].innerText == "0") {
        clearInterval(id);
        timeUpQuestions.push(index);

        if (index < questions.length - 1) {
          index++;
          getData(index);
        } else {
          document.querySelector("form").requestSubmit();
        }
        return;
      }
      document.querySelectorAll(".timer span")[1].innerText--;
    }, 1000);
  }, 1000);
}

getData(index);

document.querySelector(".next").onclick = function (event) {
  event.preventDefault();
  clearInterval(id);
  nextQuestions.push(index);
  index++;
  getData(index);
};

document.querySelector(".pre").onclick = function (event) {
  event.preventDefault();
  clearInterval(id);
  index--;
  getData(index);
};


document.querySelector("form").onsubmit = function (event) {
  event.preventDefault();
  flag++;

  var attemptQue = 0;
  var wrongQue = 0;
  var percentage = 0;
  var finalResult;

  let options = document.getElementsByName("mcq");

  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) {
      attemptQue++;

      if (options[i].value == questions[index].answer) {
        score++;
      }
      break;
    }
  }

  console.log(score);

  clearInterval(id);

  if (index == questions.length - 1) {
    console.log("Flag", flag);

    if (index == questions.length - 1) {
      document.querySelector(".wrapper").style.display = "none";
      document.body.classList.add("final");

      wrongQue = questions.length - score;

      percentage = (score / questions.length) * 100;

      if (percentage >= 40) {
        finalResult = "PASS";
      } else {
        finalResult = "FAIL";
      }


      document.querySelector(".result").innerHTML = `
                <h1>Result Screen</h1>

                <h2>Total Questions = ${questions.length}</h2>

                <h2>Attempted  = ${attemptQue}</h2>

                <h2>Correct = ${score}</h2>

                <h2>Wrong  = ${wrongQue}</h2>

                <h2>Final Score = ${score}/${questions.length}</h2>

                <h2>Percentage = ${percentage}%</h2>

                <h2>Result = ${finalResult}</h2>
            `;
    }
    return;
  }
  index++;
  getData(index);
};