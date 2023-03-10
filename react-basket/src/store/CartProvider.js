// -----------------------------------------------------------------------------------------
// ๐ ๊ฐ์๋ด์ฉ์ค ์ค์๋ถ๋ถ ์ฒดํฌ
// โญ๏ธ ์ง์คํ์ ์ง์ค์
// -----------------------------------------------------------------------------------------
// Context Provider
// ๋ฐ์ดํฐ๋ฅผ ๋ฟ๋ ค์ฃผ๊ธฐ ์ํจ


import React, {useReducer}from 'react';
import CartContext from './cart-context';


//1. ๊ธฐ๋ณธ์ผ๋ก ์ค์ ๋์ด์๋ state
const defaultCartState ={
    items:[],
    totalAmount:0
}


//2. Reducer ํจ์ => ์ปดํฌ๋ํธ ์ธ๋ถ์ ์กด์ฌ (์ํฅ์ ๋ฐ์๊ฒ์ด ์๊ธฐ์)
const cartReducer=(state, action)=>{
    
    // (*)๋ํ๋ ๋ช๋ น์ด ์จ ๊ฒฝ์ฐ
    if(action.type==="ADD"){    
        const updatedTotalAmount =state.totalAmount+ action.item.price * action.item.amount; // [์ต์ ์ ๊ฐ] + [๋ค์ด์จ ์์ดํ์ ๊ฐ๊ฒฉ * ์๋]
        const existingCartItemIndex =state.items.findIndex( // ์ต์ ์ ์์ดํ ๋ชฉ๋ก์์ [๋ค์ด์จ] ์์ดํฌ ๋ชฉ๋ก๊ณผ ์ผ์นํ ์์ด๋๊ฐ ์กด์ฌํ๋ฉด ํด๋น ์ธ๋ฑ์ค๋ฅผ ์ ์ฅ
            item => item.id === action.item.id
        )
        const existingCartItem = state.items[existingCartItemIndex]; // ํด๋น ์กด์ฌํ๋ ์์ดํ์ ์ ๊ทผ
       
        let updatedItems;     // ์๋ฐ์ดํธ ๋  ์์ดํ ๋ชฉ๋ก์ ๋ฐ์์ค ๋ณ์
        if(existingCartItem){ // ์์ดํ์ด ์ด๋ฏธ ์กด์ฌํ๋ค๋ฉด
            const updatedItem ={
                ...existingCartItem, // ์์ดํ ๋ชฉ๋ก์ ๋ฐ๊ณ 
                amount: existingCartItem.amount + action.item.amount // ์ด๋์ ๋ํด์ค๋ค
            };

            updatedItems=[...state.items]; // ๊ธฐ์กด ๋ชฉ๋ก๋ค์ ๋ฃ์ด์ฃผ๊ณ 
            updatedItems[existingCartItemIndex]=updatedItem; // ์ถ๊ฐ๋ ๊ฐ์ ์ค์ ํด์ค๋ค.
        }else { // ๋น์ด์๋ ๊ฒฝ์ฐ
            updatedItems= state.items.concat(action.item); // ๋ฐ๋ก ๊ธฐ์กด ๋ชฉ๋ก์ ์ถ๊ฐ๋ฅผ ํด์ค๋ค.
        }
    
        
        return {
            items:updatedItems,
            totalAmount: updatedTotalAmount,
        }
    }

    // (*)๋นผ๋ ๋ช๋ น์ด ์จ ๊ฒฝ์ฐ
    if(action.type==="REMOVE"){
        
        // ์ญ์ ํ๋ ํด๋น ์์ดํ์ด ์กด์ฌํ๋์ง ํ์ธ
        const existingCartItemIndex= state.items.findIndex(
            (item) => item.id === action.id
        )

        // ํด๋น ์์ดํ์ ๊ฐ์ ธ์ด
        const existingItem = state.items[existingCartItemIndex];

        // ํด๋น ์์ดํ์ amount(์ด๊ฐ๊ฒฉ) ๊ฐ์์ ํด๋น ๊ฐ๊ฒฉ ๋งํผ์ ๋นผ์ค๋ค.
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        
        let updatedItems;
        // ์ญ์ ํ๋ ค ํ๋๋ฐ ์ด๋์ด 1๊ฐ๋ผ๋ฉด
        if(existingItem.amount === 1){
        // filter๋ฅผ ํตํด์ ํด๋น ์์ดํ์ ์ ์ธํ ๋ชจ๋  ๊ฐ์ ์๋ฐ์ดํธ ๋ชฉ๋ก์ ๋ฃ์ด์ค๋ค => ์ด๋ ์ญ์ ๋ฅผ ํด์ฃผ๋๊ฒ๊ณผ ๊ฐ์ ํจ๊ณผ
            updatedItems=state.items.filter((item)=> item.id !== action.id)
        }else{
        // ๋ง์ฝ ํ๊ฐ ์ด์์ ์๊ฐ ์กด์ฌํ์๊ฒฝ์ฐ

        // ํด๋น ์์ดํ ๋ด์ญ์์ ์ด๋์ ํ๋ ๊ฐ์ ์์ผ์ค๋ค
            const updatedItem = {...existingItem, amount: existingItem.amount-1};
        // ์์ดํ ๋ชฉ๋ก์ ์ต์  ์์ดํ ๋ชฉ๋ก์ ๋ฃ์ด์ฃผ๊ณ 
            updatedItems = [...state.items];
        // ์๋์ ํ๋ ์ ๊ฑฐํ๋ ์์ดํ์ ๋ค์ ์ ์๋ฆฌ์ ์์น ์์ผ์ค๋ค. => ํ๋๋ฅผ ์ ๊ฑฐ ํด์ค ํจ๊ณผ
            updatedItems[existingCartItemIndex]=updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    return defaultCartState

}

const CartProvider = (props) => {
    const [cartState, dispatchCartAction]=useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler= item =>{
        dispatchCartAction({type:"ADD", item: item});
    }
    const removeItemToCartHandler= id =>{
        dispatchCartAction({type:"REMOVE", id: id});
    }
    
    const cartContext ={
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemToCartHandler,
    }
    return (
        <div>
            <CartContext.Provider value={cartContext}>
                {props.children}
            </CartContext.Provider>
        </div>
    );
};

export default CartProvider;

//cart context ๋ฐ์ดํฐ๋ฅผ ๊ด๋ฆฌํ๊ณ  ์ ๊ทผํ๋ ค๋ ๋ชจ๋  ์ปดํฌ๋ํธ์๊ฒ ์ ๊ณต
//์ปจํ์คํธ์ ์ํฅ์ ๋ฐ๋ ๋ชจ๋  ์ปดํฌ๋ํธ๋ ์ฅ๋ฐ๊ตฌ๋ ๋ฐ์ดํฐ๊ฐ ๋ณ๊ฒฝ๋ ๋๋ง๋ค ์ฌํ๊ฐ๊ฐ ๋๋ค.