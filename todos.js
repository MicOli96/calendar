var todos = JSON.parse(localStorage.getItem("todos") || "[]");

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function formatDate(dateString) {
    var parts = dateString.split("-");
    return parts[2] + "/" + parts[1] + "/" + parts[0];
}

function deleteTodo(event) {
    var index = parseInt(event.target.getAttribute("data-index"));
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

function renderTodos() {
    var list = document.getElementById("todo-list");
    list.innerHTML = "";

    if (todos.length === 0) {
        var emptyItem = document.createElement("li");
        emptyItem.className = "empty-message";
        emptyItem.textContent = "No todos yet.";
        list.appendChild(emptyItem);
        if (typeof renderCalendar === "function") renderCalendar();
        return;
    }

    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i];

        var item = document.createElement("li");
        item.className = "todo-item";

        var textSpan = document.createElement("span");
        textSpan.className = "todo-text";
        textSpan.textContent = todo.text;

        var dateSpan = document.createElement("span");
        dateSpan.className = "todo-date-label";
        dateSpan.textContent = formatDate(todo.date);

        var deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "×";
        deleteButton.setAttribute("data-index", i);
        deleteButton.addEventListener("click", deleteTodo);

        item.appendChild(textSpan);
        item.appendChild(dateSpan);
        item.appendChild(deleteButton);
        list.appendChild(item);
    }

    if (typeof renderCalendar === "function") renderCalendar();
}

function initTodos() {
    var form = document.getElementById("todo-form");

    var today = new Date();
    var year  = today.getFullYear();
    var month = String(today.getMonth() + 1).padStart(2, "0");
    var day   = String(today.getDate()).padStart(2, "0");
    document.getElementById("todo-date").value = year + "-" + month + "-" + day;

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        var text = document.getElementById("todo-text").value.trim();
        var date = document.getElementById("todo-date").value;

        if (text === "" || date === "") return;

        todos.push({ text: text, date: date });
        saveTodos();
        renderTodos();

        document.getElementById("todo-text").value = "";
        document.getElementById("todo-date").value = year + "-" + month + "-" + day;
    });

    renderTodos();
}
