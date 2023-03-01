import React, { useState } from 'react';
import './App.css';
import Todos from './components/Todos';
import Todo from './models/todo';
import NewTodo from './components/NewTodo';

function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  const addToHandler = (todoText: string)=>{
    const newTodo =new Todo(todoText);
    setTodos((prev)=>{
      return prev.concat(newTodo);
    })
  }

  const deleteToDoHandler = (id: string)=>{
    setTodos((prev)=>{
      return prev.filter(it=> it.id!==id);
    })
  }

  return (
    <div >
     <NewTodo onAddTodo={addToHandler}/> 
      <Todos deleteTodo={deleteToDoHandler} items={todos}/>
    </div>
  );
}

export default App;
