import { config } from '../config';


export async function register(data) {

    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'X-Api-Key':config.API_KEY,
        },
        body:JSON.stringify(data)
    }

    return await fetch(`${config.API_HOST}/api/auth/register`, option)
        .then(response => response.json())
        .catch(error => {
            console.log('Error fetching and parsing data', error);
        })
}