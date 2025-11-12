import { config } from '../config';


export async function createBook(data) {

    const fd = new FormData()

    fd.append("title", data.title)
    fd.append("description", data.description)
    fd.append("catalog", data.category)
    fd.append("img", data.coverFile)

    const option = {
        method: 'POST',
        headers: {
            'X-Api-Key': config.API_KEY,
            'Authorization': config.JWT_PREFIX + localStorage.getItem('token'),
        },
        body:fd
    }

    return await fetch(`${config.API_HOST}/api/book/create`, option)
        .then(response => response.json())
        .catch(error => {
            console.log('Error fetching and parsing data', error);
        })
}