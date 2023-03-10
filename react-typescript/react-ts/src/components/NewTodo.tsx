import React, { useRef, useContext} from 'react';
import {TodosContext} from "../store/todos-context"
import styles from './NewTodo.module.css';
const NewTodo: React.FC = ()=> {
    const todosCtx = useContext(TodosContext);
    const todoTextInputRef = useRef<HTMLInputElement>(null);
    const submitHandler = (e: React.FormEvent)=>{
        e.preventDefault();
        const enteredText= todoTextInputRef.current!.value;
        // 값이 아직 할당되지 않았을수도있기에 ? 가 붙는다.
        // !면 절대 null이 아니다. 100프로 확실할떄만
        if(enteredText?.trim().length ===0){

            return;
        }
        todosCtx.addTodo(enteredText);
    
    }     

    return (
        <form  onSubmit={submitHandler} className={styles.form}>
            <label htmlFor='text'>Todo Text</label>
            <input type="text" id='text' ref={todoTextInputRef} />
            <button>Add Todo</button>
        </form>
    );
};

export default NewTodo;