import MealItem from "./MealItem";



export default function Meals({ loadedMeals }) {

	// console.log(meals);
	return (
		<ul id='meals'>
			{loadedMeals.map((meal) => (
				<MealItem key={meal.id} meal={meal}/>
			))}

		</ul>
	)
}