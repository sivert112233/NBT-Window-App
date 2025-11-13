import { bookLocationCodes } from "./bookList.js";
const allBooks = bookLocationCodes.allBooks;
const score = {
  right: 0,
  wrong: 0
}

function app() {
  let randomBook;

  const getRemoveAndDisplayRandomBook = () => {
    randomBook = allBooks[Math.floor(Math.random() * bookLocationCodes.allBooks.length)];
    allBooks.splice(allBooks.indexOf(randomBook), 1);
    document.querySelector('.js-get-book-box').innerHTML = randomBook;
  }
  getRemoveAndDisplayRandomBook();

  const removeColorFromButtons = () => {
    document.querySelectorAll('.guessButtons').forEach(button => button.classList.remove(
      'guessButtonsWrong', 'guessButtonsRight'
    ));
  }

  document.querySelectorAll('.guessButtons').forEach((guessButton) => {
    guessButton.addEventListener('click', (guessButton) => {
      if (bookLocationCodes[`${guessButton.target.value}`].includes(randomBook)) {
        score.right++
        guessButton.target.classList.add('guessButtonsRight');
        setTimeout(() => {
          removeColorFromButtons()
          getRemoveAndDisplayRandomBook()
        }, 1000)
      } else {
        score.wrong++
        guessButton.target.classList.add('guessButtonsWrong');
      }
      console.log(score);
    });
  });
}
app();





// Get the modal
const modal = document.getElementById("myModal");

// When the user clicks the button, open the modal 
document.getElementById("myBtn").onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
document.getElementsByClassName("close")[0].onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
