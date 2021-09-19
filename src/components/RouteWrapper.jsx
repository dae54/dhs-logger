import { useContext } from 'react'
import { Redirect, Route } from 'react-router'
import { AuthContext, useAuth } from '../Context/AuthContext'

export default function RouteWrapper({ Component, ...props }) {
    console.log(props)
    const { authData } = useAuth()
    const { state } = useContext(AuthContext)

    if (props.roles && !props.roles.includes(authData.role)) {
        return <Redirect to="/error/401" />
    }
    return (
        <Route {...props} render={routeProps => <Component {...routeProps} />} />
    )
}
