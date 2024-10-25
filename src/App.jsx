import Header from './components/Header';
import Meals from './components/Meals';
import { useFetch } from './hook/useFetch';
import { fetchAvailableMeals } from './http';

	
function App() {
const {isFetching, fetchedData: loadedMeals} = useFetch(fetchAvailableMeals, []);
	
  return (
    <>
      <Header />
			<main>
				<Meals loadedMeals={loadedMeals} />
			</main>
    </>
  );
}

export default App;
