import { FC, lazy } from "react";

const HomePage = lazy(() => import('./pages/HomePages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage/AboutPage'));
const FAQPage = lazy(() => import('./pages/FAQPage/FAQPage'));
const BuildPage = lazy(() => import('./pages/BuildPage/BuildPage'));

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
    },
    {
        key: 'FAQ-route',
        title: 'FAQ',
        path: '/faq',
        enabled: true,
        component: FAQPage
    },
    {
        key: 'build-route',
        title: 'Build',
        path: '/build',
        enabled: true,
        component: BuildPage
    },
]