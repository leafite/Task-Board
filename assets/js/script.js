let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));
// Todo: create a function to generate a unique task id
function generateTaskId() {
    return nextId++;
}
// Todo: create a function to create a task card
function createTaskCard(task) {
    let card = `
        <div id="task-${task.id}" class="task-card card bg-light mb-3" draggable="true">
            <div class="card-body">
                <h5 class="card-title">${task.name}</h5>
                <p class="card-date">${task.date}</p>
                <p class="card-text">${task.description}</p>
                <button class="btn btn-danger delete-btn" data-task-id="${task.id}">Delete</button>
            </div>
        </div>
    `;
    return card;
}
// Todo: create a function to render the task list and make cards draggable

// Todo: create a function to handle adding a new task

// Todo: create a function to handle deleting a task

// Todo: create a function to handle dropping a task into a new status lane

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
