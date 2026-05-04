var monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

var currentMonth = new Date().getMonth();
var currentYear  = new Date().getFullYear();

function dateToKey(date) {
    var y = date.getFullYear();
    var m = String(date.getMonth() + 1).padStart(2, "0");
    var d = String(date.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + d;
}

function renderCalendar() {
    var grid = document.getElementById("calendar-grid");
    grid.innerHTML = "";

    document.getElementById("month-title").textContent =
        monthNames[currentMonth] + " " + currentYear;

    var firstWeekday  = new Date(currentYear, currentMonth, 1).getDay();
    var daysInMonth   = new Date(currentYear, currentMonth + 1, 0).getDate();
    var todayKey      = dateToKey(new Date());

    // Monday-based offset (0=Mon … 6=Sun)
    var offset = (firstWeekday + 6) % 7;

    // Fill leading cells with previous month's days
    var prevMonth          = currentMonth === 0 ? 11 : currentMonth - 1;
    var prevYear           = currentMonth === 0 ? currentYear - 1 : currentYear;
    var lastDayOfPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();

    for (var i = 0; i < offset; i++) {
        var cell = document.createElement("div");
        cell.className = "calendar-cell has-day other-month";
        var nr = document.createElement("div");
        nr.className = "day-number";
        nr.textContent = lastDayOfPrevMonth - offset + 1 + i;
        cell.appendChild(nr);
        grid.appendChild(cell);
    }

    // Current month days
    for (var day = 1; day <= daysInMonth; day++) {
        var date    = new Date(currentYear, currentMonth, day);
        var dateKey = dateToKey(date);
        var weekday = date.getDay();

        var cell = document.createElement("div");
        cell.className = "calendar-cell has-day";

        if (weekday === 0 || weekday === 6) {
            cell.classList.add("weekend-day");
        }

        if (dateKey === todayKey) {
            cell.classList.add("today");
        }

        var dayNumber = document.createElement("div");
        dayNumber.className = "day-number";
        dayNumber.textContent = day;
        cell.appendChild(dayNumber);

        grid.appendChild(cell);
    }
}

function initCalendar() {
    renderCalendar();
}
