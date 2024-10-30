import { useContext } from "react";

import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import { currencyFormatter } from "../util/formatting";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import CartItem from "./CartItem";

export default function Cart() {
	const { items, addItem, removeItem } = useContext(CartContext);
	const userProgressContext = useContext(UserProgressContext);

	const cartTotal = items.reduce((totalPrice, item) => {
		return totalPrice + (item.quantity * item.price)
	},0);

	function handleCloseCart(){
		userProgressContext.hideCart();
	}

	function handleGoToCheckout(){
		userProgressContext.showCheckout();
	}



	return (
		<Modal 
			className="cart" 
			open={userProgressContext.progress === 'cart'} 
			onClose={userProgressContext.progress === 'cart' ? handleCloseCart : null}
		>
			<h2>Your cart</h2>
			<ul>
				{items.length === 0 ? <p>Your cart is empty</p> : (
					items.map(item => {
						return (
							<CartItem 
								key={item.id}
								name={item.name}
								quantity={item.quantity}
								price={item.price}
								onIncrease={() => addItem(item)}
								onDecrease={() => removeItem(item.id)}
							/>
						)
					})
				)}
			</ul>
			<p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
			<p className="modal-actions">
				<Button textOnly onClick={handleCloseCart}>Close</Button>
				{items.length > 0 && (
					<Button onClick={handleGoToCheckout}>Go to Checkout</Button>
				)}
				
			</p>
		</Modal>
	)
};
