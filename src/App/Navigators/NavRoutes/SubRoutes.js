import {Add as AddDeal, View as ViewDeal,List as DealsList} from "../../Containers/Deals/index"
import {ViewMerchant, EditMerchant} from "../../Containers/Merchants/index"
import {default as ViewBusinessProfile} from  "../../Containers/Merchants/Approvels/ViewBusinessProfile"
import{ default as CategoryView } from "../../Containers/Category/View"
import {BrandView} from "../../Containers/Brands/index"
import {default as ViewContactDetails} from "../../Containers/Merchants/Approvels/ViewContactDetails"
import AddOfferType from "../../Containers/Deals/Requests/AddOfferType";
import RequestsForCombination from "../../Containers/Deals/Requests/RequestsForCombination"
import CombinedDealRequestsList from "../../Containers/Deals/Requests/CombinedDealRequestsList";
import ListOfferTypes from "../../Containers/Deals/Requests/ListOfferTypes";

export const dealsSubMenuRoutes =(parent)=> {
    return [
        {
            id: 6,
            path:  parent + "/add",
            title: 'common.add',
            icon: "FormsIcon",
            auth: true,
            roles: [],
            display: "NavBar",
            exact: true,
            sub : true,
            component: AddDeal,
        },
    ];
}

export const dealsSubRoutes =(parent)=> {
    return [
        {
            id : 14,
            path: parent + '/view/:id',
            title: 'common.viewDeal',
            icon: 'ButtonsIcon',
            auth: true,
            roles: [],
            exact: true,
            sub : false,
            component: ViewDeal,
        },
        // {
        //     id: 8,
        //     path:  parent + "/offer-type/edit/:id",
        //     title: 'navigation.addOfferType',
        //     icon: "FormsIcon",
        //     auth: true,
        //     roles: [],
        //     display: "NavBar",
        //     exact: true,
        //     sub : true,
        //     component: AddOfferType,
        // },
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

export const requestADealSubMenuRoutes =(parent)=> {
    return [
        {
            id: 7,
            path:  parent + "/combined-requests/list",
            title: 'navigation.combinedRequests',
            icon: "FormsIcon",
            auth: true,
            roles: [],
            display: "NavBar",
            exact: true,
            sub : true,
            component: CombinedDealRequestsList,
        },
    ];
}

export const requestADealSubRoutes =(parent)=> {
    return [
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


export const merchantsSubRoutes = (parent) => {
    return [
        {
            id : 15,
            path: parent + '/view/:id',
            icon: 'ButtonsIcon',
            auth: true,
            roles: [],
            exact: true,
            sub : true,
            component: ViewMerchant,
        },
        {
            id : 16,
            path: parent + '/review/:id',
            icon: 'ButtonsIcon',
            auth: true,
            roles: [],
            exact: true,
            sub : true,
            component: ViewMerchant,
            state: { action: 'review' }
        },
        {
            id : 17,
            path: parent + '/edit/:id',
            icon: 'ButtonsIcon',
            auth: true,
            roles: [],
            exact: true,
            sub : true,
            component: EditMerchant,
            state: { action: 'review' }
        },
        {
            id : 18,
            path: parent + '/edit/:id',
            icon: 'ButtonsIcon',
            auth: true,
            roles: [],
            exact: true,
            sub : true,
            component: EditMerchant,
            state: { action: 'review' }
        },
        {
            id : 19,
            path: parent + '/viewBusinessProfile/:id',
            icon: 'ButtonsIcon',
            auth: true,
            roles: [],
            exact: true,
            sub : true,
            component: ViewBusinessProfile,
            state: { action: 'review' }
        },
        {
            id : 20,
            path: parent + '/viewContactDetails/:id',
            icon: 'ButtonsIcon',
            auth: true,
            roles: [],
            exact: true,
            sub : true,
            component: ViewContactDetails,
            state: { action: 'review' }
        }
    ];
}

export const categorySubRoutes = (parent) => {
    return [
        {
            id : 16,
             path: parent + '/view/:id',
            title: 'common.viewCategory',
            icon: 'ButtonsIcon',
            auth: true,
            roles: [],
            exact: true,
            sub : true,
            component: CategoryView,
        }
    ];
}

export const brandSubRoutes = (parent) => {
    return [
        {
            id : 17,
            path: parent + '/view/:id',
            title: 'common.viewBrand',
            icon: 'ButtonsIcon',
            auth: true,
            roles: [],
            exact: true,
            sub : true,
            component: BrandView,
        }
    ];
}