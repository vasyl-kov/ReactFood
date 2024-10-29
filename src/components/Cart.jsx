import { useContext } from "react";

import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import { currencyFormatter } from "../util/formatting";
import Modal from "./UI/Modal";
import Button from "./UI/Button";

export default function Cart() {
	const { items } = useContext(CartContext);
	const userProgressContext = useContext(UserProgressContext);

	const cartTotal = items.reduce((totalPrice, item) => {
		return totalPrice + (item.quantity * item.price)
	},0);

	function handleCloseCart(){
		userProgressContext.hideCart();
	}

	function handleCheckout(){
		userProgressContext.showCheckout();
	}



	return (
		<Modal className="cart" open={userProgressContext.progress === 'cart'}>
			<h2>Your cart</h2>
			<ul>
				{items.length === 0 ? <p>Your cart is empty</p> : (
					items.map(item => {
						return (
							<li key={item.id}>
								{item.name} - {item.quantity}
							</li>	
						)
					})
				)}
			</ul>
			<p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
			<p className="modal-actions">
				<Button textOnly onClick={handleCloseCart}>Close</Button>
				<Button onClick={handleCheckout}>Go to Checkout</Button>
			</p>
		</Modal>
	)
};
