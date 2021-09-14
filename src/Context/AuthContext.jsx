import React, { useReducer } from "react";

let initialState = {
    // budgetName: '', budgetDescription: '', budgetItems: [], budgetId: '',
    // fetchNew: '', activateBudget: false, startDate: new Date().toLocaleDateString(), endDate: '',

    // isAuthenticated: true,
    isAuthenticated: sessionStorage.getItem('token') ? true : false,
    userDetails: JSON.parse(sessionStorage.getItem('userDetails')) || '',
    token: '',
    currentUser: JSON.parse(sessionStorage.getItem('currentUser')) || {}
}
let reducer = (state, action) => {
    switch (action.type) {
        case 'isAuthenticated':
            return { ...state, isAuthenticated: state.isAuthenticated = action.payload }
        case 'userDetails':
            return { ...state, userDetails: state.userDetails = action.payload }
        case 'token':
            return { ...state, token: state.token = action.payload }
        case 'currentUser':
            return { ...state, currentUser: state.currentUser = action.payload }
        default: {
            return { ...state }
        }
    }
}

// const BudgetContext = React.createContext({});
const AuthContext = React.createContext({});

// const BudgetContextProvider = (props) => {
//     const [state, dispatch] = useReducer(reducer, initialState)
//     let value = { state, dispatch }
//     return (
//         <BudgetContext.Provider value={value}>{props.children}</BudgetContext.Provider>
//     )
// }

const AuthContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    let value = { state, dispatch }
    return (
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )
}

// const BudgetContextConsumer = BudgetContext.Consumer;
// export { BudgetContext, BudgetContextConsumer, BudgetContextProvider }


const AuthContextConsumer = AuthContext.Consumer;
export { AuthContext, AuthContextConsumer, AuthContextProvider }