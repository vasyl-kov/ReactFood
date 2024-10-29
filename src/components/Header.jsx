import { useState, useContext } from 'react';
import  CartContext  from '../store/CartContext';
import logo from '../assets/logo.jpg';
import Button from './UI/Button';

export default function Header() {
	const cartCtx = useContext(CartContext);

	const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
		return totalNumberOfItems + item.quantity
	}, 0);


	return (
		<header id="main-header">
			<div id='title'>
				<img src={logo} alt="logo" />
				<h1>
					reactfood
				</h1>
			</div>
			<nav>
				<Button type="button" textOnly >Cart ({totalCartItems})</Button>
			</nav>
		</header>
	)
}