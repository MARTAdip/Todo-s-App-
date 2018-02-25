const todoList = {
    todos: [],
    // add todo items as objects
    addTodo: function (todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });

    },
    // change todos
    changeTodo: function (position, todoText) {
        this.todos[position].todoText = todoText;
    },
    // delete todos
    deleteTodo: function (position) {
        this.todos.splice(position, 1);
    },
    // toggle completed status
    toggleCompleted: function (position) {
        const todo = this.todos[position];
        todo.completed = !todo.completed;
    },
    // toggle completed status of all todos
    toggleAll: function () {
        const totalTodos = this.todos.length;
        let completedTodos = 0;
    // check and store if there are completed todos    
       this.todos.forEach(function(todo){
           if(todo.completed === true){
               completedTodos++;
           }
       }); 

        this.todos.forEach(function(todo){
            const todoItem = todo;
    // make everything false if everything is true        
            if (completedTodos === totalTodos) {
            todoItem.completed = false;  
    // otherwise make everything  true            
            } else {
            todoItem.completed = true;
            }
        });
    }
};

// object for button clicks events
const handlers = {
    addTodo: function () {
        const addTodoTextInput = document.getElementById('addTodoTextInput');
        todoList.addTodo(addTodoTextInput.value);
        addTodoTextInput.value = "";
        ui.displayTodos();
    },
    changeTodo: function () {
        const changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
        const changeTodoTextInput = document.getElementById('changeTodoTextInput');
        todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
        changeTodoPositionInput.value = "";
        changeTodoTextInput.value = "";
        ui.displayTodos();
    },
    deleteTodo: function (position) {
        todoList.deleteTodo(position);
        ui.displayTodos();
    },
    toggleCompleted: function () {
        const toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
        todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
        toggleCompletedPositionInput.value = "";
        ui.displayTodos();
    },
    toggleAll: function () {
        todoList.toggleAll();
        ui.displayTodos();
    }
};
// user interface : view
const ui = {
    displayTodos: function () {
        const todosUL = document.querySelector('ul');
        todosUL.innerHTML = "";
 // create li for every todos      
        todoList.todos.forEach(function(todo, position){
            const todoLi = document.createElement('li');
            let todoTextWithCompletion = "";

            if (todo.completed === true) {
                todoTextWithCompletion = '(x)' + todo.todoText;
            } else {
                todoTextWithCompletion = '()' + todo.todoText;
            }
            todoLi.id = position;
            todoLi.textContent = todoTextWithCompletion;
            todoLi.appendChild(this.createDeleteButton());
            todosUL.appendChild(todoLi);
     // 'this' correctly points at the object "ui"        
        }, this);
    }, 
    createDeleteButton: function () {
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'deleteButton';
        return deleteButton;
    },
    setUpEventListeners: function () {
        const todosUL = document.querySelector('ul');
        todosUL.addEventListener('click', function (e) {
            //console.log(e.target.parentNode.id) 
            const elementClicked = e.target;
            if (elementClicked.className === 'deleteButton') {
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
            }

        });
    }

};
// code execution

ui.setUpEventListeners();