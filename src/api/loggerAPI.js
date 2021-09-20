import axios from './axiosConfig';

import { parseError, parseResponse } from './resolve.js';

export async function create(payload) {
    return await axios.post('/logger', payload)
        .then(response => parseResponse(response))
        .catch(error => { throw parseError(error) })
}

export async function updateOne(payload) {
    return await axios.patch('/logger', payload)
        .then(response => parseResponse(response))
        .catch(error => { throw parseError(error) })
}

export async function getAll() {
    return await axios.get('/logger')
        .then(response => parseResponse(response))
        .catch(error => { throw parseError(error) })
}

export async function getTeamVsClusters() {
    return await axios.get('/logger/getTeamVsClusters')
        .then(response => parseResponse(response))
        .catch(error => { throw parseError(error) })
}

export async function getTeamClusterInfo(teamNumber, payload) {
    return await axios.get(`/logger/getTeamClusterInfo/${teamNumber}`, { params: payload })
        .then(response => parseResponse(response))
        .catch(error => { throw parseError(error) })
}


export async function deleteOne(clusterId) {
    return await axios.delete(`/logger/${clusterId}`)
        .then(response => parseResponse(response))
        .catch(error => { throw parseError(error) })
}


// export async function signOut() {
//     return await axios.post('/users/signOut')
//         .then(response => parseResponse(response))
//         .catch(error => { throw parseError(error) })
// }
