import { useContext,useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from './HeaderCartButton.module.css'


const HeaderCartButton = props => {
    const [btnChange,setBtnChange] = useState(false);
    const cartCtx = useContext(CartContext);
    
    const {items} = cartCtx;

    const numberOfCartItem = items.reduce((curNumber,item)=>{
        return curNumber + item.amount
    },0);


    const btnClasses = `${classes.button} ${btnChange ? classes.bump : ''}`;

    useEffect(()=>{
        if(items.length === 0) {
            return;
        }
        setBtnChange(true);

        const timer = setTimeout(()=>{
            setBtnChange(false);
        },300);

        return ()=> {
            clearTimeout(timer);
        }
    },[items]);


    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItem}</span>
    </button>
};



export default HeaderCartButton;