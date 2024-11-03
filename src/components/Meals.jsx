import MealItem from "./MealItem";
import { useFetch } from '../hook/useFetch'
import { fetchAvailableMeals } from '../http';



export default function Meals() {

	const {isFetching, fetchedData, setFetchedData} = useFetch(fetchAvailableMeals, []);


	
	return (
		<ul id='meals'>
			{fetchedData.map((meal) => (
				<MealItem key={meal.id} meal={meal} />
			))}

		</ul>
	)
}