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
function renderTaskList() {
   $("#todo-cards").empty();
   $("#in-progress-cards").empty();
   $("#done-cards").empty();


   taskList.forEach(task => {
       let card = createTaskCard(task);
       $(`#${task.status}-cards`).append(card);
   });


   $(".task-card").draggable({
       cursor: "move",
       zIndex: 1000
   });
}
// Todo: create a function to handle adding a new task
function handleAddTask(event) {
   event.preventDefault();
   let taskName = $("#taskName").val();
   let dueDate = $("#dueDate").val();
   let taskDescription = $("#taskDescription").val();
   if (taskName && dueDate && taskDescription) {
       let newTask = {
           id: generateTaskId(),
           name: taskName,
           date: dueDate,
           description: taskDescription,
           status: "todo"
       };
       taskList.push(newTask);
       localStorage.setItem("tasks", JSON.stringify(taskList));
       localStorage.setItem("nextId", JSON.stringify(nextId));
       renderTaskList();
       $("#formModal").modal("hide");
       $("#taskForm")[0].reset();
   } else {
       alert("Complete Task Form");
   }
}
// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    let taskId = $(this).data("task-id");
    taskList = taskList.filter(task => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
 }
 // Todo: create a function to handle dropping a task into a new status lane
 function handleDrop(event, ui) {
    let taskId = ui.draggable.attr("id").split("-")[1];
    let newStatus = $(this).attr("id");
    let taskIndex = taskList.findIndex(task => task.id == taskId);
    taskList[taskIndex].status = newStatus;
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
 }
 // Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
 $(document).ready(function () {
    renderTaskList();
    $("#taskForm").submit(handleAddTask);
    $(document).on("click", ".delete-btn", handleDeleteTask);
    $(".lane").droppable({
        accept: ".task-card",
        drop: handleDrop
    });
    $("#dueDate").datepicker();
 });
 