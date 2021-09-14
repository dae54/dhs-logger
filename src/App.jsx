import React from 'react';
import {
    Route,
    BrowserRouter,
    Redirect,
    Switch
} from "react-router-dom";
import axios from 'axios'
import { AuthContextProvider, AuthContext } from './Context/AuthContext'
import ProtectedRoutes from './pages';
import { openRoutes } from './components/routes';

// axios config
axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://fast-taiga-60933.herokuapp.com/api/' : 'https://fast-taiga-60933.herokuapp.com/api/'
axios.defaults.timeout = 60000

function App() {
    return (
        <AuthContextProvider>
            <BrowserRouter>
                <PrivateRoute path='/' component={ProtectedRoutes} />
            </BrowserRouter>
        </AuthContextProvider>
    );
}

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { state } = React.useContext(AuthContext)
    return (
        <>
            {!state.isAuthenticated &&
                <Switch>
                    {openRoutes.map((item, index) =>
                        <Route exact path={item.link} key={index} component={item.component} />
                    )}
                </Switch>
            }
            <Route {...rest} render={(props) => (
                state.isAuthenticated
                    ? <Component {...props} />
                    : <Redirect to='/sessioncheck' />
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