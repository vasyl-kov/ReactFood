import { BASE_URL } from "../http";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";

export default function MealItem({meal}) {

	// const formattingPrice = new Intl.NumberFormat('ua-UA', {style : 'currency', currency: 'UAH'}).format(meal.price)
	return (
		<li className="meal-item">
			<article>
				<img src={`${BASE_URL}${meal.image}`} alt="" />
				<div>
					<h3>{meal.name}</h3>
					<p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
					<p className="meal-item-description">{meal.description}</p>
				</div>
				<p className="meal-item-actions">
					<Button>Add to cart</Button>
					{/* <button></button> */}
				</p>
			</article>
		</li>	
	)
};
