// function Todos(props){
//     return <ul>

//         <li>리액트 배우기</li>
//         <li>타입 스크립트 배우기</li>
//     </ul>
// }
import React from 'react';
import Todo from '../models/todo'
import TodoItem from './TodoItem';
import styles from './Todos.module.css';
const Todos: React.FC<{ items: Todo[], deleteTodo: (id:string) => void }> = (props) => {



  return <ul className={styles.todos}>
    {props.items.map((it) =>
      <TodoItem key={it.id} text={it.text} deleteTodo={props.deleteTodo.bind(null, it.id)} />
    )}
  </ul>
}
export default Todos;