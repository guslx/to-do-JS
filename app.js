const formAddTodo = document.querySelector('.form-add-todo')
const inputSearchTodo = document.querySelector('.form-search input')
const todosContainer = document.querySelector('.todos-container')
const boxes = document.getElementsByClassName('caixa')

const addTodo = inputValue => {
    if(inputValue.length) {
        todosContainer.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center" data-todo="${inputValue}">
                <input type="checkbox" class="caixa">
                <span class="">${inputValue}</span>
                <i class="far fa-trash-alt" data-trash="${inputValue}"></i>
             </li>`

        event.target.reset()
    }
}

formAddTodo.addEventListener('submit', event => {
    event.preventDefault()

    const inputValue = event.target.add.value.trim()
    addTodo(inputValue)

    let score = 0
    Array.from(boxes).forEach( box => {
        
        box.addEventListener('change', event => {
               
            if(event.target.checked) {
                event.target.nextSibling.nextSibling.classList.add('task-done')
                score++
            } else if(!event.target.checked) {
                event.target.nextSibling.nextSibling.classList.remove('task-done')
                score--
            }
            
            if(score == boxes.length) {
                todosContainer.classList.add('success')
            } else if (score !== boxes.length) {
                todosContainer.classList.remove('success')
            }

            console.log(score)
        })
    })
})

const removeTodo = clickedElement => {
    const trashDataValue = clickedElement.dataset.trash
    const todo = document.querySelector(`[data-todo="${trashDataValue}"]`)
    
    if(trashDataValue) {
        todo.remove()
    }
}


todosContainer.addEventListener('click', event => {
    const clickedElement = event.target
    removeTodo(clickedElement)

})

const filterTodos = (todos, inputValue, returnMatchedTodos) => todos
    .filter(todo => {
        const matchedTodos = todo.textContent.toLowerCase().includes(inputValue)
        return returnMatchedTodos ? matchedTodos : !matchedTodos
    })

const manipulateClasses = (todos, classToAdd, classToRemove ) => {
    todos.forEach(todo => {
        todo.classList.remove(classToRemove)
        todo.classList.add(classToAdd)
    })
}

const hideTodos = ( todos, inputValue) => {
   const todosToHide = filterTodos(todos, inputValue, false)
    manipulateClasses(todosToHide, 'hidden', 'd-flex')
}

const showTodos = (todos, inputValue) => {
    const todosToShow = filterTodos(todos, inputValue, true)
    manipulateClasses(todosToShow, 'd-flex', 'hidden')
}

inputSearchTodo.addEventListener('input', event => {
   const inputValue = event.target.value.trim().toLowerCase()
    const todos = Array.from(todosContainer.children)

    hideTodos(todos, inputValue)
    showTodos(todos, inputValue)
    
})



const arrayOfBoxes = Array.from(boxes)

console.log(arrayOfBoxes, boxes)






