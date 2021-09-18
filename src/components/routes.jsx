// import AuthCheck from "../Pages/Authentication/AuthCheck";
// import Login from "../Pages/Authentication/Login";
// import Register from "../Pages/Authentication/Register";
import Session from "../pages/Authentication/session";
import Dashboard from "../pages/Dashboard";
import LogData from "../pages/Data";
import Enumerators from "../pages/Enumerators";
import Teams from "../pages/Teams";

const routes = [
    {
        name: 'Dashboard',
        component: Dashboard,
        url: '/',
        icon: 'tv-2',
        color: 'primary',
        sidebar: true,
        roles: [3, 2, 1]
    },
    {
        name: 'Enumerators',
        component: Enumerators,
        url: '/enumerator',
        icon: 'tv-2',
        color: 'info',
        sidebar: true,
        roles: [3, 2, 1]
    },
    {
        name: 'Teams',
        component: Teams,
        url: '/teams',
        icon: 'tv-2',
        color: 'primary',
        sidebar: true,
        roles: [3, 2, 1]
    },
    {
        name: 'Clusters',
        component: LogData,
        url: '/clusters',
        icon: 'tv-2',
        color: 'primary',
        sidebar: true,
        roles: [3, 2, 1]
    },
]

const misc = [
    // {
    //     name: 'Profile',
    //     url: '/profile',
    //     icon: 'single-02',
    //     color: 'primary',
    //     component: <>Register</>
    // },
    // {
    //     name: 'Profile',
    //     component: Profile,
    //     url: '/user/profile',
    //     color: 'info',
    //     icon: 'cart',
    //     comments: 'Requests Profile endpoint',
    //     sidebar: true,
    //     roles: [3, 2, 1]
    // },
    // {
    //     name: 'Location',
    //     url: '/location',
    //     icon: 'settings',
    //     color: 'default',
    //     sidebar: true,
    //     component: LocationManage,
    //     roles: [2, 1]
    // },
    // {
    //     name: 'Logout',
    //     url: '/logout',
    //     icon: 'user-run',
    //     color: 'danger',
    // }
]

const openRoutes = [
    {
        name: 'session',
        url: '/sessioncheck',
        component: Session,
    },
    // {
    //     name: 'Register',
    //     url: '/register',
    //     component: Register,
    // },
]

export { openRoutes, misc }

export default routes