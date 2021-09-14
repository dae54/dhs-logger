import React from 'react'
import { Route, Switch } from 'react-router-dom'
import routes from '../components/routes'
import RouteWrapper from '../components/RouteWrapper'
// import NotFound from './Errors/NotFound'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
// import { CronJob } from 'cron'

export default function Main() {

    return (
        <div>
            <Sidebar />
            <div className="main-content" id="panel">
                <Navbar />
                <Switch>
                    {routes.map(route =>
                        <RouteWrapper
                            exact
                            path={route.url}
                            component={route.component}
                            roles={route.roles}
                            key={route.url} />
                    )}
                    {/* <Route component={NotFound} /> */}
                </Switch>
                {/* {routes.map((item, index) => {
                    return (<Route exact path={item.link} key={index} component={item.component} />)
                })} */}
                {/* <Footer /> */}
            </div>


        </div>
    )
}