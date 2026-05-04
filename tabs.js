function initTabs() {
    var tabButtons = document.querySelectorAll(".tab-btn");
    tabButtons.forEach(function(btn) {
        btn.addEventListener("click", function() {
            tabButtons.forEach(function(b) { b.classList.remove("active"); });
            document.querySelectorAll(".tab-content").forEach(function(c) { c.classList.remove("active"); });
            btn.classList.add("active");
            document.getElementById("tab-" + btn.getAttribute("data-tab")).classList.add("active");
        });
    });
}

var schedule = JSON.parse(localStorage.getItem("schedule") || "[]");

function saveSchedule() {
    localStorage.setItem("schedule", JSON.stringify(schedule));
}

function renderSchedule() {
    var list = document.getElementById("schema-list");
    list.innerHTML = "";

    if (schedule.length === 0) {
        var emptyItem = document.createElement("li");
        emptyItem.className = "empty-message";
        emptyItem.textContent = "Inga aktiviteter ännu.";
        list.appendChild(emptyItem);
        return;
    }

    var sorted = schedule.slice().sort(function(a, b) {
        return (a.date || "").localeCompare(b.date || "");
    });

    sorted.forEach(function(entry) {
        var originalIndex = schedule.indexOf(entry);
        var item = document.createElement("li");
        item.className = "todo-item";

        var dateSpan = document.createElement("span");
        dateSpan.className = "todo-date-label";
        dateSpan.textContent = entry.date ? entry.date.split("-").reverse().join("/") : "";

        var subjectSpan = document.createElement("span");
        subjectSpan.className = "todo-text";
        subjectSpan.textContent = (entry.time ? entry.time + " · " : "") + entry.subject;

        var deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "×";
        deleteButton.setAttribute("data-index", originalIndex);
        deleteButton.addEventListener("click", function() {
            schedule.splice(parseInt(this.getAttribute("data-index")), 1);
            saveSchedule();
            renderSchedule();
        });

        item.appendChild(dateSpan);
        item.appendChild(subjectSpan);
        item.appendChild(deleteButton);
        list.appendChild(item);
    });
}

function initSchedule() {
    var today = new Date();
    var year  = today.getFullYear();
    var month = String(today.getMonth() + 1).padStart(2, "0");
    var day   = String(today.getDate()).padStart(2, "0");
    document.getElementById("schema-datum").value = year + "-" + month + "-" + day;

    document.getElementById("schema-form").addEventListener("submit", function(e) {
        e.preventDefault();
        var date    = document.getElementById("schema-datum").value;
        var time    = document.getElementById("schema-tid").value.trim();
        var subject = document.getElementById("schema-amne").value.trim();
        if (!date || !subject) return;
        schedule.push({ date: date, time: time, subject: subject });
        saveSchedule();
        renderSchedule();
        document.getElementById("schema-amne").value = "";
        document.getElementById("schema-tid").value  = "";
    });

    renderSchedule();
}

var customHolidays = JSON.parse(localStorage.getItem("customHolidays") || "[]");

function saveCustomHolidays() {
    localStorage.setItem("customHolidays", JSON.stringify(customHolidays));
}

function renderCustomHolidays() {
    var list = document.getElementById("helgdag-list");
    list.innerHTML = "";

    if (customHolidays.length === 0) {
        var emptyItem = document.createElement("li");
        emptyItem.className = "empty-message";
        emptyItem.textContent = "Inga egna helgdagar tillagda ännu.";
        list.appendChild(emptyItem);
        return;
    }

    customHolidays.forEach(function(holiday, i) {
        var item = document.createElement("li");
        item.className = "todo-item";

        var nameSpan = document.createElement("span");
        nameSpan.className = "todo-text";
        nameSpan.textContent = holiday.name;

        var dateSpan = document.createElement("span");
        dateSpan.className = "todo-date-label";
        dateSpan.textContent = holiday.date.split("-").reverse().join("/");

        var deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "×";
        deleteButton.setAttribute("data-index", i);
        deleteButton.addEventListener("click", function() {
            customHolidays.splice(parseInt(this.getAttribute("data-index")), 1);
            saveCustomHolidays();
            renderCustomHolidays();
            if (typeof renderCalendar === "function") renderCalendar();
        });

        item.appendChild(nameSpan);
        item.appendChild(dateSpan);
        item.appendChild(deleteButton);
        list.appendChild(item);
    });
}

function initHolidays() {
    var today = new Date();
    var year  = today.getFullYear();
    var month = String(today.getMonth() + 1).padStart(2, "0");
    var day   = String(today.getDate()).padStart(2, "0");
    document.getElementById("helgdag-datum").value = year + "-" + month + "-" + day;

    document.getElementById("helgdag-form").addEventListener("submit", function(e) {
        e.preventDefault();
        var date = document.getElementById("helgdag-datum").value;
        var name = document.getElementById("helgdag-namn").value.trim();
        if (!date || !name) return;
        customHolidays.push({ date: date, name: name });
        saveCustomHolidays();
        renderCustomHolidays();
        if (typeof renderCalendar === "function") renderCalendar();
        document.getElementById("helgdag-namn").value = "";
    });

    renderCustomHolidays();
}
