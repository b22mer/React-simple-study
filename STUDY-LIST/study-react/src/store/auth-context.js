// -----------------------------------------------------------------------------------------
// 📌 강의내용중 중요부분 체크
// ⭐️ 집중하자 집중을
// -----------------------------------------------------------------------------------------
// -함수를 보낼땐 더미 함수를 보내는것이 좋다. 그럼 자동완성이 된다.
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