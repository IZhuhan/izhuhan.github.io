import React, {useState} from 'react'
import ToDoListItem from "./ToDoListItem.jsx";

const ToDoListContainer = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoList, setTodoList] = useState([]);

  const handleInputChange = (event) => {
    setTodoTitle(event.target.value);
  }

  const handleAddTodo = () => {
    const newTodoItem = {
      id: Math.random(),
      title: todoTitle,
      isDone: false
    };

    setTodoList([...todoList, newTodoItem]);
  }

  const handleCompleteTodo = (id) => {
    const newTodoList = todoList.map(todoItem =>
      todoItem.id === id
        ? { ...todoItem, isDone: !todoItem.isDone }
        : todoItem
    )

    setTodoList(newTodoList);
  }

  const handleDeleteTodo = (id) => {
    const newTodoList = todoList.filter(todoItem => todoItem.id !== id);
    setTodoList(newTodoList);
  }

  return (
    <div>
      <div>
        <input
          value={todoTitle}
          onChange={handleInputChange}
          type="text"
          placeholder="Type a title..."
        />
        <button onClick={handleAddTodo}>Add todo</button>
      </div>

      <ul>
        {
          todoList.map(todoItem => {
            return (
              <ToDoListItem
                key={todoItem.id}
                todo={todoItem}
                onCompleteTodo={() => handleCompleteTodo(todoItem.id)}
                onDeleteTodo={() => handleDeleteTodo(todoItem.id)}
              />
            )
          })
        }
      </ul>
    </div>
  )
}
export default ToDoListContainer
