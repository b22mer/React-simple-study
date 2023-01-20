// -----------------------------------------------------------------------------------------
// 📌 강의내용중 중요부분 체크
// ⭐️ 집중하자 집중을
// -----------------------------------------------------------------------------------------
// 음식 리스트중 하나의 아이템을 나타내는 컴포넌트이다.


import React, { useContext } from 'react';
import CartContext from '../../../store/cart-context';
import classes from "./MealItem.module.css"
import MealItemForm from './MealItemForm';
const MealItem = (props) => {

    const cartCtx=useContext(CartContext);
    const price= `$${props.price.toFixed(2)}`;
    const addToCartHandler =amount =>{
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        })

    }
    return ( 
        <li className={classes.meal}> 
            <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{price}</div>
            </div>
            <div>
            <MealItemForm onAddToCart={addToCartHandler}/>
            </div>
        </li>
    );
};

export default MealItem;