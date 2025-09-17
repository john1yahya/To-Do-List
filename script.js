let tasks = [];

const tasksContainer = document.querySelector('.tasks');



let input = document.querySelector('.task');
document.querySelector('.add-btn').addEventListener('click', () => {


    tasks.forEach((task, idx)=> {
        console.log(task);
        console.log(idx)
    })

    let inputElement = input.value;
    addTask({name:inputElement,id:tasks.length+1,isActive:true})
    
    


console.log(tasks)
    
});

function addTask(task){
    tasks.push(task);
    renderToDo(task)
}

tasks.forEach((task, idx)=> {
     console.log(task);
    console.log(idx);
})
function renderToDo(task){
    tasksHtml = `
         <div class="tasks-container">
                <span class="date">Apr 24</span>
                <div class="inner-container">
                    <input type="checkbox">
                    <h2>${task.name}</h2>
                    <button class="edite">
                        <img src="assets/pen.png" alt="edit-icon">
                    </button>
                    <button class="remove">
                        <img src="assets/remove.png" alt="remove-icon">
                    </button>
                </div>
            </div>
    `
    tasksContainer.innerHTML += tasksHtml
}
// i have to creat a function that takes the input and put it inide the array
