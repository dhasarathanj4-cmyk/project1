alert("JavaScript is working!");

// ========================================
// GET HTML ELEMENTS
// ========================================

const addTaskBtn = document.getElementById("addTaskBtn");

const taskForm = document.getElementById("taskForm");

const saveTaskBtn = document.getElementById("saveTaskBtn");

const taskInput = document.getElementById("taskInput");

const subjectInput = document.getElementById("subjectInput");

const timeInput = document.getElementById("timeInput");

const taskList = document.getElementById("taskList");

const subjectCount = document.getElementById("subjectCount");

const completedCount = document.getElementById("completedCount");

const progress = document.getElementById("progress");

const themeBtn = document.getElementById("themeBtn");


// ========================================
// SHOW / HIDE TASK FORM
// ========================================

addTaskBtn.addEventListener("click", function () {

    if (taskForm.style.display === "flex") {

        taskForm.style.display = "none";

    } else {

        taskForm.style.display = "flex";

    }

});


// ========================================
// ADD TASK
// ========================================

saveTaskBtn.addEventListener("click", function () {

    const task = taskInput.value.trim();

    const subject = subjectInput.value.trim();

    const time = timeInput.value;


    // Check empty fields

    if (task === "" || subject === "" || time === "") {

        alert("Please fill all the fields!");

        return;

    }


    // Create task

    const taskDiv = document.createElement("div");

    taskDiv.classList.add("task");


    taskDiv.innerHTML = `

        <div class="task-left">

            <input type="checkbox" class="task-checkbox">

            <div class="task-info">

                <h3>${task}</h3>

                <p>${subject} • ${time}</p>

            </div>

        </div>


        <button class="delete-btn">
            🗑️
        </button>

    `;


    // Add task to page

    taskList.appendChild(taskDiv);


    // Clear inputs

    taskInput.value = "";

    subjectInput.value = "";

    timeInput.value = "";


    // Hide form

    taskForm.style.display = "none";


    // Update statistics

    updateProgress();

});


// ========================================
// COMPLETE TASK
// ========================================

taskList.addEventListener("change", function (event) {

    if (event.target.classList.contains("task-checkbox")) {

        const task = event.target.closest(".task");


        if (event.target.checked) {

            task.classList.add("completed");

        } else {

            task.classList.remove("completed");

        }


        updateProgress();

    }

});


// ========================================
// DELETE TASK
// ========================================

taskList.addEventListener("click", function (event) {

    if (event.target.classList.contains("delete-btn")) {

        const task = event.target.closest(".task");

        task.remove();


        updateProgress();

    }

});


// ========================================
// UPDATE PROGRESS
// ========================================

function updateProgress() {

    const tasks =
        document.querySelectorAll(".task");


    const completedTasks =
        document.querySelectorAll(".task-checkbox:checked");


    const totalTasks = tasks.length;

    const completed =
        completedTasks.length;


    // Completed number

    completedCount.textContent = completed;


    // Progress percentage

    if (totalTasks === 0) {

        progress.textContent = "0%";

    } else {

        const percentage =
            Math.round((completed / totalTasks) * 100);

        progress.textContent = percentage + "%";

    }


    // Subject count

    const subjects =
        document.querySelectorAll(".task-info p");


    const subjectNames = [];


    subjects.forEach(function (item) {

        const text = item.textContent;

        const subject =
            text.split("•")[0].trim();


        if (!subjectNames.includes(subject)) {

            subjectNames.push(subject);

        }

    });


    subjectCount.textContent =
        subjectNames.length;

}


// ========================================
// DARK MODE
// ========================================

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");


    if (
        document.body.classList.contains("dark-mode")
    ) {

        themeBtn.textContent = "☀️";

    } else {

        themeBtn.textContent = "🌙";

    }

});


// ========================================
// STUDY TIMER
// ========================================

let timeLeft = 25 * 60;

let timerInterval = null;


const timerDisplay =
    document.getElementById("timer");

const startBtn =
    document.getElementById("startBtn");

const resetBtn =
    document.getElementById("resetBtn");


// Start timer

startBtn.addEventListener("click", function () {

    if (timerInterval !== null) {

        return;

    }


    timerInterval = setInterval(function () {

        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            timerInterval = null;

            alert("🎉 Study session completed!");

            return;

        }


        timeLeft--;

        updateTimer();

    }, 1000);

});


// Reset timer

resetBtn.addEventListener("click", function () {

    clearInterval(timerInterval);

    timerInterval = null;

    timeLeft = 25 * 60;

    updateTimer();

});


// Display timer

function updateTimer() {

    const minutes =
        Math.floor(timeLeft / 60);

    const seconds =
        timeLeft % 60;


    timerDisplay.textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");

}


// Initial timer

updateTimer();
