import React, {useEffect, useState} from 'react'
import {Card} from "../../../../Components/atoms/Card";
import {Typography} from "../../../../Components/atoms/Typography";
import {compose} from "redux";
import BaseHOC from "../../../BaseHOC";
import ReportStore from "../../ReportStore";
import {Link, useLocation} from "react-router-dom";
import {get} from "lodash";
import {ucFirst} from "../../../../Utils/helpers";
import {merchant} from "../../../../Services/mockData";
import {roles} from "../../../../Utils/constants";

const AudienceReachDetailedReportForMerchent = (props) => {
    const { t, userId } = props;

     console.log("details   " ,props)
    const renderHeader = () =>{
        return(
            <Card type="primary" size="full" className=" bg-white mb-2">
                <div className="flex-grow border-b py-1">
                    <div className="flex">
                     
                        <div className="w-1/2">
                            <Typography color="primary" type="h4">
                                    Duration
                            </Typography>
                        </div>
                        <div className="w-1/2">
                            <Typography color="primary" type="h4">
                                Views count
                            </Typography>
                        </div>
                    
                    </div>
                </div>
            </Card>
        )
    }

    const renderMerchent =(item, i) => {
        return(
            <Card key={i} type="primary" size="full" className=" bg-white mb-2 h-24 space-y-2 ">
                <div className="flex flex-row border-b ">
                 
                    <div className="w-1/2">
                    <div> {(get(item,'displayDate'))}</div>
                    </div>
                    <div className="w-1/2">
                        <div> {(get(item,'viewCount'))}</div>
                    </div>
                   
                </div>
            </Card>
        )
    }

    const [paginationAndFilterData, setPaginationAndFilterData] = useState({
        page: 0,
        size: 250,
        userId,
        option:'DAILY',
        startDate: 1633717800000,
        endDate: 1636137000000,
        merchantId: props.userRole === roles.admin ? 'ALL' : userId
    })

    useEffect(()=>{
        props.getAudienceReachDetailedReportForMerchent(paginationAndFilterData)
    },[])


    useEffect(()=>{
        return () => props.resetDealsState();
    },[])


    return(
        <div>
            { renderHeader() }
            { props.audienceReachDetailedReportForMerchent?.views?.map((item, key) => renderMerchent(item,key)) }
        </div>
    )
}

export default compose(BaseHOC)(ReportStore(AudienceReachDetailedReportForMerchent))
