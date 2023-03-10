// -----------------------------------------------------------------------------------------
// π κ°μλ΄μ©μ€ μ€μλΆλΆ μ²΄ν¬
// β­οΈ μ§μ€νμ μ§μ€μ
// -----------------------------------------------------------------------------------------
// -μ¬μ΄λ μ΄ννΈλ λ³΄ν΅http λ¦¬νμ€νΈκ° μλ€.
// -μ¬μ΄νΈ μ΄ννΈμ μμλ‘λ λ£κ³ μλ ₯λ λ°μ΄ν°λ₯Ό μ μ₯νλκ²λ ν¬νλλ€.
// -μλ΅μ λν λ€λ₯Έ μ‘μμΌλλ ν¬ν¨, μ¦ μ΄λ©μΌ λΉλ°λ²νΈ νλμ ν€μλ ₯μ λν μλ΅μΌλ‘ ν΄λΉ νΌμ μ 
//  ν¨μ±μ νμΈνκ³  μλ°μ΄νΈνλκ²μ μ¬μ΄λ μ΄ννΈλΌ ν μμκ² λ€. λ¬΄μΈκ°μ λν μλ΅.
// -cleanup ν¨μ? : state ν¨μκ° μ€νλκΈ° μ μ μ€νμ΄ λλ€. κ·Όλ° μ²μ μ€νλκΈ° μ μλ μ€νλμ§ μλλ€.
// -λ‘κ·ΈμΈν μ»΄ν¬λνΈκ° μ¬λΌμ§λ©΄ μ€νμ΄λλ€.
// -νλμ stateλ₯Ό κΈ°λ°ν₯λ‘ νλ stateλ‘ μλ°μ΄νΈνλκ²½μ°μλ λ³ν©νλκ² μ’μμμλ€.
// -Reducer ν¨μλ μ»΄ν¬λνΈ μμ μλ§λ€μ΄λλλ€. κ·Έ μ΄μ λ μ»΄ν¬λνΈ λ΄λΆμμ μ μλ κ·Έμ΄λ€κ²κ³Όλ μ°κ΄ x
// -useEffect()μ κ°μ²΄ μμ±μ μ’μμ±μΌλ‘ μΆκ°νκΈ° μν΄ dstructuringμ μ¬μ©, λ§€μ° μΌλ°μ μΈ ν¨ν΄ λ° μ κ·Ό λ°©μ
// -ν΅μ¬μ μ°λ¦¬κ° destructuringμ μ¬μ©νλ€λ κ²μ΄ μλλΌ, μ μ²΄ κ°μ²΄ λμ  νΉμ  μμ±μ μ’μμ±μΌλ‘ μ λ¬νλ€λ κ²
// -----------------------------------------------------------------------------------------
// useState vs useReducer

import React, { useEffect, useState, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state, action)=>{
  if(action.type === "USER_INPUT"){
    return {value: action.val, isValid: action.val.includes('@') };
  }else if(action.type==='INPUT_BLUR'){
    return {value: state.value, isValid: state.value.includes('@')}; // μ¬κΈ°μ stateλ μ΅μ  state
  }
  return {value: '', isValid: false};
}

const passwordReducer= (state, action)=>{
  if(action.type==="USER_INPUT"){
    return {value: action.val, isValid: action.val.trim().length >6 }; // trimμ μ’μ°κ° κ³΅λ°±μ κ±°
  }

  if(action.type==="INPUT_BLUR"){
    return {value: state.value, isValid: state.value.trim().length >6 };
  }

  return {value: '', isValid: false};

}
const Login = (props) => {

const authCtx=useContext(AuthContext);
const emailInputRef= useRef();
const passwordInputRef= useRef();


const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
  value: '', isValid: undefined,
 });
 const [emailState, dispatchEmail] = useReducer(emailReducer, {
  value: '', isValid: undefined, // μ΄κΈ°μ μ΄λ κ² λλ©΄ μ²μλΆν° λΈλ¬ μ²λ¦¬λλκ²μ λ§λλ€.
});

const [formIsValid, setFormIsValid] = useState(false);


useEffect(()=>{
  console.log("effect running");
  
  return ()=>{
    console.log("effect cleaning");
  }
},[])

// μ΄ννΈκ° λΆνμνκ² μ€νλλκ²μ νΌνκΈ°μν¨
const {isValid: emailIsValid} = emailState; // λ³μΉ­μ ν λΉνκ²μ΄μ§ κ°μ ν λΉνκ²μ΄ μλλ€.
const {isValid: passwordIsValid} = passwordState;


useEffect(()=>{
  const identifier= setTimeout(()=>{
    console.log("μ ν¨μ± κ²μ¬");
    setFormIsValid(
      passwordIsValid &&  emailIsValid
    );
  }, 500)
  return ()=>{
    console.log("clean up");
    clearTimeout(identifier);
  }
},[emailIsValid,passwordIsValid])


  const emailChangeHandler = (event) => {
   dispatchEmail({type: "USER_INPUT", val: event.target.value })
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: "USER_INPUT", val: event.target.value })
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: "INPUT_BLUR"}) ; // κΌ­ λλ²μ§Έ μΈμ κ°μ λ£μ΄μ€ νμλ μλ€.
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: "INPUT_BLUR"});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){
      authCtx.onLogin(emailState.value, passwordState.value);
    }else if(!emailIsValid){
      emailInputRef.current.focus();
      }else if(!passwordIsValid){
      passwordInputRef.current.focus();
    }
   
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input ref={emailInputRef} id="email" label="E-Mail" type="email" isValid={emailIsValid} value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler}/>
        <Input  ref={passwordInputRef} id="password" label="Password" type="password" isValid={passwordIsValid} value={passwordState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler}/>
  
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
