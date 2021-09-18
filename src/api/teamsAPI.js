import axios from './axiosConfig';

import { parseError, parseResponse, resolve } from './resolve.js';

export async function create(payload) {
    return await axios.post('/team', payload)
        .then(response => parseResponse(response))
        .catch(error => { throw parseError(error) })
}

export async function updateOne(payload) {
    return await axios.patch('/team', payload)
        .then(response => parseResponse(response))
        .catch(error => { throw parseError(error) })
}

export async function getAll() {
    return await axios.get('/team')
        .then(response => parseResponse(response))
        .catch(error => { throw parseError(error) })
}

export async function deleteOne(clusterId) {
    return await axios.delete(`/team/${clusterId}`)
        .then(response => parseResponse(response))
        .catch(error => { throw parseError(error) })
}

// export async function signOut() {
//     return await axios.post('/users/signOut')
//         .then(response => parseResponse(response))
//         .catch(error => { throw parseError(error) })
// }
