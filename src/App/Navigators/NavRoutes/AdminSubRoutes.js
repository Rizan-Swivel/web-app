import AddOfferType from "../../Containers/Deals/Requests/AddOfferType";
import ListOfferTypes from "../../Containers/Deals/Requests/ListOfferTypes";
import RequestsForCombination from "../../Containers/Deals/Requests/RequestsForCombination";
import MainDealsReport from "../../Containers/Reports/MainDealsReport";
import MainMerchentsReport from "../../Containers/Reports/MainMerchentReport";

export const requestADealSubMenuRoutes =(parent)=> {
    return [
        {
            id: 7,
            path:  parent + "/add-offer-type",
            title: 'navigation.addOfferType',
            icon: "FormsIcon",
            auth: true,
            roles: [],
            display: "NavBar",
            exact: true,
            sub : true,
            component: AddOfferType,
        },
        {
            id: 7,
            path:  parent + "/offer-types",
            title: 'navigation.offerTypesList',
            icon: "FormsIcon",
            auth: true,
            roles: [],
            display: "NavBar",
            exact: true,
            sub : true,
            component: ListOfferTypes,
        },
    ];
}

export const requestADealSubRoutes =(parent)=> {
    return [
        {
            id: 8,
            path:  parent + "/offer-type/edit/:id",
            title: 'navigation.addOfferType',
            icon: "FormsIcon",
            auth: true,
            roles: [],
            display: "NavBar",
            exact: true,
            sub : true,
            component: AddOfferType,
        },
        {
            id: 8,
            path:  parent + "/requests/list/:merchantId/:categoryId/:brandId",
            title: 'navigation.addOfferType',
            icon: "FormsIcon",
            auth: true,
            roles: [],
            display: "NavBar",
            exact: true,
            sub : true,
            component: RequestsForCombination,
        }
    ];
}

export const reportsSubMenuRoutes =(parent)=>{
    return[
                {
            id: 10,
            path:  parent + "/deals-reports",
            title: 'Deals Report',
            icon: "FormsIcon",
            auth: true,
            roles: [],
            display: "NavBar",
            exact: true,
            sub : true,
            component: MainDealsReport,
        },
        {
            id: 10,
            path:  parent + "/merchent-reports",
            title: 'Merchant Report',
            icon: "FormsIcon",
            auth: true,
            roles: [],
            display: "NavBar",
            exact: true,
            sub : true,
            component: MainMerchentsReport,
        },

    ]
}
