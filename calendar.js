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

function calculateEaster(year) {
    var a = year % 19;
    var b = Math.floor(year / 100);
    var c = year % 100;
    var d = Math.floor(b / 4);
    var e = b % 4;
    var f = Math.floor((b + 8) / 25);
    var g = Math.floor((b - f + 1) / 3);
    var h = (19 * a + b - d - g + 15) % 30;
    var i = Math.floor(c / 4);
    var k = c % 4;
    var l = (32 + 2 * e + 2 * i - h - k) % 7;
    var m = Math.floor((a + 11 * h + 22 * l) / 451);
    var month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
    var day   = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(year, month, day);
}

function firstSaturday(year, month, minDay) {
    var date = new Date(year, month - 1, minDay);
    while (date.getDay() !== 6) {
        date.setDate(date.getDate() + 1);
    }
    return date;
}

function getHolidays(year) {
    var holidays = {};

    holidays[year + "-01-01"] = "Nyårsdagen";
    holidays[year + "-01-06"] = "Trettondedag jul";
    holidays[year + "-05-01"] = "Första maj";
    holidays[year + "-06-06"] = "Nationaldagen";
    holidays[year + "-12-25"] = "Juldagen";
    holidays[year + "-12-26"] = "Annandag jul";

    var easter = calculateEaster(year);

    var goodFriday    = new Date(easter); goodFriday.setDate(easter.getDate() - 2);
    var easterMonday  = new Date(easter); easterMonday.setDate(easter.getDate() + 1);
    var ascensionDay  = new Date(easter); ascensionDay.setDate(easter.getDate() + 39);
    var pentecost     = new Date(easter); pentecost.setDate(easter.getDate() + 49);

    holidays[dateToKey(goodFriday)]   = "Långfredagen";
    holidays[dateToKey(easter)]       = "Påskdagen";
    holidays[dateToKey(easterMonday)] = "Annandag påsk";
    holidays[dateToKey(ascensionDay)] = "Kristi himmelsfärd";
    holidays[dateToKey(pentecost)]    = "Pingstdagen";
    holidays[dateToKey(firstSaturday(year, 6, 20))]  = "Midsommardagen";
    holidays[dateToKey(firstSaturday(year, 10, 31))] = "Alla helgons dag";

    return holidays;
}

function renderCalendar() {
    var grid = document.getElementById("calendar-grid");
    grid.innerHTML = "";

    document.getElementById("month-title").textContent =
        monthNames[currentMonth] + " " + currentYear;

    var holidays      = getHolidays(currentYear);
    var firstWeekday  = new Date(currentYear, currentMonth, 1).getDay();
    var daysInMonth   = new Date(currentYear, currentMonth + 1, 0).getDate();
    var todayKey      = dateToKey(new Date());
    var offset = (firstWeekday + 6) % 7;

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

    for (var day = 1; day <= daysInMonth; day++) {
        var date    = new Date(currentYear, currentMonth, day);
        var dateKey = dateToKey(date);
        var weekday = date.getDay();

        var cell = document.createElement("div");
        cell.className = "calendar-cell has-day";

        if (weekday === 0 || weekday === 6) {
            cell.classList.add("weekend-day");
        }

        if (dateKey === todayKey)      cell.classList.add("today");
        if (holidays[dateKey])         cell.classList.add("holiday");

        var dayNumber = document.createElement("div");
        dayNumber.className = "day-number";
        dayNumber.textContent = day;
        cell.appendChild(dayNumber);

        if (holidays[dateKey]) {
            var label = document.createElement("div");
            label.className = "holiday-label";
            label.textContent = holidays[dateKey];
            cell.title = holidays[dateKey];
            cell.appendChild(label);
        }

        var count = 0;
        if (typeof todos !== "undefined") {
            for (var j = 0; j < todos.length; j++) {
                if (todos[j].date === dateKey) count++;
            }
        }

        if (count > 0) {
            var badge = document.createElement("div");
            badge.className = "todo-badge";
            badge.textContent = count;
            cell.appendChild(badge);
        }


        grid.appendChild(cell);
    }
}

function initCalendar() {
    document.getElementById("prev-month").addEventListener("click", function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    document.getElementById("next-month").addEventListener("click", function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });

    renderCalendar();
}
