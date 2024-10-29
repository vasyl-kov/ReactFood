import { useState, useContext } from 'react';
import  CartContext  from '../store/CartContext';
import logo from '../assets/logo.jpg';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext';

export default function Header() {
	const cartCtx = useContext(CartContext);
	const userProgressCtx = useContext(UserProgressContext);

	const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
		return totalNumberOfItems + item.quantity
	}, 0);

	function handleShowCart(){
		userProgressCtx.showCart();
	}


	return (
		<header id="main-header">
			<div id='title'>
				<img src={logo} alt="logo" />
				<h1>
					reactfood
				</h1>
			</div>
			<nav>
				<Button type="button" textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
			</nav>
		</header>
	)
}