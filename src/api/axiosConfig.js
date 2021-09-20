import axios from 'axios';


const getToken = () => {
    const token = sessionStorage.getItem('token')
    if (token !== null) {
        return token
    }
}

const instance = axios.create({
    // baseURL: 'https://stock-tracker-system.herokuapp.com/api/v1'
    baseURL: 'https://dhs-logger-api.herokuapp.com/api/v1',
    // baseURL: 'http://localhost:5400/api/v1'

});

instance.interceptors.request.use(async config => {
    config.headers.Authorization = getToken();
    return config;
})

export default instance;




