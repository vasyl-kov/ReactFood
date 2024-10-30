import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";

export default function Checkout() {
	const { items } = useContext(CartContext);
	const { progress, hideCheckout } = useContext(UserProgressContext);

	function handleCloseCheckout() {
		hideCheckout();
	}

	const cartTotal = items.reduce((totalPrice, item) => {
		return totalPrice + (item.quantity * item.price)
	},0);
	return (
		<Modal 
			open={progress === 'checkout'} 
			onClose={handleCloseCheckout}
		>
			<form>
				<h2>Checkout</h2>
				<p>Total amount: <b>{currencyFormatter.format(cartTotal)}</b></p>

				<Input 
					label='Full Name'
					type='text'
					id='full-name'
				/>
				<Input 
					label='Email address'
					type='email'
					id='email-address'
				/>
				<Input 
					label='Street'
					type='text'
					id='street'
				/>
				<div className="control-row">
					<Input 
						label='Postal Code'
						type='text'
						id='postal-code'
					/>
					<Input 
						label='City'
						type='text'
						id='city'
					/>

				</div>
				<p className="modal-actions">
					<Button type='button' textOnly onClick={handleCloseCheckout}>Close</Button>
					<Button>Submit Order</Button>

				</p>
			</form>
		</Modal>
	)
};
