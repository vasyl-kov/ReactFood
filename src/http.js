export const BASE_URL = 'http://localhost:3000/';

export async function fetchAvailableMeals() {
    const response = await fetch(`${BASE_URL}meals`);
    const resData = await response.json();

    if (!response.ok) {
        throw new Error('Failed ti fetching of data.');
    }

    return resData;
}

export async function fetchUserOrders(orders) {
    try {
        const response = await fetch(`${BASE_URL}orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orders),
        })

        if (!response.ok) {
            throw new Error('Failed to update user orders')
        }

        return await response.json();
    } catch (error) {
        console.error('Fetch user orders failed:', error);
        throw error;
    }

}