import { useContext, useState } from "react";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import classes from "./cart.module.css";
import CartContext from "../../Store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => cartCtx.removeItem(id);
  const cartItemAddHandler = (item) => cartCtx.addItem(item);
  const orderHandler = () => setIsCheckout(true);
  const submitHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-http-bb10c-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cardModalContent = (
    <>
      <ul className={classes["cart-items"]}>
        {cartCtx.items.map((e) => (
          <CartItem
            key={e.id}
            name={e.name}
            amount={e.amount}
            price={e.price}
            onRemove={cartItemRemoveHandler.bind(null, e.id)}
            onAdd={cartItemAddHandler.bind(null, e)}
          />
        ))}
      </ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout ? (
        <Checkout onCancel={props.onClose} onConfirm={submitHandler} />
      ) : (
        <div className={classes.actions}>
          <button className={classes["button-alt"]} onClick={props.onClose}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = (
    <>
      <p>Successfully sent the order!</p>{" "}
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );
  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cardModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
