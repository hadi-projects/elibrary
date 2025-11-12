import { config } from '../config';


export async function deleteBook(id) {
    const option = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': config.API_KEY,
            'Authorization': config.JWT_PREFIX + localStorage.getItem('token'),
        },
    }

    return await fetch(`${config.API_HOST}/api/book/delete/${id}`, option)
        .then(response => response.json())
        .catch(error => {
            console.log('Error fetching and parsing data', error);
        })
}