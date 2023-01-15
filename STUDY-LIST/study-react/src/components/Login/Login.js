// -----------------------------------------------------------------------------------------
// 📌 강의내용중 중요부분 체크
// ⭐️ 집중하자 집중을
// -----------------------------------------------------------------------------------------
// -사이드 이펙트는 보통http 리퀘스트가 있다.
// -사이트 이펙트의 예시로는 듣고입력된 데이터를 저장하는것도 포한된다.
// -응답에 대한 다른 액션일때도 포함, 즉 이메일 비밀번호 필드의 키입력에 대한 응답으로 해당 폼의 유
//  효성을 확인하고 업데이트하는것을 사이드 이펙트라 할수있겠다. 무언가에 대한 응답.
// -cleanup 함수? : state 함수가 실행되기 전에 실행이 된다. 근데 처음 실행되기 전에는 실행되지 않는다.
// -로그인후 컴포넌트가 사라지면 실행이된다.
// -하나의 state를 기반흥로 하는 state로 업데이트하는경우에는 병합하는게 좋을수있다.
// -Reducer 함수는 컴포넌트 안에 안만들어도된다. 그 이유는 컴포넌트 내부에서 정의된 그어떤것과도 연관 x
// -useEffect()에 객체 속성을 종속성으로 추가하기 위해 dstructuring을 사용, 매우 일반적인 패턴 및 접근 방식
// -핵심은 우리가 destructuring을 사용한다는 것이 아니라, 전체 개체 대신 특정 속성을 종속성으로 전달한다는 것
// -----------------------------------------------------------------------------------------
// useState vs useReducer

import React, { useEffect, useState, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

const emailReducer = (state, action)=>{
  if(action.type === "USER_INPUT"){
    return {value: action.val, isValid: action.val.includes('@') };
  }else if(action.type==='INPUT_BLUR'){
    return {value: state.value, isValid: state.value.includes('@')}; // 여기서 state는 최신 state
  }
  return {value: '', isValid: false};
}

const passwordReducer= (state, action)=>{
  if(action.type==="USER_INPUT"){
    return {value: action.val, isValid: action.val.trim().length >6 }; // trim은 좌우간 공백제거
  }

  if(action.type==="INPUT_BLUR"){
    return {value: state.value, isValid: state.value.trim().length >6 };
  }

  return {value: '', isValid: false};

}
const Login = (props) => {

  const authCtx=useContext(AuthContext);

  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();\

 const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
  value: '', isValid: undefined,
 })
 const [emailState, dispatchEmail] = useReducer(emailReducer, {
  value: '', isValid: undefined, // 초기에 이렇게 두면 처음부터 블러 처리되는것을 막는다.
});

const [formIsValid, setFormIsValid] = useState(false);


useEffect(()=>{
  console.log("effect running");
  
  return ()=>{
    console.log("effect cleaning");
  }
},[])

// 이펙트가 불필요하게 실행되는것을 피하기위함
const {isValid: emailIsValid} = emailState; // 별칭을 할당한것이지 값을 할당한것이 아니다.
const {isValid: passwordIsValid} = passwordState;


useEffect(()=>{
  const identifier= setTimeout(()=>{
    console.log("유효성 검사");
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

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // );
  };




  const passwordChangeHandler = (event) => {
    dispatchPassword({type: "USER_INPUT", val: event.target.value })

    // setFormIsValid(
    //   event.target.value.trim().length > 6 && emailState.isValid
    // );
  };





  const validateEmailHandler = () => {
    dispatchEmail({type: "INPUT_BLUR"}) ; // 꼭 두번째 인자 값을 넣어줄 필요는 없다.
    //setEmailIsValid(emailState.isValid);
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: "INPUT_BLUR"});
    //setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
