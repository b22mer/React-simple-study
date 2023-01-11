// -----------------------------------------------------------------------------------------
// 📌 강의내용중 중요부분 체크
// ⭐️ 집중하자 집중을
// -----------------------------------------------------------------------------------------
// - useEffect 함수는 모든 컴포넌트를 평가한 후에 실행이 된다는 점을 알아야한다.
// - 그리고 무조건 실행이 되는것이 아니라 의존성 배열이 변했을때 실행이 된다.
// - Data 가져오기는 side effect이다. UI와는 전혀 상관이 없다.
// - 아래와 같은 경우는 의존성이 없는경우였다. 가끔은 의존성이 필요하다.
// -----------------------------------------------------------------------------------------
import React, { useEffect, useState } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
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

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
