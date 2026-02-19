//source of truth
let tasks = [
    {
        id: 2,
        text:' first task',
        completed:true
    },
    {
        id: 1,
        text:'second todo',
        completed:false
    }

]

//filter state
let currentFilter = 'all'

const tasksContainer = document.querySelector(".tasks");
const taskToAdd = document.querySelector('.task');
const taskInput = document.querySelector(".taskInput");
const addBtn = document.querySelector(".add-btn");
const filter = document.querySelector('.filter-container');


function render(tasks){
    let taskHtml = '';
    tasks.forEach(task => {
        taskHtml += `
                <div class="tasks-container">
                <div class="inner-container">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked":""}
                    data-id='${task.id}'  >
                    <input type="text" value="${task.text}" class="taskInput" disabled>
                </div>
                
                <div class="task-buttons">
                    <button class="edite" data-id='${task.id}' >
                        <img src="assets/pen.png" alt="edit-icon">
                    </button>
                    <button class="remove" data-id ='${task.id}'>
                        <img src="assets/remove.png" alt="remove-icon">
                    </button>
                </div>
            </div>`
    });
    tasksContainer.innerHTML = taskHtml
}

render(tasks)

function addTask(){
    let text = taskToAdd.value;
    tasks.unshift(
        {
            id:Date.now(),
            text:text,
            completed:false
        }
    )
}

// event listener to add task and rerender the html


function clearInput(){
    taskToAdd.value = '';
    focusOnInput(taskToAdd)
}

function removeTask(id){
    tasks = tasks.filter(task => task.id !== id)
}

function editeTask(id){
    const taskInput = document.querySelector(".taskInput")
    taskInput.removeAttribute("disabled")
    focusOnInput(taskInput)
}

function focusOnInput(input){
    input.focus()
    input.setSelectionRange(input.value.length, input.value.length )
}

function changeCompletionState(checked,id){
    tasks.forEach(task => {
        if(task.id === id){
            task.completed = checked;
        }
    })
    setTimeout(() => {
        render(getFilterState(currentFilter))

    }, 500);
}


function getFilterState(){
    if(currentFilter === 'completed') return tasks.filter(task => task.completed === true);
    if(currentFilter === 'active') return tasks.filter(task => task.completed === false );
    return tasks
}

 tasksContainer.addEventListener('click', event => {
    let removeBtn = event.target.closest('.remove')
    let editBtn = event.target.closest('.edite')
    let text = event.target.closest('.taskinput')
    let checkbox = event.target.closest('.checkbox')
    
    if(removeBtn){
        let id = Number(removeBtn.dataset.id)
        removeTask(id)
        render(getFilterState(currentFilter))
    }
    if(editBtn){
        let id = Number(editBtn.dataset.id)
        editeTask(editBtn,id)
        console.log('edite worked')
    }
    if(checkbox){
        let id = Number(checkbox.dataset.id);
        changeCompletionState(checkbox.checked, id)
    }
 })
filter.addEventListener('click', (event) => {
    const filterAll = event.target.closest('#all-btn')
    const completedFilter = event.target.closest('#completed-btn')
    const activeFilter = event.target.closest('#active-btn')
    const clickedBtn = filterAll || completedFilter || activeFilter

    if(!clickedBtn) return;
    //remove active style from the filter buttons ;
    document.querySelectorAll('.filter-container button').forEach((button)=>{
        button.classList.remove('active-filter')
    })

    clickedBtn.classList.add('active-filter')

    if(filterAll){
        currentFilter = "all";
        render(getFilterState(currentFilter))
    }
    if(completedFilter){
        currentFilter = "completed"
        completedTasks = tasks.filter(task => task.completed === true)
        render(getFilterState(currentFilter))
    }
    if(activeFilter){
        currentFilter = "active"
        atciveTasks = tasks.filter(task => task.completed === false )
        render(getFilterState(currentFilter))
    }
    console.log(currentFilter)
})
addBtn.addEventListener('click', () => {
    addTask()
    render(getFilterState(currentFilter))
    clearInput()
})

taskToAdd.addEventListener('keydown', (event) =>  {
    if(event.key == "Enter"){
        addTask()
        render(getFilterState())
        clearInput()
    }
})