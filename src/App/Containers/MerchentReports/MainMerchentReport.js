import React, { useState, useEffect } from "react";
import { Card } from "../../Components/atoms/Card";
import { Typography } from "../../Components/atoms/Typography";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MerchentTable from "./Tables/Merchents/MerchentAudienceReachSummeryReport";


// Main Merchent Report Tabs
function MainMerchentReport(props) {
    const { t, userId } = props;
    const [openTab, setOpenTab] = useState(1);
    const renderFilters = () => {
        return (
            <Card type="primary" size="full" className="  mb-2">
                <div className="flex justify-between">
                    <div className="flex justify-start">
                        <Typography color="primary" type="h1">Audience Reach Report for My Profile</Typography>
                    </div>             
                </div>
            </Card>
        )
    }
    
    const renderHeaders = () => {
        return (
            <div className="w-full  flex  ">
                <div className="w-full  flex flex-col content-center   ">
                    <div className="flex flex-col justify-center text-center md:justify-start  pt-2 md:pt-0  "> 
                        <div  className="  text-left bg-opacity-75 pb-2  ">
                            <Tabs className="border-1 ">
                                <TabList>
                                    <Tab>List View</Tab>                             
                                </TabList>            
                                <TabPanel className="border-1">
                                    <div>
                                        <div className="  ">                                         
                                            <MerchentTable {...props}/>
                                        </div>                        
                                    </div>
                                </TabPanel >                        
                            </Tabs>
                        </div>                       
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            {renderFilters()}
            {renderHeaders()}           
        </div>
    );
}

export default MainMerchentReport
