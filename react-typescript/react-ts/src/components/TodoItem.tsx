import React from 'react';
import styles from './TodoItem.module.css';

const TodoItem: React.FC<{text:string, deleteTodo: ()=> void}>=(props) =>{
    return (
        <li className={styles.item} onClick={props.deleteTodo}>
          {props.text}
            
        </li>
    );
};

export default TodoItem;