function createPetals() {
    var container = document.getElementById("petals-container");
    for (var i = 0; i < 18; i++) {
        var petal = document.createElement("div");
        petal.className = "petal";
        petal.style.left                    = Math.random() * 100 + "vw";
        petal.style.animationName           = "fall";
        petal.style.animationDuration       = (7 + Math.random() * 13) + "s";
        petal.style.animationDelay          = (Math.random() * 18) + "s";
        petal.style.animationTimingFunction = "linear";
        petal.style.animationIterationCount = "infinite";
        var size = 8 + Math.random() * 14;
        petal.style.width  = size + "px";
        petal.style.height = size + "px";
        container.appendChild(petal);
    }
}

initTodos();
initTabs();
initSchedule();
initHolidays();
initCalendar();
createPetals();
