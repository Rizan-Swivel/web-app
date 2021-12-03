import React, {useEffect, useState} from "react";
import { Card } from "../../Components/atoms/Card";
import {compose } from "redux"
import BaseHOC from "../BaseHOC";
import DealsStore from "./DealsStore";
import {Typography} from "../../Components/atoms/Typography";
import {Pagination} from "../../Components/atoms/Pagination";
import image from "../../assets/images/Placeholder.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {dateFromTs, ucFirst} from "../../Utils/helpers"
import {get} from "lodash"
import {roles} from "../../Utils/constants";
import {Spinner} from "../../Components/atoms/Spinner";

const List = (props) => {
    const { searchOnAllDeals, t, userId } = props;
    const renderHeaders= () =>{
        //this contains the colomn headers
        return(
            <Card type="primary" size="full" className=" bg-white mb-2"  >
                <div className="flex flex-row border-b justify-start">
                    <div className="flex flex-col w-1/6 mt-5">
                        <Typography color="primary" type="h4">
                            {t("deal.coverImage")}
                        </Typography>
                    </div>
                    <div className="flex flex-col w-5/6 mt-5">
                        <div className="flex flex-row text-black Noto Sans font-weight: 400 text-sm ">
                            <div className="w-1/4 ">
                                <Typography color="primary" type="h4">
                                {t("deal.title")}
                                </Typography>
                            </div>
                            <div className="w-1/4 ">
                                <Typography color="primary" type="h4">
                                {t("deal.subTitle")}
                                </Typography>
                            </div>
                            <div className="w-1/4 ">
                                <Typography color="primary" type="h4">
                                {t("deal.validFrom")}
                                </Typography>
                            </div>
                            <div className="w-1/4 ">
                                <Typography color="primary" type="h4">
                                {t("deal.expiredOn")}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

    const renderDeal= (deal) =>{     
        return(
            <Card type="primary" size="full" className=" bg-white mb-2"  >
                <Link
                    to={{
                        pathname: "/deals/view/"+deal.id,
                    }}
                >
                <div className="flex flex-row border-b justify-start">
                    <div className="flex flex-col w-1/6 mt-5">
                        <img
                            className="w-12 h-12 rounded-full object-cover mr-4 shadow"
                            src={get(deal, 'imageUrls') ? get(deal, 'imageUrls')[0] : image}
                            alt="avatar"
                        />
                    </div>
                    <div className="flex flex-col w-5/6 mt-5">
                        <div className="flex flex-row text-black Noto Sans font-weight: 400 text-sm ">
                            <div className="w-1/4 ">                             
                                {(get(deal, 'title'))}                          
                            </div>
                            <div className="w-1/4 ">                              
                                {(get(deal, 'subTitle'))}                             
                            </div>
                            <div className="w-1/4 ">                             
                                {(get(deal, 'validFrom.displayDate'))}                               
                            </div>
                            <div className="w-1/4 ">                           
                                {(get(deal, 'expiredOn.displayDate'))}                           
                            </div>
                        </div>
                    </div>
                </div>
                </Link>
            </Card>
        )
    }

    const renderTitle = () =>{
        return(
          <Card type="primary" size="full" className="  mb-2">
            <Typography color="primary" type="h1"> 
                {t("deal.titleDeals")}
            </Typography>
          </Card>
        )
      }

    const renderFilters = () => {
        return (
            <Card type="primary" size="full" className=" bg-white mb-2">
                <div className="flex  ">
                    <div className="w-5/6 relative">
                        <div className="w-1/3 relative">
                            <input
                                type="search"
                                onChange={handleChange}
                                className="w-full bg-gray-200 border border-gray-200 text-gray-700 rounded-lg border-0 p-2 leading-tight"
                                placeholder={t('common.search_by_deal_brand')}
                            />
                            <div className="absolute inset-y-0 mt-2 right-0 mr-2 text-gray-500">
                                {filterParameters.searchTerm && filterParameters.searchTerm != "NONE" ? null : (
                                    <FontAwesomeIcon icon={faSearch} size="lg"/>
                                )}
                            </div>
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
                        <Spinner type={"ClipLoader"}/>
                    </Typography>
                </div>
            </Card>
        )
      }

    const handleChange = (e) => {
        setFilterParameters({
            ...filterParameters,
            searchTerm: e.target.value ? e.target.value : "ALL"
        })
    };

    const gotoPage = (pageNo)=>{
        setFilterParameters({
            ...filterParameters,
            page: pageNo
        })
    }

    const [filterParameters, setFilterParameters] = useState({
            page: 0,
            size: 25,
            searchTerm: "ALL",
        })

    useEffect(() => {
        if (props.userRole === roles.admin){
           props. searchOnAllDeals(
                {
                    ...filterParameters,
                    userId
                }
            );
        }else if (props.userRole === roles.merchant){
            props.getAllDealsByMerchant(
                {
                    ...filterParameters,
                    merchantId: userId
                }
            );
        }
    },[filterParameters])

    return (
        <div>
            {renderTitle()}
            { renderFilters() }
            {renderHeaders()} 
            { props.dealsList?.deals?.length>0
                 ? props.dealsList?.deals.map((deal, i) => renderDeal(deal,i))
                        : renderNoRecords()
            }
            { props.dealsList?.totalItems>filterParameters.size &&
                    <Pagination
                        currentPage={props.dealsList?.page}
                        totalPages={props.dealsList?.totalPages}
                        getNextPageNumber={gotoPage}
                    />
            }
        </div>
    )
}

export default compose(BaseHOC)(DealsStore(List))