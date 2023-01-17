// -----------------------------------------------------------------------------------------
// 📌 강의내용중 중요부분 체크
// ⭐️ 집중하자 집중을
// -----------------------------------------------------------------------------------------
// -
import React from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
const Cart = (props) => {

    const cartItems=(<ul className={classes['cart-items']}>{
        [{id: 'c1', name: "Sushi", amount: 2, price: 12.99 }].map(item=>
            <li>{item.name}</li>)
        }
    </ul>);


    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>35.62</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}> Close</button>
                <button className={classes.button}> Open</button>
                
            </div>
        </Modal>
    );
};

export default Cart;