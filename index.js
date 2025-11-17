import BooklistsAndScore from "./data/BooklistAndScore.js";
const data = new BooklistsAndScore();

document.querySelector('.startButton').addEventListener('click', () => {
  guessPage()
});



function guessPage() {
  let randomBook;
  const allBooks = new BooklistsAndScore().allBooks;
  const guessPageHtml = `
    <section class="bookGuessing">
      <div class="output js-output-book-code-resulet">
        <p class="js-get-book-box"></p>
      </div>
      <div class="inputs">
        <div class="input-left">
          <div class="input-left-bottom">
            <button value="books1" id="guessButton1" class="guessButtons">1</button>
          </div>
          <div class="input-left-top">
            <button value="books2" id="guessButton2" class="guessButtons">2</button>
            <button value="books3" id="guessButton3" class="guessButtons">3</button>
          </div>
        </div>
        <div class="input-right">
          <div class="input-right-top">
            <button value="books4" id="guessButton4" class="guessButtons">4</button>
            <button value="books5" id="guessButton5" class="guessButtons">5</button>
            <button value="books6" id="guessButton6" class="guessButtons">6</button>
          </div>
          <div class="input-right-bottom">
            <button value="books7" id="guessButton7" class="guessButtons">7</button>
          </div>
        </div>
      </div>
    </section>
  `;
  document.querySelector('.modal-content').innerHTML = guessPageHtml;

  function getRemoveAndDisplayRandomBook() {
    randomBook = allBooks[Math.floor(Math.random() * allBooks.length)];
    allBooks.splice(allBooks.indexOf(randomBook), 1);
    randomBook ? document.querySelector('.js-get-book-box').innerHTML = randomBook : resultPage();
  }

  function removeColorFromButtons() {
    document.querySelectorAll('.guessButtons').forEach(button => button.classList.remove('guessButtonsWrong', 'guessButtonsRight'));
  }

  getRemoveAndDisplayRandomBook();

  document.querySelectorAll('.guessButtons').forEach((guessButton) => {
    guessButton.addEventListener('click', (guessButton) => {
      if (guessButton.target.classList.contains('guessButtonsWrong')) {
        return alert('You have already guesst this location.');
      }

      if (data[`${guessButton.target.value}`].includes(randomBook)) {
        guessButton.target.classList.add('guessButtonsRight');
        setTimeout(() => {
          data.calculateScore(true);
          removeColorFromButtons()
          getRemoveAndDisplayRandomBook()
        }, 500);
      } else {
        data.calculateScore(false);
        guessButton.target.classList.add('guessButtonsWrong');
      }
    });
  });
}

function resultPage() {
  const resultPageHtml = `
    <section class="result">
      <div class="resultTop">
        <div class="resultTopInfo"><p>Ditt Resultat</p></div>
        <div class="resultTopScore">
          <div>Riktig: ${data.score.right}</div>
          <div>Feil: ${data.score.wrong}</div>
        </div>
      </div>
      <div class="resultMiddle">Middle</div>
      <div class="resultBottom">
        <div class="resultTopScoreRestart">
          <button class="js-resultTopScoreRestart">Start Igjen</button>
        </div>
        <div class="resultBottomClose">
          <button class="js-resultBottomClose">Lukk</button>
        </div>
      </div>
    </section>
  `;
  document.querySelector('.modal-content').innerHTML = resultPageHtml;

  document.querySelector('.js-resultTopScoreRestart').onclick = () => {
    data.resettScore();
    guessPage();
  };

  document.querySelector('.js-resultBottomClose').onclick = () => {
    data.resettScore();
    modal.style.display = "none";
  };
}




// Get the modal
const modal = document.getElementById("myModal");

// When the user clicks the button, open the modal 
document.querySelector('.startButton').onclick = function () {
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