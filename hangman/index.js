let letters = document.querySelectorAll(".letter");
let close = document.querySelectorAll(".close");
let solution = document.querySelectorAll(".solution");
let hangman = document.querySelector(".hangman");
let winModal = document.getElementById("winModal");
let loseModal = document.getElementById("loseModal");
let found = false;
let solved = false;
let wrongGuesses = 0;
let guessed = [];
let imageArr = ["zero", "one", "two", "three", "four", "five", "six"];

letters.forEach(node => {
  node.addEventListener("click", event => {
    const { currentTarget } = event;

    if (guessed.indexOf(currentTarget.getAttribute("id")) === -1) {
      currentTarget.classList.add("clicked");
      guessed.push(currentTarget.getAttribute("id"));
      for (let s of solution) {
        if (currentTarget.getAttribute("id") == s.getAttribute("id")) {
          s.style.color = "black";
          s.classList.add("picked");
          found = true;
        }
      }
      solved = true;
      for (let s of solution) {
        if (!s.classList.contains("picked")) {
          solved = false;
        }
      }

      if (solved) winModal.style.display = "block";

      if (!found) {
        wrongGuesses += 1;
        if (wrongGuesses > 6) {
          loseModal.style.display = "block";
          hangman.classList.add("lost");
        }
        hangman.classList.remove(imageArr[wrongGuesses - 1]);
        hangman.classList.add(imageArr[wrongGuesses]);
      }
      found = false;
    }
  });
});

close.forEach(node => {
  node.addEventListener("click", event => {
    const { currentTarget } = event;
    winModal.style.display = "none";
    loseModal.style.display = "none";
  });
});
