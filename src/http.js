export const BASE_URL = 'http://localhost:3000/';

export async function fetchAvailableMeals() {
    const response = await fetch(`${BASE_URL}meals`);
    const resData = await response.json();

    if (!response.ok) {
        throw new Error('Failed ti fetching of data.');
    }

    return resData;
}