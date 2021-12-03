import React, { useState, useEffect } from "react";
import { Card } from "../../../Components/atoms/Card";
import { Typography } from "../../../Components/atoms/Typography";
import Merchents from "./MerchentsList";
import BusinessProfile from "./BusinessProfileList";
import Deals from "./DealsList";
import ContactDetails from "./ContactDetailsList";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

function Approvals(props) {
    const { t } = props 
    const [openTab, setOpenTab] = useState(1);
    
    const renderHeaders = () => {
        return (
            <div className="w-full  flex  ">
                <div className="w-full  flex flex-col content-center   ">
                    <div className="flex flex-col justify-center text-center md:justify-start  pt-2 md:pt-0  ">
 
                        <div  className="  text-left bg-opacity-75 pb-2  ">
                            <Tabs className="border-1 ">
                                <TabList>
                                    <Tab>Merchants</Tab>
                                    <Tab>Deals</Tab>
                                    <Tab>Business Profile</Tab>
                                    <Tab>Contact Details</Tab>
                                </TabList>            
                                <TabPanel className="border-1">
                                    <div>
                                        <div className="  ">                                         
                                            <Merchents {...props}/>
                                        </div>                        
                                    </div>
                                </TabPanel >
                                <TabPanel className="border-1">
                                    <div>
                                        <div className="  ">                                         
                                                              
                                            <Deals {...props} />
                                        </div>                           
                                    </div>                
                                </TabPanel >
                                <TabPanel className="border-1">
                                    <div>
                                        <div className="  ">                                        
                                                                   
                                            <BusinessProfile {...props}  />
                                        </div>                           
                                    </div>                
                                </TabPanel >
                                <TabPanel className="border-1">
                                    <div>
                                        <div className="  ">                                   
                                                                    
                                            <ContactDetails {...props} />
                                        </div>                           
                                    </div>                
                                </TabPanel >
                            </Tabs>
                            </div>
                        {/* </Card> */}
                    </div>
                </div>
            </div>
        );
    };

    const renderFilters = () => {
        return (
            <Card type="primary" size="full" className="  mb-2">
                <div className="flex justify-between">
                    <div className="flex justify-start">
                        <Typography color="primary" type="h1">{t("approvel.title")}</Typography>
                    </div>             
                </div>
            </Card>
        )
    }   

    return (
        <div>
            { renderFilters() }
            { renderHeaders() }
     
        </div>
    );
}

export default Approvals
