// -----------------------------------------------------------------------------------------
// 📌 강의내용중 중요부분 체크
// ⭐️ 집중하자 집중을
// -----------------------------------------------------------------------------------------
// -Consumer를 사용할수있지만 보통은 훅을 사용한다.
// -아래와 같이 useContext를 사용하여 진행, 어느 것이든 사용해도 괜찮으나 이게 더 보기좋다.
// -Context를 쓸때랑 props를 쓸때랑 구분하는게 좋다. 대부분의 경우는 프롭을 사용해 컴포에 데이터를 전달한다.
// -많은 컴포넌트를 통해 전달하고 하는것이 있는경우그리고 매우 특정적인 일을 하는 그런걸 쓸때좋다.
import React, {useContext} from 'react';
import AuthContext from '../../store/auth-context';

import classes from './Navigation.module.css';

const Navigation = () => {
  const ctx=useContext(AuthContext);
  return (
          <nav className={classes.nav}>
          <ul>
            {ctx.isLoggedIn && (
              <li>
                <a href="/">Users</a>
              </li>
            )}
            {ctx.isLoggedIn && (
              <li>
                <a href="/">Admin</a>
              </li>
            )}
            {ctx.isLoggedIn && (
              <li>
                <button onClick={ctx.onLogout}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
     
   
   
   
  );
};

export default Navigation;
