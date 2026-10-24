const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const taskCounter = document.getElementById("task-counter");
const footerSection = document.getElementById("footer-section");

function addTask() {
    if (inputBox.value.trim() === '') {
        alert("Please write a task name!");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    
    let span = document.createElement("span");
    span.innerHTML = '<i class="fas fa-trash-alt"></i>';
    li.appendChild(span);
    
    listContainer.appendChild(li);
    inputBox.value = "";
    saveData();
}

inputBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN" || e.target.parentElement.tagName === "SPAN") {
        let item = e.target.closest("li");
        item.remove();
        saveData();
    }
}, false);

function updateCounterAndFooter() {
    const totalTasks = listContainer.getElementsByTagName("li").length;
    taskCounter.innerText = totalTasks + (totalTasks === 1 ? " Task" : " Tasks");
    
    if (totalTasks > 0) {
        footerSection.style.display = "block";
    } else {
        footerSection.style.display = "none";
    }
}

function clearAllTasks() {
    if (confirm("Are you sure you want to clear all tasks?")) {
        listContainer.innerHTML = "";
        saveData();
    }
}

function saveData() {
    localStorage.setItem("tasks", listContainer.innerHTML);
    updateCounterAndFooter();
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("tasks") || "";
    updateCounterAndFooter();
}

showTask();
