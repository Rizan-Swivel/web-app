
import MainDealsReport from "../../Containers/MerchentReports/MainDealsReport";
import MainMerchentsReport from "../../Containers/MerchentReports/MainMerchentReport";



export const reportsSubMenuRoutes =(parent)=>{
    return[
                {
            id: 10,
            path:  parent + "/merchent-view-deals-reports",
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
            path:  parent + "/merchent-view-merchent-reports",
            title: 'Merchent Report',
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
