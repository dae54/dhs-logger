// import AuthCheck from "../Pages/Authentication/AuthCheck";
// import Login from "../Pages/Authentication/Login";
// import Register from "../Pages/Authentication/Register";
import Dashboard from "../pages/Dashboard";
import Logger from "../pages/Logger";


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
        name: 'Logger',
        component: Logger,
        url: '/logger',
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
    // {
    //     name: 'login',
    //     url: '/sessioncheck',
    //     component: AuthCheck,
    // },
    // {
    //     name: 'Register',
    //     url: '/register',
    //     component: Register,
    // },
]

export { openRoutes, misc }

export default routes