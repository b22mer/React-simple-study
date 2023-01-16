// -----------------------------------------------------------------------------------------
// 📌 강의내용중 중요부분 체크
// ⭐️ 집중하자 집중을
// -----------------------------------------------------------------------------------------
// -함수를 보낼땐 더미 함수를 보내는것이 좋다. 그럼 자동완성이 된다.
// -아래와 같이도 나타낼수있는데 방법은 선택이다. 
// -컨텍스트의 제한을 알아보자.
// 변경이 잦은 경우에는 컨텍스는 적합하지 않다. 예를 들어 1초에 몇초에 한번씩 바뀌는 거라면 말이다.
// state가 자주 변하는경우에는 어떡할까? 그런 경우에도 컨텍스트를 쓰고싶을때, 또 프롭은 적합하지 않을때 말이다.
// 그 이름이 바로 리덕스다. 


import React, {useState, useEffect}from 'react';

const AuthContext=React.createContext({
    isLoggedIn: false,
    onLogout: (email, password)=> {}
});

export const AuthContextProvider = (props)=>{
const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    const storeLocalStorageInfo=localStorage.getItem("isLoggedIn");
    if(storeLocalStorageInfo=='1'){
      setIsLoggedIn(true);
    }
  },[])
 

  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return(
    <AuthContext.Provider
    value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
    }}>
        {props.children}

    </AuthContext.Provider>
  )
}

export default AuthContext;