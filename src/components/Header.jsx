import logo from '../assets/logo.jpg';
import Button from './UI/Button';

export default function Header() {
	return (
		<header id="main-header">
			<div id='title'>
				<img src={logo} alt="logo" />
				<h1>
					reactfood
				</h1>
			</div>
			<nav>
				<Button type="button" textOnly>Cart (0)</Button>
			</nav>
		</header>
	)
}