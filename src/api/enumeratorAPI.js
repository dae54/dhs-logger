import axios from './axiosConfig';

import { parseError, parseResponse } from './resolve.js';

export async function create(payload) {
    return await axios.post('/enumerator', payload)
        .then(response => parseResponse(response))
        .catch(error => { throw parseError(error) })
}

export async function updateOne(payload) {
    return await axios.patch('/enumerator', payload)
        .then(response => parseResponse(response))
        .catch(error => { throw parseError(error) })
}

export async function getAll() {
    return await axios.get('/enumerator')
        .then(response => parseResponse(response))
        .catch(error => { throw parseError(error) })
}

export async function deleteOne(clusterId) {
    return await axios.delete(`/enumerator/${clusterId}`)
        .then(response => parseResponse(response))
        .catch(error => { throw parseError(error) })
}

// export async function signOut() {
//     return await axios.post('/users/signOut')
//         .then(response => parseResponse(response))
//         .catch(error => { throw parseError(error) })
// }
