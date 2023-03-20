import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    
    const existingCartItem = state.items[existingCartItemIndex];
    let uptadeItems;


    if (existingCartItem) {
      const uptadeItem ={
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      };
     uptadeItems = [...state.items];
     uptadeItems[existingCartItemIndex] = uptadeItem;
    }else{
       uptadeItems = state.items.concat(action.item);
    }



    return {
      items: uptadeItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE"){
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingtItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingtItem.price;
    let updatedItems;
    if(existingtItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    }else {
      const uptadeItem = {...existingtItem, amount:existingtItem.amount - 1};
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = uptadeItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }

  if(action === 'CLEAR'){
    return defaultCartState
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = ()=> {
    dispatchCartAction({type:'CLEAR'});
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemCartHandler,
    removeItem: removeItemCartHandler,
    clearCart: clearCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
