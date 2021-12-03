import Login from "../../Containers/Login";
import signUpComp from "../../Containers/SignUp";
//import signUpComp from "../../Containers/SignUp";
import NotFound from "../../Containers/NotFound";

const routes = [
  {
    id: 8,
    path: "/",
    title: "Home",
    auth: false,
    roles: [],
    exact: true,
    component: Login,
  },
  {
    id: 6,
    path: "/login",
    title: "Login",
    auth: false,
    roles: [],
    exact: true,
    component: Login,
  },
  {
    id: 9,
    path: "/SignUp",
    title: "SignUp",
    auth: false,
    roles: [],
    exact: true,
    component: signUpComp,
  },
  {
    id: 0,
    path: "/404",
    auth: false,
    roles: [],
    exact: true,
    component: NotFound,
  },
];

export default routes;
