const cards = document.querySelectorAll('.game__card');

let hasFlippedCard = false;
let lockBoard = false;
let counter = 0;

let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;

    checkForMatch()

}


function checkForMatch() {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCard();
        return;
    }
    unflipCards()
}


function disableCard() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    counter = counter + 1;
    if (counter === 6) {
        setTimeout(newGame, 4000);
    }
    resetBoard();
}

function newGame() {
    location.reload();
};

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard()
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });

})();



cards.forEach(card => card.addEventListener('click', flipCard));

