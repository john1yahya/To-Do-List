let tasks = [];

const tasksContainer = document.querySelector('.tasks');
const input = document.querySelector('.task');

document.querySelector('.add-btn').addEventListener('click', () => {

    let inputElement = input.value;

    addTask({
        name:inputElement,
        id:Date.now(),
        isActive:false
    });

    clearInput();
});

//function to add tasks to the todoList
function addTask(task){
    tasks.unshift(task);
    renderToDo()
}

//rendering the html function 
function renderToDo(){
    tasksContainer.innerHTML = '';
    tasks.forEach((task) => {
        tasksHtml = `
         <div class="tasks-container">
                <span class="date">Apr 24</span>
                <div class="inner-container">
                    <input type="checkbox" class="checkbox" 
                        data-id='${task.id}' 
                        ${task.isActive ? "checked" : ''} ">
                    <h2 class=" ${task.isActive ? 'completed' : ''}">${task.name}</h2>
                    <button class="edite">
                        <img src="assets/pen.png" alt="edit-icon">
                    </button>
                    <button class="remove">
                        <img src="assets/remove.png" alt="remove-icon">
                    </button>
                </div>
            </div>
    `
    tasksContainer.innerHTML += tasksHtml;
    });
}

//clearing the input
function clearInput(){
    input.value = '';
    input.focus(); 
}

document.querySelector('.tasks').addEventListener('click', (event) => {
    const checkbox = event.target.closest('.checkbox');
    const deletButton = event.target.closest('.remove');
    const editeButton = event.target.closest('.edite');

    let task = tasks.find((t) => t.id == checkbox.dataset.id)
    if (checkbox){
        task.isActive = checkbox.checked;
        renderToDo();
        console.log('updated tasks :', tasks);
    }
    

})

