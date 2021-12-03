import User from "../../Containers/User";
import ComingSoon  from "../../Containers/ComingSoon/ComingSoon";
import { Profile } from "../../Containers/profile/index";
import { List  as DealsList} from "../../Containers/Deals/index"
import {dealsSubMenuRoutes, dealsSubRoutes, merchantsSubRoutes,requestADealSubRoutes,requestADealSubMenuRoutes} from "./SubRoutes";
import {ViewMerchant} from "../../Containers/Merchants";
import CombinedDealRequestsList from "../../Containers/Deals/Requests/CombinedDealRequestsList";
import { reportsSubMenuRoutes } from "./MerchantSubRoutes";
import MainDealsReport from "../../Containers/MerchentReports/MainDealsReport";

const parentPathsForSubRoutes = {
  merchants: "/merchants",
  deals: "/deals",
  requestADeal: "/request-a-deal",
  categories:"/categories",
  brands:"/brands",
  reports:"/merchent-reports"
};

const routes = [
    ...dealsSubRoutes("/deals"),
    ...dealsSubMenuRoutes("/deals"),
    ...merchantsSubRoutes("/merchants"),
    ...reportsSubMenuRoutes("/merchent-reports"),

  {
    id: 6,
    path: "/deals/list",
    title: "deals",
    icon: "FormsIcon",
    auth: true,
    roles: [],
    display: "NavBar",
    exact: true,
    component: DealsList,
    routes: [
      ...dealsSubMenuRoutes("/deals"),
    ],
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
    path: "/merchent-reports",
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
    id: 12,
    path: "/campaign-forecast",
    title: "campaignForecast",
    icon: "FormsIcon",
    auth: true,
    roles: [],
    display: "NavBar",
    exact: true,
    component: ComingSoon,
  },
  {
    id : 20,
    path: '/profile',
    title: 'profile',
    icon: 'ButtonsIcon',
    auth: true,
    roles: [],
    display: "NavBar",
    exact: true,
    component: ViewMerchant,
  }
];
export default routes;
