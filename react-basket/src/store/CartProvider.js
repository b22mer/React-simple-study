// -----------------------------------------------------------------------------------------
// 📌 강의내용중 중요부분 체크
// ⭐️ 집중하자 집중을
// -----------------------------------------------------------------------------------------
// Context Provider
// 데이터를 뿌려주기 위함


import React, {useReducer}from 'react';
import CartContext from './cart-context';


//1. 기본으로 설정되어있는 state
const defaultCartState ={
    items:[],
    totalAmount:0
}


//2. Reducer 함수 => 컴포넌트 외부에 존재 (영향을 받을것이 없기에)
const cartReducer=(state, action)=>{
    
    // (*)더하는 명령이 온 경우
    if(action.type==="ADD"){    
        const updatedTotalAmount =state.totalAmount+ action.item.price * action.item.amount; // [최신의 값] + [들어온 아이템의 가격 * 수량]
        const existingCartItemIndex =state.items.findIndex( // 최신의 아이템 목록에서 [들어온] 아이탬 목록과 일치한 아이디가 존재하면 해당 인덱스를 저장
            item => item.id === action.item.id
        )
        const existingCartItem = state.items[existingCartItemIndex]; // 해당 존재하는 아이템에 접근
       
        let updatedItems;     // 업데이트 될 아이템 목록을 받아줄 변수
        if(existingCartItem){ // 아이템이 이미 존재한다면
            const updatedItem ={
                ...existingCartItem, // 아이템 목록을 받고
                amount: existingCartItem.amount + action.item.amount // 총량을 더해준다
            };

            updatedItems=[...state.items]; // 기존 목록들을 넣어주고
            updatedItems[existingCartItemIndex]=updatedItem; // 추가된 값을 설정해준다.
        }else { // 비어있던 경우
            updatedItems= state.items.concat(action.item); // 바로 기존 목록에 추가를 해준다.
        }
    
        
        return {
            items:updatedItems,
            totalAmount: updatedTotalAmount,
        }
    }

    // (*)빼는 명령이 온 경우
    if(action.type==="REMOVE"){
        
        // 삭제하는 해당 아이템이 존재하는지 확인
        const existingCartItemIndex= state.items.findIndex(
            (item) => item.id === action.id
        )

        // 해당 아이템을 가져옴
        const existingItem = state.items[existingCartItemIndex];

        // 해당 아이템의 amount(총가격) 값에서 해당 가격 만큼을 빼준다.
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        
        let updatedItems;
        // 삭제하려 하는데 총량이 1개라면
        if(existingItem.amount === 1){
        // filter를 통해서 해당 아이템을 제외한 모든 값을 업데이트 목록에 넣어준다 => 이는 삭제를 해주는것과 같은 효과
            updatedItems=state.items.filter((item)=> item.id !== action.id)
        }else{
        // 만약 한개 이상의 수가 존재했을경우

        // 해당 아이템 내역에서 총량을 하나 감소 시켜준다
            const updatedItem = {...existingItem, amount: existingItem.amount-1};
        // 아이템 목록에 최신 아이템 목록을 넣어주고
            updatedItems = [...state.items];
        // 수량을 하나 제거했던 아이템을 다시 제자리에 위치 시켜준다. => 하나를 제거 해준 효과
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