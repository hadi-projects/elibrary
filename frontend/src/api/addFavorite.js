import { config } from '../config';


export async function addfavorite(bookId) {

    const option = {
        method: 'POST',
        headers: {
            'X-Api-Key': config.API_KEY,
            'Authorization': config.JWT_PREFIX + localStorage.getItem('token'),
        },
    }

    return await fetch(`${config.API_HOST}/api/favorite/create?bookId=${bookId}`, option)
        .then(response => response.json())
        .catch(error => {
            console.log('Error fetching and parsing data', error);
        })
}