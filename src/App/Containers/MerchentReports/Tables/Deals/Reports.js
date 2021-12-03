import React from 'react'
import { Card } from "../../../../Components/atoms/Card";
import { Typography } from "../../../../Components/atoms/Typography";

const Reports=(props)=> {
        const {t} =props
    return (
        <div>
            <Card type="primary" size="full" className="flex bg-white mb-10">
                    <Typography color="primary" type="h1">
                        {t("reports.title")}                    
                    </Typography>
                <div className="w-full flex">
                    <div className="w-1/2 ">
                    <Typography color="primary" type="h3"> 
                        {t("reports.campaignReports")}  
                    </Typography>
                </div>
                <div className="w-1/2 ">
                    <Typography color="primary" type="h3"> 
                        {t("reports.audienceReachReports")}
                    </Typography>
                </div>
                </div>
            </Card>    
           
        </div>
    )
}
export default Reports
