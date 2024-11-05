import { useContext, useState, useEffect } from "react";
import { BASE_URL } from "../http";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";

export default function MealItem({meal}) {
	const cartCtx = useContext(CartContext);
	const [quantity, setQuantity] = useState(0);

	useEffect(() => {
    const cartItem = cartCtx.items.find((item) => item.id === meal.id);
    setQuantity(cartItem ? cartItem.quantity : 0);
  }, [cartCtx.items, meal.id]);


	function handleAddMealToCart() {
		cartCtx.addItem(meal);
	}


  function increaseHandler() {
    cartCtx.addItem({ ...meal, quantity: 1 });
  }

  function decreaseHandler() {
    if (quantity > 1) {
      cartCtx.removeItem(meal.id);
    } else {
      cartCtx.removeItem(meal.id);
      setQuantity(0);
    }
  }
	

	return (
		<li className="meal-item">
			<article>
				<img src={`${BASE_URL}${meal.image}`} alt="" />
				<div>
					<h3>{meal.name}</h3>
					<p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
					<p className="meal-item-description">{meal.description}</p>
				</div>

				{quantity === 0 ? (
						<p className="meal-item-actions">
								<Button onClick={handleAddMealToCart}>Add to cart</Button>
						</p>
				) : (
						<p className="cart-item-actions">
							<button onClick={decreaseHandler}>-</button>
							<span>{quantity}</span>
							<button onClick={increaseHandler}>+</button>
						</p>
				)}
			</article>
		</li>	
	)
};
