// vars:
// elements:
let currentWord = document.querySelector(".current");
let nextWord = document.querySelector(".next");
// other variables:
let wordsCount = 10;
let wordIndex = 0;
let apiUrl = "https://random-word-api.herokuapp.com/word?number=" + wordsCount;
let WordsArray;
let score = 0;
let start = 0
// listeners
// when loaded
document.addEventListener("DOMContentLoaded", () => {
  fetcher(apiUrl);
});
// when keyup
document.querySelector(".inp").addEventListener("keyup", (ev) => {
  validator(ev);
  timerStart(10);
});

// functions
async function fetcher(url) {
  let response = await fetch(url);
  let json = await response.json();
  WordsArray = json;
  showWords(json);
}
function showWords(array) {
  // showing words in UI
  currentWord.innerHTML = array[wordIndex];
  nextWord.innerHTML = array[wordIndex + 1];
}
function validator(event) {
  let yourWord = event.target.value;
  console.log(yourWord, WordsArray[wordIndex]);
  if (yourWord === WordsArray[wordIndex]) {
    event.target.style.color = "green";
    score++;
    console.log(score);
    setTimeout(() => {
      document.querySelector(".inp").value = "";
    }, 500);
    wordIndex++;
    showWords(WordsArray);
  } else {
    // if was not correct & not same length
    if (yourWord.replace(/\s/g, "").length >= WordsArray[wordIndex].length) {
      event.target.style.color = "red";
    }
    // if was not correct & same length
    else {
      event.target.style.color = "white";
    }
    console.log(WordsArray);
  }
}
function timerStart(seconds) {
  if (start == 0) {
    let time = seconds;
    let timer = setInterval(() => {
      document.querySelector(".time>code").innerHTML = time;
      time--;
      if (time == 0) {
        clearInterval(timer);
        scoreAnalyzer();
      }
    }, 1000);
    start = 1;
  }
  start=1;
}
function scoreAnalyzer() {
  document.querySelector(".timer").remove();
  document.querySelector(".wpm").style.display = "flex";
  document.querySelector(".wpm>.score").innerHTML = score;
}
