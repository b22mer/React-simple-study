// -----------------------------------------------------------------------------------------
// π κ°μλ΄μ©μ€ μ€μλΆλΆ μ²΄ν¬
// β­οΈ μ§μ€νμ μ§μ€μ
// -----------------------------------------------------------------------------------------
// -ν¨μλ₯Ό λ³΄λΌλ λλ―Έ ν¨μλ₯Ό λ³΄λ΄λκ²μ΄ μ’λ€. κ·ΈλΌ μλμμ±μ΄ λλ€.
// -μλμ κ°μ΄λ λνλΌμμλλ° λ°©λ²μ μ νμ΄λ€. 
// -μ»¨νμ€νΈμ μ νμ μμλ³΄μ.
// λ³κ²½μ΄ μ¦μ κ²½μ°μλ μ»¨νμ€λ μ ν©νμ§ μλ€. μλ₯Ό λ€μ΄ 1μ΄μ λͺμ΄μ νλ²μ© λ°λλ κ±°λΌλ©΄ λ§μ΄λ€.
// stateκ° μμ£Ό λ³νλκ²½μ°μλ μ΄λ‘ν κΉ? κ·Έλ° κ²½μ°μλ μ»¨νμ€νΈλ₯Ό μ°κ³ μΆμλ, λ νλ‘­μ μ ν©νμ§ μμλ λ§μ΄λ€.
// κ·Έ μ΄λ¦μ΄ λ°λ‘ λ¦¬λμ€λ€. 


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