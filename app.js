const formAddTodo = document.querySelector('.form-add-todo')
const inputSearchTodo = document.querySelector('.form-search input')
const todosContainer = document.querySelector('.todos-container')
const boxes = document.getElementsByClassName('caixa')

formAddTodo.addEventListener('submit', event => {
    event.preventDefault()

    const inputValue = event.target.add.value.trim()
    if(inputValue.length) {
        todosContainer.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <input type="checkbox" class="caixa">
                <span class="">${inputValue}</span>
                <i class="far fa-trash-alt delete"></i>
             </li>`

        event.target.reset()
    }

    
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
            }

            console.log(score)
        })
    })
})


todosContainer.addEventListener('click', event => {
    const clickedElement = event.target
    const includesClassDelete = Array.from(clickedElement.classList).includes('delete')

    if(includesClassDelete) {
        clickedElement.parentElement.remove()
    }
})

inputSearchTodo.addEventListener('input', event => {
   const inputValue = event.target.value.trim().toLowerCase()
    Array.from(todosContainer.children)
    .filter(todo => !todo.textContent.toLowerCase().includes(inputValue))
    .forEach(todo => {
        todo.classList.remove('d-flex')
        todo.classList.add('hidden')
    }) 
    Array.from(todosContainer.children)
    .filter(todo => todo.textContent.toLowerCase().includes(inputValue))
    .forEach(todo => {
        todo.classList.remove('hidden')
        todo.classList.add('d-flex')
    }) 
})



const arrayOfBoxes = Array.from(boxes)

console.log(arrayOfBoxes, boxes)






