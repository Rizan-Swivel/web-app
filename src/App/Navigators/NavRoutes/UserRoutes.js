import User from "../../Containers/User";
import {Profile} from "../../Containers/profile/index";
import AllNotifications from "../../Components/atoms/Notification/AllNotifications";
import ListMerchants from "../../Containers/Merchants/index";

const routes = [
  {
    id: 4,
    path: "/dashboard",
    title: "dashboard",
    icon: "HomeIcon",
    auth: true,
    roles: [],
    display: "NavBar",
    exact: true,
    component: User,
  },
  {
    id: 16,
    path: "/merchants",
    title: "merchants",
    icon: "HomeIcon",
    auth: true,
    roles: [],
    display: "NavBar",
    exact: true,
    component: ListMerchants,
  },
  {
    id: 1,
    path: "/profile",
    title: "profile",
    icon: "FormsIcon",
    auth: true,
    roles: [],
    display: "NavBar",
    exact: true,
    component: Profile,
  },
  {
    id: 15,
    path: "/all-notifications",
    title: "Notifications",
    icon: "ButtonsIcon",
    auth: true,
    roles: [],
    display: "none",
    exact: true,
    component: AllNotifications,
  },
];
export default routes;
