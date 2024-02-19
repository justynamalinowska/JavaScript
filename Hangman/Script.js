var password = "";
var password1 = "";
var passwordLength = 0;
var counter = 0;
var yes = new Audio("yes.wav");
var no = new Audio("no.wav");

function getKeyword() {
  document.getElementById("board").innerHTML = password1;
}

window.onload = start;

var letters = [
  "A",
  "Ą",
  "B",
  "C",
  "Ć",
  "D",
  "E",
  "Ę",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "Ł",
  "M",
  "N",
  "Ń",
  "O",
  "Ó",
  "P",
  "Q",
  "R",
  "S",
  "Ś",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "Ź",
  "Ż",
];

function start() {
  password = prompt("Proszę podać hasło:").toUpperCase();
  passwordLength = password.length;
  for (i = 0; i < passwordLength; i++) {
    if (password.charAt(i) != " ") password1 = password1 + "-";
    else if (password.charAt(i) == " ") password1 = password1 + " ";
  }
  var divs = "";
  for (i = 0; i < 35; i++) {
    divs =
      divs +
      '<div class="letter" onclick="check(' +
      i +
      ')" id="l' +
      i +
      '">' +
      letters[i] +
      "</div>";

    if ((i + 1) % 7 == 0) divs = divs + '<div style="clear:both;"></div>';
  }
  document.getElementById("alphabet").innerHTML = divs;

  getKeyword();
}

String.prototype.setChar = function (place, char) {
  if (place > this.length - 1) return this.toString();
  else return this.substr(0, place) + char + this.substr(place + 1);
};

function check(id) {
  var flag = false;
  for (i = 0; i < passwordLength; i++) {
    if (password.charAt(i) == letters[id]) {
      password1 = password1.setChar(i, letters[id]);
      flag = true;
    }
  }
  var ele = "l" + id;
  if (flag) {
    yes.play();
    document.getElementById(ele).style.background = "#003300";
    document.getElementById(ele).style.color = "#00C000";
    document.getElementById(ele).style.borderColor = "#00C000";
    document.getElementById(ele).style.cursor = "default";

    getKeyword();
  } else {
    no.play();
    document.getElementById(ele).style.background = "#330000";
    document.getElementById(ele).style.color = "#C00000";
    document.getElementById(ele).style.borderColor = "#C00000";
    document.getElementById(ele).style.cursor = "default";
    document.getElementById(ele).setAttribute("onclick", ";"); //usuwanie mozliwosci klikania

    counter++;
    var image = "img/s" + counter + ".jpg";
    document.getElementById("gallows").innerHTML =
      '<img src="' + image + '" alt=""/>';
  }
  //wygrana
  if (password == password1) {
    document.getElementById("alphabet").innerHTML =
      "Prawidłowe hasło: " +
      password +
      '<br/> <br/><span class="reset" onclick="location.reload()">JESZCZE RAZ<span/>';
  }
  //przegrana
  if (counter >= 9) {
    document.getElementById("alphabet").innerHTML =
      "Przegrana! Prawidłowe hasło: " +
      password +
      '<br/> <br/><span class="reset" onclick="location.reload()">JESZCZE RAZ<span/>';
  }
}
