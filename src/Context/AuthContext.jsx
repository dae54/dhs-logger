import React, { createContext, useState, useContext, useEffect } from 'react';
import * as AuthAPI from '../api/authAPI'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState();

    useEffect(() => {
        loadStorageData();
    }, []);

    async function loadStorageData() {
        try {
            const token = sessionStorage.getItem('token');
            const currentUser = sessionStorage.getItem('currentUser');
            if (token && currentUser) {
                const _authData = JSON.parse(currentUser);
                setAuthData(_authData);
            }
        } catch (error) {
        }
    }

    const signIn = async (email, password) => {
        try {
            // const _authData = await AuthAPI.login(
            //     'root@admin.com',
            //     'toor',
            // );
            const _authData = await AuthAPI.login(email, password)
            console.log(_authData)
            sessionStorage.setItem('token', _authData.token);
            sessionStorage.setItem('currentUser', JSON.stringify(_authData));
            setAuthData(_authData);
        } catch (error) {
            throw error
        }
    };

    const signUp = async (payload) => {
        try {
            const response = await AuthAPI.register(payload)
            return response
            // setAuthData(_authData);
            // AsyncStorage.setItem('@AuthData', JSON.stringify(_authData));
        } catch (error) {
            throw error
        }
    }

    const signOut = async () => {
        // await AuthAPI.signOut()
        setAuthData(undefined);

        sessionStorage.removeItem('token');
        sessionStorage.removeItem('currentUser');
    };

    return (
        <AuthContext.Provider value={{ authData, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    );
};

//A simple hooks to facilitate the access to the AuthContext
// and permit components to subscribe to AuthContext updates
function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export { AuthContext, AuthProvider, useAuth };
















// import React from 'react';
// import SecureStore from 'secure-store';

// export default function App({ navigation }) {
//     const [state, dispatch] = React.useReducer(
//         (prevState, action) => {
//             switch (action.type) {
//                 case 'RESTORE_TOKEN':
//                     return {
//                         ...prevState,
//                         userToken: action.token,
//                         isLoading: false,
//                     };
//                 case 'SIGN_IN':
//                     return {
//                         ...prevState,
//                         isSignout: false,
//                         userToken: action.token,
//                     };
//                 case 'SIGN_OUT':
//                     return {
//                         ...prevState,
//                         isSignout: true,
//                         userToken: null,
//                     };
//             }
//         },
//         {
//             isLoading: true,
//             isSignout: false,
//             userToken: null,
//         }
//     );

//     React.useEffect(() => {
//         // Fetch the token from storage then navigate to our appropriate place
//         const bootstrapAsync = async () => {
//             let userToken;

//             try {
//                 userToken = await SecureStore.getItemAsync('userToken');
//             } catch (e) {
//                 // Restoring token failed
//             }

//             // After restoring token, we may need to validate it in production apps

//             // This will switch to the App screen or Auth screen and this loading
//             // screen will be unmounted and thrown away.
//             dispatch({ type: 'RESTORE_TOKEN', token: userToken });
//         };

//         bootstrapAsync();
//     }, []);

//     const authContext = React.useMemo(
//         () => ({
//             signIn: async data => {
//                 // In a production app, we need to send some data (usually username, password) to server and get a token
//                 // We will also need to handle errors if sign in failed
//                 // After getting token, we need to persist the token using `SecureStore`
//                 // In the example, we'll use a dummy token

//                 dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
//             },
//             signOut: () => dispatch({ type: 'SIGN_OUT' }),
//             signUp: async data => {
//                 // In a production app, we need to send user data to server and get a token
//                 // We will also need to handle errors if sign up failed
//                 // After getting token, we need to persist the token using `SecureStore`
//                 // In the example, we'll use a dummy token

//                 dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
//             },
//         }),
//         []
//     );

//     return (
//         <AuthContext.Provider value={authContext}>
//             <Stack.Navigator>
//                 {state.userToken == null ? (
//                     <Stack.Screen name="SignIn" component={SignInScreen} />
//                 ) : (
//                     <Stack.Screen name="Home" component={HomeScreen} />
//                 )}
//             </Stack.Navigator>
//         </AuthContext.Provider>
//     );
// }
