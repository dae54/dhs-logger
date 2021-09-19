import React from 'react';
import {
    Route,
    BrowserRouter,
    Redirect,
    Switch
} from "react-router-dom";
import axios from 'axios'
import { AuthProvider, useAuth } from './Context/AuthContext'

import ProtectedRoutes from './pages';
import { openRoutes } from './components/routes';

// axios config
axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://fast-taiga-60933.herokuapp.com/api/' : 'https://fast-taiga-60933.herokuapp.com/api/'
axios.defaults.timeout = 60000

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <PrivateRoute path='/' component={ProtectedRoutes} />
            </BrowserRouter>
        </AuthProvider>
    );
}

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { authData } = useAuth()
    console.log(authData)
    return (
        <>
            {!authData &&
                <Switch>
                    {openRoutes.map((item, index) =>
                        <Route exact path={item.link} key={index} component={item.component} />
                    )}
                </Switch>
            }
            <Route {...rest} render={(props) => (
                authData
                    ? <Component {...props} />
                    : <Redirect to='/' />
            )} />
        </>
    )
}
export default App;
/**
 * API ENDPOINTS
 * 1. GET REQUESTS BY USERID --> get users a list of users requests based on userid
 * 2. BASIC CRUD OPERATIONS FOR REQUEST
 * 3. BASIC USER AUTH
 * 4.
 */