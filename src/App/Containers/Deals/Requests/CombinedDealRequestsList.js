import React, {useEffect, useState} from "react"
import {compose} from "redux";
import BaseHOC from "../../BaseHOC";
import DealsStore from "../DealsStore";
import {Card} from "../../../Components/atoms/Card";
import {Typography} from "../../../Components/atoms/Typography";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {get} from "lodash";
import image from "../../../assets/images/Placeholder.png";
import {Pagination} from "../../../Components/atoms/Pagination";
import {roles} from "../../../Utils/constants";

const CombinedDealRequestsList = (props) => {
    const {t, userId} = props;

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
        merchantId: "ALL",
        searchTerm: "ALL",
    })

    useEffect(() => {

        props.getCombinedDealRequestsList(
            {
                ...filterParameters,
                merchantId: props.userRole == roles.admin ? "ALL" : userId,
                userId
            }
        );
    },[filterParameters])

    const renderMainHeader = () =>{
        return(
            <Card type="primary" size="full" className="  mb-2"  >
                <div className="flex justify-between" >
                    <div className=" justify-start">
                        <div className="">
                            <Typography color="primary" type="h1">{t("deal.combinedDealRequests")}</Typography>
                        </div >
                    </div>
                </div>
            </Card>
        );
    }

    const headers = [
        t("common.profileImage"),
        t("common.merchant"),
        t("merchant.category"),
        t("merchant.brand"),
        t("deal.numberOfRequests"),
    ]

    const renderHeaders= () =>{
        return(
            <Card type="primary" size="full" className=" bg-white mb-2"  >
                <div className="flex flex-row border-b justify-start">
                    <div className="flex flex-col w-full mt-5">
                        <div className="flex flex-row text-black font-weight: 400 text-sm ">
                            {headers.map((title,i)=>
                                (<div key={i} className="w-1/5">
                                        <Typography color="primary" type="h4">
                                            {title}
                                        </Typography>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

    const renderCombinedDealRequest = (item, i) => {
        return (
            <Card key={i} type="primary" size="full" className=" bg-white mb-2 h-24 space-y-2 ">
                <Link
                    to={{
                        pathname: "/deals/requests/list/"+item.merchant?.id+"/"+item.category?.id+"/" + `${item.brand?.id==null?"NONE":item.brand?.id}`,
                        state: { test: "test" }
                    }}
                >
                    <div className="flex flex-row border-b ">
                        <div className="flex flex-col w-1/5">
                            <img
                                className="w-16 h-16 rounded-full object-cover mr-4 shadow"
                                src={get(item, 'merchant.imageUrl') ? get(item, 'merchant.imageUrl') : image}
                                alt="avatar"
                            />
                        </div>
                        <div className="flex flex-row w-4/5 pt-5">
                            <div className="flex flex-row items-baseline border-b w-full">
                                <div className="w-3/12">{(get(item,'merchant.name')) }</div>
                                <div className="w-3/12">{(get(item,'category.name')) }</div>
                                <div className="w-3/12">{ item.brand?.name?item.brand.name:"NA" }</div>
                                <div className="w-3/12">{(get(item,'numberOfRequests')) }</div>
                            </div>
                        </div>
                    </div>
                </Link>
            </Card>
        );
    };

    const renderFilters = (i) => {
        return (
            <Card type="primary" size="full" className=" bg-white ">
                <div className="flex content-start">
                    <div className=" content-start md:w-1/3  relative">
                        <input
                            type="search"
                            onChange={handleChange}
                            className="w-full bg-gray-200 border border-gray-200 text-gray-700 border-0 p-2 leading-tight rounded-lg"
                            placeholder={t('common.search_by_merchant')}
                        />
                        <div className="absolute inset-y-0 mt-2 right-0 mr-2 text-gray-500">
                            {filterParameters.searchTerm && filterParameters.searchTerm != "NONE" ? null : (
                                <FontAwesomeIcon icon={faSearch} size="lg" />
                            )}
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

    return (
        <div>
            { renderMainHeader() }
            { renderFilters() }
            { renderHeaders() }
            { props.combinedDealRequestsList?.combinedDealRequestList &&
                props.combinedDealRequestsList.combinedDealRequestList.map((item,i)=> renderCombinedDealRequest(item,i)) }
            { props.combinedDealRequestsList?.totalItems>filterParameters.size &&
                <Pagination
                    currentPage={props.combinedDealRequestsList?.page}
                    totalPages={props.combinedDealRequestsList?.totalPages}
                    getNextPageNumber={gotoPage}
                />
            }
        </div>
    )
}

export default compose(BaseHOC)(DealsStore(CombinedDealRequestsList))