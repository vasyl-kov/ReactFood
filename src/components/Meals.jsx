import MealItem from "./MealItem";
import { useFetch } from '../hook/useFetch'
import { fetchAvailableMeals, updateUserOrders } from '../http';



export default function Meals() {

	const {isFetching, fetchedData, setFetchedData} = useFetch(fetchAvailableMeals, []);

	async function handleSelectMeal(selectedMeal) {
		try {
			await updateUserOrders([selectedMeal]);
		} catch(error) {
			setFetchedData(fetchedData)
		}
	}
	
	return (
		<ul id='meals'>
			{fetchedData.map((meal) => (
				<MealItem key={meal.id} meal={meal} />
			))}

		</ul>
	)
}