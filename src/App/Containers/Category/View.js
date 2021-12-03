import React,{useEffect,useState} from 'react';
import {Typography} from "../../Components/atoms/Typography";
import {Card} from "../../Components/atoms/Card";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {Button} from "../../Components/atoms/Button";
import { compose } from "redux";
import BaseHOC from "../BaseHOC";
import CategoryStore from "./CategoryStore";
import { useParams } from "react-router-dom";
import {get} from "lodash";
import ListMerchants from "./ListMerchants";
import DealsList from './DealsList';
import SimpleList from "../../Components/atoms/List/SimpleList";

const View=(props)=>{
    const { category, t, userId } = props;
    const {id} = useParams();
    const [categorySummery, setCategorySummery] = useState();

    useEffect(() => {
        props.getCategory({
            categoryId: id,
            userId
        });
        return ()=> props.resetCategoryState()
    },[])
     
    useEffect(()=>{       
        setCategorySummery([
            {name: t("category.name"),value: get(props,'category.name')},
            {name: t("category.description"),value: get(props,'category.description')},
            {name: t("category.noOfMerchants"),value: get(props,'category.noOfMerchents')},
            {name: t("category.noOfDeals"),value: get(props,'category.noOfDeals')},
            {name: t("common.noOfActiveDeals"),value: get(props,'category.noOfDeals') },
            {name: t("common.noOfActiveMerchants"),value: get(props,'category.noOfMerchents')},
        ])
    },[props.category])

    return(
        <>                       
            <div className="flex justify-center bg-white w-full">
                <div className="w-full  border-l border-r">
                    <Card type="primary" size="full" className=" bg-white mb-1">
                        <div className="flex justify-between">
                            <div className="flex justify-start">
                                <Typography color="primary" type="h3">{t("category.categoryDetails")}</Typography>
                            </div>
                            <div className={"flex"}>
                                <Button
                                    type="primary"
                                    className="m-1 flex-grow rounded-lg h-28 w-28 bg-purple-500">
                                    Edit
                                </Button>
                            </div>
                            </div>
                    </Card>
                    <div className="flex flex-row ">
                        <div className="flex flex-col m-2 w-2/6 ">
                            <img className="px-1 h-56" src={get(category,'imageUrl')}/>
                        </div>
                        <div className="flex flex-col w-4/6 gap-3 mb-5">                   
                            {category &&
                                <div className="flex flex-row  w-full">
                                    <SimpleList items={categorySummery} itemClass="pb-1 text-gray-800" labelClass="font-bold w-1/4" separator={" : "}/>
                                </div>
                            }
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
                                    <ListMerchants   {...props} />
                                </div>
                            </div>
                        </TabPanel >
                        <TabPanel className="border-1">
                            <div>
                                <div className=" bg-white ">
                                    <DealsList {...props}   />
                                </div>
                            </div>
                        </TabPanel >
                    </Tabs>
                </div>
            </div>
        </>
    )
}
export default compose(BaseHOC)(CategoryStore(View));
