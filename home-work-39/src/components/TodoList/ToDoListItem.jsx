import React from 'react'

const ToDoListItem = (props) => {
  const { todo, onCompleteTodo, onDeleteTodo } = {...props};

  return (
    <li>
      <button onClick={onCompleteTodo}>
        {todo.isDone ? '-' : '+'}
      </button>
      {todo.title}
      <button onClick={onDeleteTodo}>X</button>
    </li>
  )
}
export default ToDoListItem
