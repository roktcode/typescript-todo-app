interface TodoItem {
	id: number;
	text: string;
	isCompleted: boolean;
}

let todoList: Array<TodoItem> = [];

function genearteId(): number {
	const maxId = todoList.reduce((acc, current) => {
		return current.id > acc ? current.id : acc;
	}, 0);

	return maxId + 1;
}

const formElement = document.querySelector("form");
const inputElement = <HTMLInputElement>document.querySelector("#input");
const addBtn = document.querySelector("#button");
const todoListElement = document.querySelector("ul");
const deleteBtn = document.querySelector("delete-btn");

function addTodoItem(e: Event) {
	e.preventDefault();

	if (!inputElement.value) return;

	todoList.push({
		id: genearteId(),
		text: inputElement.value,
		isCompleted: false,
	});

	renderTodos();
	inputElement.value = "";
}

function renderTodoItem(item: TodoItem): HTMLLIElement {
	const li = document.createElement("li");
	li.dataset.dataId = item.id.toString();

	const textContainer = document.createElement("div");
	textContainer.classList.add("text");
	textContainer.textContent = item.text;

	textContainer.addEventListener("click", () => toggleTodoCompleted(item.id));
	
	if (item.isCompleted) textContainer.classList.add("completed");

	const btnContainer = document.createElement("div");
	btnContainer.classList.add("actions");
	const deleteBtn = document.createElement("button");
	deleteBtn.classList.add("delete-btn");
	deleteBtn.textContent = "delete";

	// add delete event listener
	deleteBtn.addEventListener("click", () => deleteTodo(item.id));

	btnContainer.appendChild(deleteBtn);

	li.appendChild(textContainer);
	li.appendChild(btnContainer);

	return li;
}

function toggleTodoCompleted(id: number) {
	const todo = todoList.find((item) => item.id === id);

	if (!todo) return;

	todo.isCompleted = !todo?.isCompleted;

	todoList = todoList.map((item) => (item.id !== id ? item : todo));

	renderTodos();
}

function deleteTodo(id: number) {
	todoList = todoList.filter((todo) => todo.id !== id);

	// render the new list after todo deleted
	renderTodos();
}

function clearTodos() {
	while (todoListElement?.firstChild) {
		todoListElement.removeChild(todoListElement.firstChild);
	}
}

function renderTodos() {
	// clear the todoListItem
	clearTodos();

	for (let todo of todoList) {
		todoListElement?.appendChild(renderTodoItem(todo));
	}
}

function init() {
	renderTodos();
}

init();

// event listeners
formElement?.addEventListener("submit", addTodoItem);
addBtn?.addEventListener("click", addTodoItem);
