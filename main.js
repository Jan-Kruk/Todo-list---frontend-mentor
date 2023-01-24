let todoList
let todoInput
let deleteBtn
let finishBtn
let deleteCompledeBtn
let todoFilterBox
let allBtn
let activeBtn
let completedBtn

const main = () => {
	preapareDOMElements()
	preapareDOMEvents()
	todoCounter()
	showAll()
}

const preapareDOMElements = () => {
	todoList = document.querySelector('.todo__list')
	todoInput = document.querySelector('.todo__create-input')
	deleteBtn = document.querySelector('.todo__list-item-delete')
	finishBtn = document.querySelector('.todo__list-item-circle')
	deleteCompledeBtn = document.querySelector('#clear-completed')
	todoFilterBox = document.querySelector('.todo__filter')
	allBtn = document.querySelector('#all')
	activeBtn = document.querySelector('#active')
	completedBtn = document.querySelector('#completed')
}

const preapareDOMEvents = () => {
	todoInput.addEventListener('keyup', checkEnter)
	todoList.addEventListener('click', todoEditor)
	deleteCompledeBtn.addEventListener('click', deleteCompleted)
	todoFilterBox.addEventListener('click', filterTodos)
}

document.addEventListener('DOMContentLoaded', main)

const CreateNewTodo = () => {
	const newTodo = document.createElement('li')
	newTodo.innerHTML = `<li class="todo__list-item"><div class="todo__list-item-circle circle"></div>
    <div class="todo__list-item-text">
      <p>${todoInput.value}</p>
    </div>
    <img src="./images/icon-cross.svg" alt="" class="todo__list-item-delete"></li>`
	const liSummary = document.querySelector('.todo__list-summary')
	todoList.insertBefore(newTodo, liSummary)
	todoInput.value = ''
}

const checkEnter = e => {
	if (e.key === 'Enter') {
		checkContent()
	} else {
	}
}

const checkContent = () => {
	if (todoInput.value === '') {
		todoInput.placeholder = 'Write some todo to add'
	} else {
		CreateNewTodo()
		todoInput.placeholder = 'Create a new todo...'
		todoCounter()
	}
}

const todoEditor = e => {
	if (e.target.matches('.todo__list-item-delete')) {
		e.target.closest('li').remove()
		todoCounter()
	} else if (e.target.matches('.todo__list-item-circle')) {
		e.target.classList.toggle('finished-task')
		e.target.nextElementSibling.classList.toggle('finished-task')
	}
}
const todoCounter = () => {
	const allItems = document.querySelectorAll('.todo__list-item')
	let itemsCounter = 0
	allItems.forEach(el => {
		itemsCounter++
	})
	const itemsLeft = document.querySelector('#items-left')
	itemsLeft.innerText = `${itemsCounter} items left`
}

const deleteCompleted = () => {
	const allItems = document.querySelectorAll('.todo__list-item')
	allItems.forEach(el => {
		if (el.firstElementChild.matches('.finished-task')) {
			el.remove()
		}
	})
}

const filterTodos = e => {
	if (e.target.matches('#all')) {
		showAll()
	} else if (e.target.matches('#active')) {
		showActive()
	} else if (e.target.matches('#completed')) {
		showCompleted()
	}
}

const showAll = () => {
	const allItems = document.querySelectorAll('.todo__list-item')
	allItems.forEach(el => {
		el.style.display = 'flex'
	})
	allBtn.style.color = 'hsl(220, 98%, 61%)'
	completedBtn.style.color = ''
	activeBtn.style.color = ''
}

const showActive = () => {
	const allItems = document.querySelectorAll('.todo__list-item')
	allItems.forEach(el => {
		if (el.firstElementChild.matches('.finished-task')) {
			el.style.display = 'none'
		} else {
			el.style.display = 'flex'
		}
	})
	allBtn.style.color = ''
	completedBtn.style.color = ''
	activeBtn.style.color = 'hsl(220, 98%, 61%)'
}
const showCompleted = () => {
	const allItems = document.querySelectorAll('.todo__list-item')
	allItems.forEach(el => {
		if (el.firstElementChild.matches('.finished-task')) {
			el.style.display = 'flex'
		} else {
			el.style.display = 'none'
		}
	})
	allBtn.style.color = ''
	completedBtn.style.color = 'hsl(220, 98%, 61%)'
	activeBtn.style.color = ''
}
