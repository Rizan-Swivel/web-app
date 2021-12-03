import React,{useEffect} from 'react';
import {Typography} from "../../Components/atoms/Typography";
import {Card} from "../../Components/atoms/Card";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {Textfield} from "../../Components/atoms/Textfield";
import {Button} from "../../Components/atoms/Button";
import { Pagination } from '../../Components/atoms/Pagination';
import { compose } from "redux";
import BaseHOC from "../BaseHOC";
import BrandStore from "./BrandStore";
import { useParams,useState } from "react-router-dom";
import {get} from "lodash";
import { Link } from "react-router-dom";
import DealsList from './DealsList';
import ListMerchants from './ListMerchants';


const View=(props)=>{
    const { brand, t, userId } = props;
    const {id} = useParams();

    useEffect(() => {
        props.getBrand({
            brandId: id,
            userId
        });
    },[])

    useEffect(()=>{
        return ()=>{props.resetBrandsState()}
    },[])
return(
        <>
        <div className="flex justify-center bg-white">
            <div className="w-full  border-l border-r">
                <Card type="primary" size="full" className=" bg-white mb-2">
                    <div className="flex justify-between">
                        <div className="flex justify-start">
                            <Typography color="primary" type="h1">Brand detail</Typography>
                        </div>
                        <div className={"flex"}>
                            <Button
                                type="primary"
                                className="m-1 flex-grow">             
                                Edit
                            </Button>
                        </div>
                    </div>
                </Card>          
                <div className="flex flex-row ">
                    <div className="flex flex-col  m-5 w-1/4 ">
                        <img src={get(brand,'imageUrl')}/>
                    </div>
                    <div className="flex flex-col m-5 w-3/4 gap-4 ">
                        <div className="flex-row">
                            <div className="w-full flex-col  rounded-r p-3px">
                                <span > {t("brand.brandName") } </span>  
                                <span > { get(brand,"name") } </span>  
                            </div> 
                        </div>
                        <div className=" flex-row ">
                            <div className="w-full flex-col rounded-r p-3px">
                                <span > {t("brand.description") }</span>  
                                <span > { get(brand,"description") }</span>  
                            </div> 
                        </div>
                        <div className=" flex-row ">
                            <div className="w-full flex-col rounded-r p-px">
                                <span > {t("brand.noOfMerchents") }</span>  
                                <span > { get(brand,"noOfMerchants") }</span>  
                            </div> 
                        </div>
                        <div className=" flex-row">
                            <div className="w-full flex-col p-px rounded-r ">
                                <span > {t("brand.noOfDeals") }</span>  
                                <span > { get(brand,"noOfDeals") }</span>  
                            </div> 
                        </div>
                        <div className=" flex-row">
                            <div className="w-full flex-col p-px rounded-r ">
                                <span > {t("brand.noOfActiveDeals") }</span>  
                                <span > { get(brand,"noOfDeals") }</span>  
                            </div> 
                        </div> 
                        <div className=" flex-row">
                            <div className="w-full flex-col p-px rounded-r ">
                                <span > {t("brand.noOfActiveMerchents") }</span>  
                                <span > { get(brand,"noOfMerchants") }</span>  
                            </div> 
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
        <div className="flex justify-center bg-white border" >
            <div className="w-full  border-1 m-px">
                <Tabs className="border-1">
                    <TabList>
                        <Tab>Merchants</Tab>
                        <Tab>Deals</Tab>
                    </TabList>            
                    <TabPanel className="border-1">
                        <div>
                            <div className=" bg-white ">
                                <div className="flex flex-row w-2/6  "></div>
                                <ListMerchants {...props}  />
                            </div>                        
                        </div>
                    </TabPanel >
                    <TabPanel className="border-1">
                        <div>
                            <div className=" bg-white ">
                                <div className="flex flex-row w-2/6">
                                </div>                          
                                <DealsList {...props}  />
                            </div>                           
                        </div>                
                    </TabPanel >
                </Tabs>
            </div>
        </div>
        </>
    )
}
export default compose(BaseHOC)(BrandStore(View));
