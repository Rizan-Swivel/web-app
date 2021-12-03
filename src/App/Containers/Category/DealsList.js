import React, {useEffect, useState} from "react";
import { Card } from "../../Components/atoms/Card";
import {compose } from "redux"
import BaseHOC from "../BaseHOC";
import DealsStore from "../Deals/DealsStore";
import {Typography} from "../../Components/atoms/Typography";
import {Pagination} from "../../Components/atoms/Pagination";
import image from "../../assets/images/Placeholder.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {Link, useParams} from "react-router-dom";
import { dateFromTs,ucFirst } from "../../Utils/helpers";
import {get} from "lodash";


const List = (props) => {
    const { t, userId } = props;
    const {id}=useParams()

    const renderDeals =(deal)=>{
        return(
            <Card type="primary" size="full" className=" bg-white mb-2">
                <Link
                    to={{
                        pathname: "/deals/view/"+deal.id,
                    }}
                >
                <div className="flex flex-row border-b ">
                    <div className="w-3/12">
                        <img
                        className="w-12 h-12 rounded-full object-cover mr-4 shadow"
                        src={get(deal, 'imageUrls') ? get(deal, 'imageUrls')[0] : image}
                        alt="avatar"
                        />
                    </div>
                    <div className="w-3/12">
                        <div> {(get(deal,'title'))}</div>
                    </div>
                    <div className="w-3/12">
                    <   div> {(get(deal, 'subTitle'))}</div>
                    </div>
                </div>
            </Link>
        </Card>
        )
    }

    const renderHeaders = () => {
        return (
            <Card type="primary" size="full" className=" bg-white mb-4">
                <div className="flex-grow border-b">
                    <div className="flex">              
                        <div className="w-3/12">
                            <Typography color="primary" type="h4">
                                {t("common.coverImage")}
                            </Typography>
                        </div>
                        <div className="w-3/12">
                            <Typography color="primary" type="h4">
                                {t("common.title")}
                            </Typography>
                        </div>
                        <div className="w-3/12">
                            <Typography color="primary" type="h4">
                                {t("common.subtitle")}
                            </Typography>
                        </div>
                    </div>
                </div>
            </Card>
        );
    };

    const renderNoRecords = () => {
        return (
            <Card type="primary" size="full" className=" bg-white mb-2">
                <div className="w-3/12">
                    <Typography color="primary" type="h4">
                        No record found
                    </Typography>
                </div>
            </Card>
        )
    }

    const renderFilters = () => {
        return (
            <Card type="primary" size="full" className=" bg-white mb-2">
                <div className="flex justify-start">
                    <div className="w-full md:w-1/3  relative">
                        <input
                            type="search"
                            onChange={handleChange}
                           className="w-full bg-gray-200 border border-gray-200 text-gray-700 rounded border-0 p-2 leading-tight rounded-lg"
                            placeholder={t('common.search_by_merchant')}
                        />
                        <div class="absolute inset-y-0 mt-2 right-0 mr-2 text-gray-500">
                            {filterParameters.searchTerm && filterParameters.searchTerm != "NONE" ? null : (
                                <FontAwesomeIcon icon={faSearch} size="lg" />
                            )}
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

    const handleChange = (e) => {
        setFilterParameters({
            ...filterParameters,
            searchTerm: e.target.value ? e.target.value: "ALL"
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
            size: 5,
            searchTerm: 'ALL'
        })

    useEffect(() => {    
        props.searchDealsForCategory(
                {
                    ...filterParameters,
                    userId,
                    categoryId: id
                }
            );        
    },[filterParameters])

    useEffect(()=>{
        return () => props.resetDealsState();
    },[])

    return (
        <div>
            { renderFilters() } 
            { renderHeaders() }          
            {/* { props.dealsList.deals && props.dealsList.deals.map((deal)=> renderDeals(deal)) } */}
            { props.dealsList?.deals?.length>0
                    ? props.dealsList.deals.map((deal, i) => renderDeals(deal, i))
                    : renderNoRecords()
            }
            {
                props.dealsList.deals?.totalItems>filterParameters.size &&
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