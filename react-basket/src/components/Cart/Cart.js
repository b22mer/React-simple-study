// -----------------------------------------------------------------------------------------
// ๐ ๊ฐ์๋ด์ฉ์ค ์ค์๋ถ๋ถ ์ฒดํฌ
// โญ๏ธ ์ง์คํ์ ์ง์ค์
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
            //bind๋ฅผ ํตํด ์ถ๊ธฐ ๋๊ฑฐ๋ ์ญ์ ๋ ํญ๋ชฉ์ id๊ฐ remove๋ก ์ ๋ฌ์ด ๋๋ค.
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