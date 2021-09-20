import { Redirect, Route } from 'react-router'
import { useAuth } from '../Context/AuthContext'

export default function RouteWrapper({ Component, ...props }) {
    console.log(props)
    const { authData } = useAuth()

    if (props.roles && !props.roles.includes(authData.role)) {
        return <Redirect to="/error/401" />
    }
    return (
        <Route {...props} render={routeProps => <Component {...routeProps} />} />
    )
}
