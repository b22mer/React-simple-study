import React, {useRef, useImperativeHandle} from 'react';
// 이훅을 사용하면 컴포넌트나 컴포넌트 내부에서 오는 기능들을 명령적으로 사용이 가능, 거의사용 x
import classes from './Input.module.css'
const Input = React.forwardRef((props, ref) => {
    const inputRef=useRef();

    const activate=()=>{
        inputRef.current.focus();
    };

    useImperativeHandle(ref, ()=>{
        return{
            focus: activate,
        }
           
    })
    return (
        <div
          className={`${classes.control} ${
            props.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor={props.id}>{props.label}</label>
          <input
            ref={inputRef}
            type={props.type}
            id={props.id}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
          />
        </div>
    );
});

export default Input;