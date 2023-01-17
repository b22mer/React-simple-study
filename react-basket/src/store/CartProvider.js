import React, {useReducer}from 'react';
import CartContext from './cart-context';

const defaultCartState ={
    items:[],
    totalAmount:0
}
const cartReducer=(state, action)=>{
    if(action.type==="ADD"){
        // concat은 완전 새로운 배열을 준다.
        const updatedItems =state.items.concat(action.item);
        const updatedTotalAmount =state.totalAmount+ action.item.price* action.item.amount;
        return {
            items:updatedItems,
            totalAmount: updatedTotalAmount,
        }
    }else if(action.type==="REMOVE"){

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