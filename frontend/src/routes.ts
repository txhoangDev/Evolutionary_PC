import { FC, lazy } from "react";

const HomePage = lazy(() => import('./pages/HomePages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage/AboutPage'));

// interface
interface Route {
    key: string,
    title: string,
    path: string,
    enabled: boolean,
    component: FC<{}>
}

export const routes: Array<Route> = [
    {
        key: 'home-route',
        title: 'Home',
        path: '/',
        enabled: true,
        component: HomePage
    },
    {
        key: 'aboute-route',
        title: 'About',
        path: '/about',
        enabled: true,
        component: AboutPage
    }
]