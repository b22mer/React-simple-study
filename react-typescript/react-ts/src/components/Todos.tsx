import React,{useContext}from 'react';

import TodoItem from './TodoItem';
import {TodosContext} from "../store/todos-context"
import styles from './Todos.module.css';
const Todos: React.FC = () => {

const todosCtx = useContext(TodosContext);

  return <ul className={styles.todos}>
    {todosCtx.items.map((it) =>
      <TodoItem key={it.id} text={it.text} deleteTodo={todosCtx.deleteTodo.bind(null, it.id)} />
    )}
  </ul>
}
export default Todos;