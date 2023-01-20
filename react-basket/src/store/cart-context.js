// -----------------------------------------------------------------------------------------
// 📌 강의내용중 중요부분 체크
// ⭐️ 집중하자 집중을
// -----------------------------------------------------------------------------------------
// CartContext 생성
// 기본적인 context의 구조를 만들어준다. 함수같은 경우에는 아래와 같이 빈함수를 형식에 맞춰 
// 적어줘야지 끌어쓸때 자동완성을 쓸수있다.
import React from "react"

const CartContext= React.createContext({
    items:[],
    totalAmount: 0,
    addItem: (item)=>{},
    removeItem: (id)=>{},
})

export default CartContext;