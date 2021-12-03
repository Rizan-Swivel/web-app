import User from "../../Containers/User";
import ComingSoon  from "../../Containers/ComingSoon/ComingSoon";
import ListMerchants from "../../Containers/Merchants/ListMerchants";
import {List}  from "../../Containers/Deals/index";
import {merchantsSubRoutes} from "./SubRoutes";
import {dealsSubRoutes} from "./SubRoutes";
import { categorySubRoutes  } from "./SubRoutes";
import{brandSubRoutes}from "./SubRoutes";
import {requestADealSubMenuRoutes,requestADealSubRoutes} from "./AdminSubRoutes"
import ListCategories from "../../Containers/Category/ListCategories";
import ListBrands from "../../Containers/Brands/ListBrands";
import ListUsers from "../../Containers/Users/ListUsers";
import Approvals from "../../Containers/Merchants/Approvels/Approvals";
import CombinedDealRequestsList from "../../Containers/Deals/Requests/CombinedDealRequestsList";
import { Reports } from "../../Containers/Reports/index";
import {reportsSubMenuRoutes} from "./AdminSubRoutes"
import MainDealsReport from "../../Containers/Reports/MainDealsReport";

const parentPathsForSubRoutes = {
  merchants: "/merchants",
  deals: "/deals",
  requestADeal: "/request-a-deal",
  categories: "/categories",
  brands: "/brands",
  reports: "/reports"
};

const routes = [
  ...merchantsSubRoutes(parentPathsForSubRoutes.merchants),
  ...categorySubRoutes(parentPathsForSubRoutes.categories),
  ...brandSubRoutes(parentPathsForSubRoutes.brands),
  ...requestADealSubMenuRoutes(parentPathsForSubRoutes.requestADeal),
  ...requestADealSubRoutes(parentPathsForSubRoutes.requestADeal),
  ...dealsSubRoutes(parentPathsForSubRoutes.deals),
  ...reportsSubMenuRoutes(parentPathsForSubRoutes.reports), 
  {
    id: 2,
    path: "/users",
    title: "user",
    icon: "FormsIcon",
    auth: true,
    roles: [],
    display: "NavBar",
    exact: true,
    component: ListUsers,
  },
  {
    id: 3,
    path: "/merchants",
    title: "merchants",
    icon: "FormsIcon",
    auth: true,
    roles: [],
    display: "NavBar",
    exact: true,
    component: ListMerchants,
  },
  {
    id: 4,
    path: "/categories",
    title: "categories",
    icon: "FormsIcon",
    auth: true,
    roles: [],
    display: "NavBar",
    exact: true,
    component: ListCategories,
  },
  {
    id: 4,
    path: "/brands",
    title: "brands",
    icon: "FormsIcon",
    auth: true,
    roles: [],
    display: "NavBar",
    exact: true,
    component: ListBrands,
  },
  {
    id: 5,
    path: "/coupons",
    title: "coupons",
    icon: "FormsIcon",
    auth: true,
    roles: [],
    display: "NavBar",
    exact: true,
    component: ComingSoon,
  },
  {
    id: 6,
    path: "/deals",
    title: "deals",
    icon: "FormsIcon",
    auth: true,
    roles: [],
    display: "NavBar",
    exact: true,
    component: List,
  },
  {
    id: 6,
    path: "/request-a-deal",
    title: "requestADeal",
    icon: "FormsIcon",
    auth: true,
    roles: [],
    display: "NavBar",
    exact: true,
    component: CombinedDealRequestsList,
    disabled: true,
    routes: [
      ...requestADealSubMenuRoutes(parentPathsForSubRoutes.requestADeal),
    ],
  },

  {
    id: 7,
    path: "/deals-of-the-day",
    title: "dealsOfTheDay",
    icon: "FormsIcon",
    auth: true,
    roles: [], 
    display: "NavBar",
    exact: true,
    component: ComingSoon,
  },
  {
    id: 8,
    path: "/orders",
    title: "orders",
    icon: "FormsIcon",
    auth: true,
    roles: [],
    display: "NavBar",
    exact: true,
    component: ComingSoon,
  },
  {
    id: 9,
    path: "/invoices",
    title: "invoices",
    icon: "FormsIcon",
    auth: true,
    roles: [],
    display: "NavBar",
    exact: true,
    component: ComingSoon,
  },
  {
    id: 10,
    path: "/reports",
    title: "reports",
    icon: "FormsIcon",
    auth: true,
    roles: [],
    display: "NavBar",
    exact: false,
    component: MainDealsReport,
    disabled: false,
    routes: [
      ...reportsSubMenuRoutes(parentPathsForSubRoutes.reports),
  
    ],
  },
  {
    id: 11,
    path: "/email-campaigns",
    title: "emailCampaigns",
    icon: "FormsIcon",
    auth: true,
    roles: [],
    display: "NavBar",
    exact: true,
    component: ComingSoon,
  },
  {
    id: 15,
    path: "/approvals",
    title: "approvals",
    icon: "FormsIcon",
    auth: true,
    roles: [],
    display: "NavBar",
    exact: true,
    component: Approvals,
  },
  
];
export default routes;
