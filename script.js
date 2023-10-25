let letters = document.querySelector(".letters");
let word = document.querySelector(".word");
let categoryNname = document.querySelector(".category-name span");
let hangman = document.querySelectorAll(".hangman div");
let overlay = document.querySelector(".overlay");
let popup = document.querySelector(".popup");
let popupText = document.querySelector(".popup p");
let popupBtn = document.querySelector(".popup button");
let successAud = document.querySelector(".success-aud");
let failureAud = document.querySelector(".failure-aud");

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

fetch("./data.json")
  .then((response) => response.json())
  .then((json) => {
    mainFunction(json);
  });

// reload page

popupBtn.onclick = function () {
  location.reload();
};

// create letters span

Array.from(alphabet).forEach((e) => {
  createSpans(e, letters);
});
let allLetters = document.querySelectorAll(".letters span");

// List of Functions

function mainFunction(allTables) {
  let newTab = Object.keys(allTables);
  let tableSelected = randomValueFromArray(newTab);
  categoryNname.innerHTML = tableSelected;
  let wordSelected = randomValueFromArray(allTables[tableSelected]);
  Array.from(wordSelected).forEach((e) => {
    createSpans(e, word);
  });
  let wordSpans = document.querySelectorAll(".word span");
  allLetters.forEach((e) => {
    e.onclick = function () {
      e.classList.add("selected");
      let hideHang = Array.from(hangman).filter(
        (e) => !e.classList.contains("show-hang")
      );
      if (!matched(wordSpans, wordSelected, e.textContent)) {
        hideHang[0].classList.add("show-hang");
        failureAud.play();
      } else {
        successAud.play();
      }
      let showHang = filter(hangman, "show-hang");
      let matchedLetter = filter(wordSpans, "matched");
      let emptyLetter = filter(wordSpans, "empty");
      if (matchedLetter.length + emptyLetter.length == wordSpans.length) {
        showPopup(true);
      }
      console.log(hideHang.length);
      if (showHang.length == 8) {
        showPopup(false, wordSelected);
      }
    };
  });
}

function createSpans(text, div) {
  let span = document.createElement("span");
  span.innerHTML = text;
  text === " " ? span.classList.add("empty") : "";
  div.appendChild(span);
}

function randomValueFromArray(tab) {
  let i = Math.trunc(Math.random() * tab.length);
  return tab[i];
}

function matched(word, wordSelected, letter) {
  state = wordSelected.includes(letter);
  if (state) {
    Array.from(word).forEach((e) => {
      if (e.textContent === letter) {
        e.classList.add("matched");
      }
    });
    return true;
  } else {
    return false;
  }
}

function filter(list, cls) {
  return Array.from(list).filter((e) => e.classList.contains(cls));
}

function showPopup(state, word = null) {
  overlay.style.display = "block";
  popup.classList.add("show-pop");
  if (state) {
    popupText.innerHTML = "good job";
  } else {
    popupText.innerHTML = `game over, the correct answer is <span>${word}</span>`;
  }
}
