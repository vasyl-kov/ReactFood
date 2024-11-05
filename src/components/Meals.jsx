import MealItem from "./MealItem";
import Error from "./Error";
import useHttp from "../hook/useHttp";
import { useContext } from "react";
import CartContext from "../store/CartContext";



export default function Meals() {

const { data : fetchedMeals, isLoading, error } = useHttp('http://localhost:3000/meals', null, []);



if(isLoading) {
	return <p className="center">Fetching meals menu...</p>
}

if(error) {
	return <Error title='Failed	to fetch meals...' message={error} />
}	
	return (
		<ul id='meals'>
			{fetchedMeals.map((meal) => (
				<MealItem key={meal.id} meal={meal} />
			))}

		</ul>
	)
}