import React, {useReducer}from 'react';
import CartContext from './cart-context';

const defaultCartState ={
    items:[],
    totalAmount:0
}
const cartReducer=(state, action)=>{
    if(action.type==="ADD"){
        // concat은 완전 새로운 배열을 준다.
        
        const updatedTotalAmount =state.totalAmount+ action.item.price * action.item.amount;
        const existingCartItemIndex =state.items.findIndex(
            item => item.id === action.item.id
        )
        const existingCartItem = state.items[existingCartItemIndex];
       
        let updatedItems;
        if(existingCartItem){ // 있던 경우
            const updatedItem ={
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems=[...state.items];
            updatedItems[existingCartItemIndex]=updatedItem;
        }else { // 비어있던 경우
            updatedItems= state.items.concat(action.item);
        }
    
        
        return {
            items:updatedItems,
            totalAmount: updatedTotalAmount,
        }
    }
    
    if(action.type==="REMOVE"){
        const existingCartItemIndex= state.items.findIndex(
            (item) => item.id === action.id
        )

        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if(existingItem.amount === 1){
            updatedItems=state.items.filter((item)=> item.id !== action.id)
        }else{
            const updatedItem = {...existingItem, amount: existingItem.amount-1};
            updatedItems = [...state.items];
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

//cart context 데이터를 관리하고 접근하려는 모든 컴포넌트에게 제공
//컨텍스트의 영향을 받는 모든 컴포넌트는 장바구니 데이터가 변경될때마다 재평가가 된다.