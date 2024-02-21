let cards = [
  "ciri.png",
  "geralt.png",
  "jaskier.png",
  "jaskier.png",
  "iorweth.png",
  "triss.png",
  "geralt.png",
  "yen.png",
  "ciri.png",
  "triss.png",
  "yen.png",
  "iorweth.png",
];
// console.log(cards);

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
const boardContainer = document.getElementById("board");

// Generowwanie kart dynamicznie
for (let i = 0; i < 12; i++) {
  const card = document.createElement("div");
  card.className = "card";
  card.id = "c" + i;
  boardContainer.appendChild(card);
}

const cardsElements = document.querySelectorAll(".card");
cardsElements.forEach((card, index) => {
  card.addEventListener("click", function () {
    revealCard(index);
  });
});

let oneVisible = false;
let turnCounter = 0;
let visibleNr;
let lock = false;
let pairsLeft = 6;

function revealCard(id) {
  let opacityValue = $("#c" + id).css("opacity");

  if (opacityValue != 0 && lock == false) {
    lock = true;
    let image = "url(img/" + cards[id] + ")";
    $("#c" + id).css("background-image", image);
    $("#c" + id).addClass("cardA");
    $("#c" + id).removeClass("card");

    if (!oneVisible) {
      //first card
      oneVisible = true;
      visibleNr = id;
      lock = false;
    } else {
      //second card
      if (cards[visibleNr] == cards[id]) {
        setTimeout(function () {
          hide2Cards(id, visibleNr);
        }, 750);
      } else {
        setTimeout(function () {
          restore2Cards(id, visibleNr);
        }, 1000);
      }

      turnCounter++;
      $(".score").html("Turn counter: " + turnCounter);
      oneVisible = false;
    }
  }
}

function hide2Cards(nr1, nr2) {
  $("#c" + nr1).css("opacity", "0");
  $("#c" + nr2).css("opacity", "0");
  pairsLeft--;
  if (pairsLeft == 0) {
    $("article").html(
      "<h2>You win! <br/> Done in " + turnCounter + " turns<h2/>"
    );
  }
  lock = false;
}

function restore2Cards(nr1, nr2) {
  $("#c" + nr1).css("background-image", "url(img/karta.png)");
  $("#c" + nr1).addClass("card");
  $("#c" + nr1).removeClass("cardA");

  $("#c" + nr2).css("background-image", "url(img/karta.png)");
  $("#c" + nr2).addClass("card");
  $("#c" + nr2).removeClass("cardA");

  lock = false;
}
