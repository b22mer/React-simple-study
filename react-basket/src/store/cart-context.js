// 일반적인 컨텍스트 생성
import React from "react"

const CartContext= React.createContext({
    items:[],
    totaAmount: 0,
    addItem: (item)=>{},
    removeItem: (id)=>{},
})

export default CartContext;