"use strict";

const inputBox = document.querySelector("#input-box");
const listContainer = document.querySelector(".list-container");
const addTaskBtn = document.querySelector("#add-task");

function saveData() {
  localStorage.setItem("taskData", listContainer.innerHTML);
}

function showTasks() {
  listContainer.innerHTML = localStorage.getItem("taskData");
}

showTasks();

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something to add a task!");
  } else {
    const li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    const span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
}

function handleClick(e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
  }
  saveData();
}

addTaskBtn.addEventListener("click", addTask);

listContainer.addEventListener("click", handleClick, false);
