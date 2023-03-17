import { FC, lazy } from "react";

const HomePage = lazy(() => import("./pages/HomePages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage/AboutPage"));
const FAQPage = lazy(() => import("./pages/FAQPage/FAQPage"));
const BuildPage = lazy(() => import("./pages/BuildPage/BuildPage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage/SignupPage"));
const UserBuildPage = lazy(() => import("./pages/UserBuildPage/UserBuildPage"));
const NotFoundPage = lazy(
  () => import("./pages/ErrorPages/NotFoundPage/NotFoundPage")
);
const VerifyEmailPage = lazy(
  () => import("./pages/VerifyEmailPage/VerifyEmailPage")
);
const PasswordForgotPage = lazy(
  () => import("./pages/PasswordForgotPage/PasswordForgotPage")
);

// interface
interface Route {
  key: string;
  title: string;
  path: string;
  enabled: boolean;
  component: FC<{}>;
}

export const routes: Array<Route> = [
  {
    key: "home-route",
    title: "Home",
    path: "/",
    enabled: true,
    component: HomePage,
  },
  {
    key: "home-route2",
    title: "Home",
    path: "/Home",
    enabled: true,
    component: HomePage,
  },
  {
    key: "about-route",
    title: "About",
    path: "/about",
    enabled: true,
    component: AboutPage,
  },
  {
    key: "FAQ-route",
    title: "FAQ",
    path: "/faq",
    enabled: true,
    component: FAQPage,
  },
  {
    key: "build-route",
    title: "Build",
    path: "/build",
    enabled: true,
    component: BuildPage,
  },
  {
    key: "login-route",
    title: "Login",
    path: "/login",
    enabled: true,
    component: LoginPage,
  },
  {
    key: "signup-route",
    title: "Signup",
    path: "/signup",
    enabled: true,
    component: SignupPage,
  },
  {
    key: "user-acc-route",
    title: "Account",
    path: "/account",
    enabled: true,
    component: UserBuildPage,
  },
  {
    key: "not-found-route",
    title: "NotFound",
    path: "/*",
    enabled: true,
    component: NotFoundPage,
  },
  {
    key: "verify-route",
    title: "VerifyEmail",
    path: "/verify-email/:key",
    enabled: true,
    component: VerifyEmailPage,
  },
  {
    key: "password-forgot-route",
    title: "PasswordFogot",
    path: "/account/forgot",
    enabled: true,
    component: PasswordForgotPage,
  },
  {
    key: "password-change-route",
    title: "PasswordChange",
    path: "/account/forgot/:uid/:token",
    enabled: true,
    component: PasswordForgotPage,
  },
];
