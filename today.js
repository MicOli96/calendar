// Visar aktuell tid, veckodag och datum i välkomstsegmentet

var weekdays = [
  "Söndag",
  "Måndag",
  "Tisdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lördag",
];
var months = [
  "januari",
  "februari",
  "mars",
  "april",
  "maj",
  "juni",
  "juli",
  "augusti",
  "september",
  "oktober",
  "november",
  "december",
];

// Uppdaterar klockan och datumet som visas på sidan
function updateTime() {
  var now = new Date();

  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  // Lägg till en nolla framför om siffran är under tio, till exempel "09" istället för "9"
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  document.getElementById("clock").textContent =
    hours + ":" + minutes + ":" + seconds;

  var weekday = weekdays[now.getDay()];
  var day = now.getDate();
  var month = months[now.getMonth()];
  var year = now.getFullYear();

  document.getElementById("date-display").textContent =
    weekday + " " + day + " " + month + " " + year;
}

// Startar klockan och uppdaterar den varje sekund
function initToday() {
  updateTime();
  setInterval(updateTime, 1000);
}
