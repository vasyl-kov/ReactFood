import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hook/useHttp";
import Error from './Error';

// create config object outside of the Component for avoid infinity loop 
const requestConfig = {
	method: 'POST', 
	headers: {
		'Content-Type' : 'application/json'
	}
}

export default function Checkout() {
	const { items, clearCart } = useContext(CartContext);
	const { progress, hideCheckout } = useContext(UserProgressContext);

		const {data, isLoading: isSending, error, sendRequest, clearData} = useHttp('http://localhost:3000/orders', requestConfig);

	function handleSubmit(e) {
		e.preventDefault();

		const fd = new FormData(e.target);
		const customerData = Object.fromEntries(fd.entries());

		const orderData = {
			order: {
				items,
				customer: customerData
			}
		}
		sendRequest(JSON.stringify(orderData))
	}


	function handleCloseCheckout() {
		hideCheckout();
	}

	function handleFinish() {
		hideCheckout(); // from UserProgressContext
		clearCart(); // from CartContext
		clearData(); //from custom Hook
	}

	const cartTotal = items.reduce((totalPrice, item) => {
		return totalPrice + (item.quantity * item.price)
	},0);

	let actions = (
		<>
			<Button type='button' textOnly onClick={handleCloseCheckout}>Close</Button>
			<Button>Submit Order</Button>
		</>
	)
	if(isSending) {
		actions = <span>Sending order data...</span>
	}

	if(data && !error) {
		return (
		<Modal open={progress === 'checkout'} onClose={handleFinish}>
			<h2>Success!</h2>
			<p>Your order was submitted successfully.</p>
			<p>We will get back to you with more details via email within the next few minutes.</p>
			<p className="modal-actions">
				<Button onClick={handleFinish}>OK</Button>
			</p>
		</Modal>
		)
	}
	
	return (
		<Modal 
			open={progress === 'checkout'} 
			onClose={handleCloseCheckout}
		>
			<form onSubmit={handleSubmit}>
				<h2>Checkout</h2>
				<p>Total amount: <b>{currencyFormatter.format(cartTotal)}</b></p>

				<Input 
					label='Full Name'
					type='text'
					id='name'
				/>
				<Input 
					label='Email address'
					type='email'
					id='email'
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
				{error && <Error  title='Failed to submit offer' message={error} />}
				<p className="modal-actions">
					{actions}
				</p>
			</form>
		</Modal>
	)
};
