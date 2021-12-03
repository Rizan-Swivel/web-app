import React, { useState, useEffect } from "react";
import { Card } from "../../../Components/atoms/Card";
import {get} from "lodash"
import {Button} from "../../../Components/atoms/Button";
import image from "../../../assets/images/Placeholder.png";
import {ucFirst} from "../../../Utils/helpers";
import { Typography } from "../../../Components/atoms/Typography";
import {Link } from "react-router-dom";
import DealsStore from "../../Deals/DealsStore";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Pagination} from "../../../Components/atoms/Pagination";
import {Spinner} from "../../../Components/atoms/Spinner";

const DealsList = (props)=> {
    const { t} = props    

    const renderDealsCard = (item, i) => {
        return (
            <Card key={i} type="primary" size="full" className=" bg-white mb-2 h-24 space-y-2">
                <Link
                    to={{
                          pathname: "/deals/view/"+item.id,
                    
                    }}
                >
                    <div className="flex-grow border-b py-1">
                        <div className="flex">
                            <div className="w-3/12">
                                <img
                                    className="w-12 h-12 rounded-full object-cover mr-4 shadow"
                                    src={get(item,'coverImage')  ? get(item,'icoverImage') : image}
                                    alt="avatar"
                                />
                            </div>
                            <div className="w-3/12">                               
                                    {get(item,'subTitle')}                                
                            </div>
                            <div className="w-3/12">                                
                                    { ucFirst(get(item,'approvalStatus'))}                               
                            </div>
                            <div className="w-3/12 flex justify-end items-center">
                                <Button
                                    type="primary"
                                    className="mr-2 flex-grow bg-purple-600 bg-opacity-75 rounded-lg"
                                >
                                 Review
                                </Button> 
                            </div>
                        </div>
                    </div>                    
                </Link>
            </Card>
        );
    };

    const renderColomnHeaders=(i) => {
        return(
            <Card  key={i} type="primary" size="full" className=" bg-white mb-2">
                <div className="flex-grow border-b py-1">
                    <div className="flex">
                        <div className="w-3/12">
                            <Typography color="primary" type="h4">
                                   Icon
                            </Typography>
                        </div>
                        <div className="w-3/12">
                            <Typography color="primary" type="h4">
                                    Sub Title
                            </Typography>
                        </div>
                        <div className="w-3/12">
                            <Typography color="primary" type="h4">
                                     Approval Status
                            </Typography>
                        </div>
                        <div className="w-3/12 flex justify-end items-center">
                     
                        </div>
                    </div>
                </div>                 
            </Card>
        )
    }

    const renderNoRecords = () => {
        return (
            <Card type="primary" size="full" className=" bg-white mb-2">
                <div className="w-3/12">
                    <Typography color="primary" type="h4">
                  
                      {/* {t("notfound.pendingDealsNotFound")}  */}
                      <Spinner type={"ClipLoader"}/>
                    </Typography>
                </div>
            </Card>
        )
    }



    const renderFilters = () => {
        return (
            <Card type="primary" size="full" className=" bg-white mb-2">
                  <div className="flex content-start">
                    <div className="flex justify-start">
                     {/* <Typography color="primary" type="h3">Deals List</Typography>  */}
                    </div>
                    <div className=" content-start md:w-1/3  relative">
                        <input
                            type="search"
                            onChange={handleChange}
                            className="w-full bg-gray-200 border border-gray-200 text-gray-700 rounded border-0 p-2 leading-tight rounded-lg"                         
                            placeholder={"Search by Deals"}
                        />
                        <div class="absolute inset-y-0 mt-2 right-0 mr-2 text-gray-500">
                            {paginationAndFilterData.searchTerm && paginationAndFilterData.searchTerm != "NONE" ? null : (
                                <FontAwesomeIcon icon={faSearch} size="lg" />
                            )}
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

       //default values for filters and pagination
       let initialPaginationAndFilterData = {
        page: 0,
        size: 25,
        searchTerm: "ALL",
    };

    const [paginationAndFilterData, setPaginationAndFilterData] = useState(initialPaginationAndFilterData);  

   const handleChange = (e) => {
     setPaginationAndFilterData({
         ...paginationAndFilterData,
         searchTerm: e.target.value ? e.target.value : "ALL"
     })
    };

     useEffect(() => {
         props.getPendingDealsList(paginationAndFilterData)
     },[paginationAndFilterData]);


    const gotoPage = (pageNo)=>{
        setPaginationAndFilterData({
            ...paginationAndFilterData,
            page: pageNo
        })
    }

    useEffect(()=>{
        return () => props.resetDealsState();
    },[])
    
    return(
        <div>
            {renderFilters()}
            {renderColomnHeaders()}
           { props.pendingDealsList?.deals?.length>0
                    ? props.pendingDealsList?.deals?.map((item, i) => renderDealsCard(item, i))
                    : renderNoRecords()
            }
             { props.pendingDealsList?.totalItems>paginationAndFilterData.size &&
            <Pagination
                currentPage={props.pendingDealsList?.page}
                totalPages={props.pendingDealsList?.totalPages}
                getNextPageNumber={gotoPage}
            />
            } 
        </div>
    );
}
export default DealsStore(DealsList)
