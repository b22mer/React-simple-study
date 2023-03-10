// -----------------------------------------------------------------------------------------
// ๐ ๊ฐ์๋ด์ฉ์ค ์ค์๋ถ๋ถ ์ฒดํฌ
// โญ๏ธ ์ง์คํ์ ์ง์ค์
// -----------------------------------------------------------------------------------------
// -Consumer๋ฅผ ์ฌ์ฉํ ์์์ง๋ง ๋ณดํต์ ํ์ ์ฌ์ฉํ๋ค.
// -์๋์ ๊ฐ์ด useContext๋ฅผ ์ฌ์ฉํ์ฌ ์งํ, ์ด๋ ๊ฒ์ด๋  ์ฌ์ฉํด๋ ๊ด์ฐฎ์ผ๋ ์ด๊ฒ ๋ ๋ณด๊ธฐ์ข๋ค.
// -Context๋ฅผ ์ธ๋๋ props๋ฅผ ์ธ๋๋ ๊ตฌ๋ถํ๋๊ฒ ์ข๋ค. ๋๋ถ๋ถ์ ๊ฒฝ์ฐ๋ ํ๋กญ์ ์ฌ์ฉํด ์ปดํฌ์ ๋ฐ์ดํฐ๋ฅผ ์ ๋ฌํ๋ค.
// -๋ง์ ์ปดํฌ๋ํธ๋ฅผ ํตํด ์ ๋ฌํ๊ณ  ํ๋๊ฒ์ด ์๋๊ฒฝ์ฐ๊ทธ๋ฆฌ๊ณ  ๋งค์ฐ ํน์ ์ ์ธ ์ผ์ ํ๋ ๊ทธ๋ฐ๊ฑธ ์ธ๋์ข๋ค.
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
