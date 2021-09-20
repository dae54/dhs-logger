import axios from './axiosConfig';

import { parseError, parseResponse } from './resolve.js';

export async function login(email, password) {
    return await axios.post('/users/login', { email, password })
        .then(response => parseResponse(response))
        .catch(error => { throw parseError(error) })
}

export async function register(payload) {
    return await axios.post('/users', payload)
        .then(response => parseResponse(response))
        .catch(error => { throw parseError(error) })
}

export async function signOut() {
    return await axios.post('/users/signOut')
        .then(response => parseResponse(response))
        .catch(error => { throw parseError(error) })
}


export async function getAll() {
    return await axios.get('/users')
        .then(response => parseResponse(response))
        .catch(error => { throw parseError(error) })
}


export async function updateOne(payload) {
    return await axios.patch('/users', payload)
        .then(response => parseResponse(response))
        .catch(error => { throw parseError(error) })
}

export async function deleteOne(userId) {
    return await axios.delete(`/users/${userId}`)
        .then(response => parseResponse(response))
        .catch(error => { throw parseError(error) })
}

