// -----------------------------------------------------------------------------------------
// 📌 강의내용중 중요부분 체크
// ⭐️ 집중하자 집중을
// -----------------------------------------------------------------------------------------
// -
import React from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import { useContext } from 'react';
import CartContext from './../../store/cart-context';
import CartItem from './CartItem';
const Cart = (props) => {

    const cartCtx=useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems=cartCtx.items.length>0;

    const cartItemRemoveHandler = id =>{
        cartCtx.removeItem(id);
    }

    const cartItemAddHandler = item =>{
        cartCtx.addItem({...item, amount:1})
    }
    const cartItems=(<ul className={classes['cart-items']}>{
        cartCtx.items.map(item=>
            //bind를 통해 추기 되거나 삭제된 항목의 id가 remove로 전달이 된다.
           <CartItem 
           key={item.id} 
           name={item.name} 
           price={item.price}
           amount={item.amount}
           onRemove={cartItemRemoveHandler.bind(null,item.id)} 
           onAdd={cartItemAddHandler.bind(null,item)}/>
            )}
    </ul>);


    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}> Close</button>
              {hasItems && <button className={classes.button}> Order</button>}  
                
            </div>
        </Modal>
    );
};

export default Cart;