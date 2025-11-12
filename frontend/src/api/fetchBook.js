import { config } from '../config';


export async function fetchBook() {

    const option = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', 
            'X-Api-Key':config.API_KEY,
            'Authorization': config.JWT, 
        }
    }

    return await fetch(`${config.API_HOST}/api/books`, option)
        .then(response => response.json())
        .catch(error => {
            console.log('Error fetching and parsing data', error);
        })
}