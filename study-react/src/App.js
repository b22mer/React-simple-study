// -----------------------------------------------------------------------------------------
// 📌 강의내용중 중요부분 체크
// ⭐️ 집중하자 집중을
// -----------------------------------------------------------------------------------------
// - useEffect 함수는 모든 컴포넌트를 평가한 후에 실행이 된다는 점을 알아야한다.
// - 그리고 무조건 실행이 되는것이 아니라 의존성 배열이 변했을때 실행이 된다.
// - Data 가져오기는 side effect이다. UI와는 전혀 상관이 없다.
// - 아래와 같은 경우는 의존성이 없는경우였다. 가끔은 의존성이 필요하다.
// -----------------------------------------------------------------------------------------
// - ContextAPI 데이터를 컴포넌트를 통해 여러번 전달하게될때나, 의미없이 거쳐가는 데이터를 처리하기 위함
// - 이렇게 필요한 섹션을 감싸주는 것을 공급이라고 할수있고, 값에 접근 하는 리스닝은 두가지 방법이 존재한다.
//  함수를 이용할수있지만 보통은 컨텍스트 훅을 사용한다.
import React, { useContext} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {
  const ctx=useContext(AuthContext);
  
  return (
 <React.Fragment>
      <MainHeader  />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
  </React.Fragment>
  );
}

export default App;
