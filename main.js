let todoList
let todoInput
let deleteBtn
let finishBtn
let deleteCompledeBtn
let todoFilterBox
let allBtn
let activeBtn
let completedBtn
let root = document.documentElement
let popup
let popupInput
let popupCloseBtn
let popupAcceptBtn
let todoToEdit

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
	sunBtn = document.querySelector('#sun')
	moonBtn = document.querySelector('#moon')
	backgroundTop = document.querySelector('.background__top')
	popup = document.querySelector('.popup')
	popupInput = document.querySelector('.popup__input')
	popupCloseBtn = document.querySelector('.popup__box-buttons--cancel')
	popupAcceptBtn = document.querySelector('.popup__box-buttons--accept')
}

const preapareDOMEvents = () => {
	todoInput.addEventListener('keyup', checkEnter)
	todoList.addEventListener('click', todoEditor)
	deleteCompledeBtn.addEventListener('click', deleteCompleted)
	todoFilterBox.addEventListener('click', filterTodos)
	sunBtn.addEventListener('click', lightBackground)
	moonBtn.addEventListener('click', darkBackground)
	document.body.addEventListener('click', checkClick)
	popupCloseBtn.addEventListener('click', closePopup)
	popupAcceptBtn.addEventListener('click', acceptChange)
	popupInput.addEventListener('keyup', checkEnter)
}

document.addEventListener('DOMContentLoaded', main)

const CreateNewTodo = () => {
	const newTodo = document.createElement('li')
	newTodo.classList.add('todo__list-item')
	newTodo.innerHTML = `<div class="todo__list-item-circle circle"></div>
    <div class="todo__list-item-text">
    </div>
    <button class="todo__list-item-edit">EDIT</button>
    <img src="./images/icon-cross.svg" alt="" class="todo__list-item-delete"></li>`
	const liSummary = document.querySelector('.todo__list-summary')
	todoList.insertBefore(newTodo, liSummary)
	const allItemsText = document.querySelectorAll('.todo__list-item-text')
	allItemsText[allItemsText.length - 1].textContent = todoInput.value
	todoInput.value = ''
}

const checkEnter = e => {
	if (e.key === 'Enter') {
		checkContent()
		acceptChange()
	} else {
	}
}

const checkClick = e => {
	if (
		e.target.matches('.todo__create') ||
		e.target.matches('.todo__create-circle') ||
		e.target.matches('.todo__create-input') ||
		e.target.matches('#sun') ||
		e.target.matches('#moon') ||
		e.target.matches('#clear-completed') ||
		e.target.matches('#active') ||
		e.target.matches('#all') ||
		e.target.matches('#completed')
	) {
	} else {
		checkContent()
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
		todoCounter()
	} else if (e.target.matches('.todo__list-item-edit')) {
		showPopup(e.target)
	}
}
const todoCounter = () => {
	const allItems = document.querySelectorAll('.todo__list-item')
	let itemsCounter = 0
	allItems.forEach(el => {
		if (el.firstElementChild.matches('.finished-task')) {
		} else {
			itemsCounter++
		}
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
	todoCounter()
}

//FILTER FUNCITONS

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

//CHANGE COLOR

const lightBackground = () => {
	moonBtn.style.display = 'block'
	sunBtn.style.display = 'none'
	backgroundTop.classList.add('light-background')
	root.style.setProperty('--todo-background--color', 'hsl(0, 0%, 98%)')
	root.style.setProperty('--background-bottom-color', 'hsl(236, 33%, 92%)')
	root.style.setProperty('--text-color', 'black')
	root.style.setProperty('--dark-grayish-blue', 'hsl(235, 19%, 35%)')
}
const darkBackground = () => {
	moonBtn.style.display = 'none'
	sunBtn.style.display = 'block'
	backgroundTop.classList.remove('light-background')
	root.style.setProperty('--todo-background--color', 'hsl(235, 24%, 19%)')
	root.style.setProperty('--background-bottom-color', 'hsl(235, 21%, 11%)')
	root.style.setProperty('--text-color', 'white')
	root.style.setProperty('--dark-grayish-blue', 'hsl(233, 14%, 35%)')
}

//POPUP

const showPopup = input => {
	popup.classList.add('show')
	todoToEdit = input.previousElementSibling
	popupInput.value = todoToEdit.textContent.trim()
}

const closePopup = () => {
	popup.classList.remove('show')
	popupInput.value = ''
}

const acceptChange = () => {
	if (popupInput.value === '') {
		popupInput.placeholder = `Todo can't be empty`
	} else {
		todoToEdit.textContent = popupInput.value
		closePopup()
	}
}
