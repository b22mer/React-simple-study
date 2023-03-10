// -----------------------------------------------------------------------------------------
// π κ°μλ΄μ©μ€ μ€μλΆλΆ μ²΄ν¬
// β­οΈ μ§μ€νμ μ§μ€μ
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
      {/* 1. μ₯λ°κ΅¬λ νμμ ν€κ±°λ λ«μ λ */}
      {cartIsShown && <Cart onClose={hideCartHandler}/>} 
       {/* 2. μ₯λ°κ΅¬λ νμμ ν¬λ */}
      <Header onShowCart={showCartHandler}/>
      <main>

      {/* 3. μμ λ©λ΄ λμ΄ */}
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
