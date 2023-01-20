// -----------------------------------------------------------------------------------------
// 📌 강의내용중 중요부분 체크
// ⭐️ 집중하자 집중을
// -----------------------------------------------------------------------------------------


import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown]= useState(false);
  const showCartHandler = ()=>{
    setCartIsShown(true);
  }

  const hideCartHandler = ()=>{
    setCartIsShown(false);
  }
    return (
    <CartProvider>
      {/* 1. 장바구니 팝업을 키거나 닫을 때 */}
      {cartIsShown && <Cart onClose={hideCartHandler}/>} 
       {/* 2. 장바구니 팝업을 킬때 */}
      <Header onShowCart={showCartHandler}/>
      <main>

      {/* 3. 음식 메뉴 나열 */}
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
