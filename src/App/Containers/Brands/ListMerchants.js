import React, { useState, useEffect } from "react";
import { Card } from "../../Components/atoms/Card";
import { Typography } from "../../Components/atoms/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import image from "../../assets/images/Placeholder.png";
import { compose } from "redux";
import BaseHOC from "../BaseHOC";
import MerchantsStore from "../Merchants/MerchantsStore";
import {Link,useParams} from "react-router-dom";
import {get} from "lodash";
import {Pagination} from "../../Components/atoms/Pagination";
import {ucFirst} from "../../Utils/helpers";
import {Spinner} from "../../Components/atoms/Spinner"

function ListMerchants(props) {

    const {userId, t } = props
    const {id} =useParams ()

    const renderFilters = () => {
        return (
            <Card type="primary" size="full" className=" bg-white mb-2">
                <div className="flex justify-start">
                    <div className="w-full md:w-1/3  relative">
                        <input
                            type="search"
                            onChange={handleChange}
                            class="w-full bg-gray-200 border border-gray-200 text-gray-700 rounded border-0 p-2 leading-tight"
                            placeholder={t('common.search_by_merchant')}
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

    const renderHeaders = () => {
        return (
            <Card type="primary" size="full" className=" bg-white mb-4">
                <div className="flex-grow border-b">
                    <div className="flex">
                        <div className="w-3/12">
                            <Typography color="primary" type="h4">
                                {t("common.profileImage")}
                            </Typography>
                        </div>
                        <div className="w-3/12">
                            <Typography color="primary" type="h4">
                                 {t("common.title")}
                            </Typography>
                        </div>
                        <div className="w-3/12">
                            <Typography color="primary" type="h4">
                                {t("common.subTitle")}
                            </Typography>
                        </div>                  
                    </div>
                </div>
            </Card>
        )
    }
    const renderMerchantCard = (item) => {
        return (
            <Card type="primary" size="full" className=" bg-white mb-4">
                <div className="flex-grow border-b">
                    <div className="flex">
                        <div className="w-3/12">
                            <img
                                class="w-16 h-16 rounded-full object-cover mr-4  shadow"
                                src={get(item,'imageUrl')  ? get(item,'imageUrl') : image}
                                alt="avatar"
                            />
                        </div>
                        <div className="w-3/12">
                            {get(item,'name')}
                        </div>
                        <div className="w-3/12">
                            {get(item,'joinedOn.displayDate')}
                        </div>                  
                    </div>
                </div>
            </Card>
        )
    }

    const renderMerchantCard111 = (item, i) => {
        return (
            <Card key={i} type="primary" size="full" className=" bg-white mb-2 h-24 space-y-2 ">
                <Link
                    to={{
                        pathname: "/merchants/view/"+item.id,
                    }}
                >
                    <div className="flex flex-row border-b ">
                        <div className="flex flex-col w-1/6">
                            <img
                                class="w-16 h-16 rounded-full object-cover mr-4 shadow"
                                src={get(item,'imageUrl')  ? get(item,'imageUrl') : image}
                                alt="avatar"
                            />
                        </div>
                        <div className="flex flex-col w-5/6">
                            <div className="flex-row mt-2.5 ">
                                <Typography color="primary" type="h4">
                                    {get(item,'name')}
                                </Typography>
                            </div>
                            <div className="flex-row">
                                <div className="grid grid-cols-3 gap-4 text-black Noto Sans font-weight: 400 text-sm mt-1">
                                    <div>  {t("merchant.approvelStatus")} : { ucFirst(get(item,'approvalStatus')) }</div>
                                    <div>  {t("common.joinedOn")} : {(get(item,'joinedOn.displayDate'))}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </Card>
        );
    };

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
            searchTerm: e.target.value ? e.target.value: "ALL"
        })
    };

    const gotoPage = (pageNo) => {
        setPaginationAndFilterData({
            ...paginationAndFilterData,
            page: pageNo
        })
    }

    useEffect(() => {
        props.searchMerchantsForBrand({
            ...paginationAndFilterData,
            userId,
            brandId: id
        })
    }, [paginationAndFilterData]);

    const [categories, setCategories] = useState([]);

    useEffect(() => {

        if (props.categoryList) {
            const cat = props.categoryList.categories?.map((data) => ({
                value: data.id,
                label: data.name,
            }));
            setCategories(cat);
        } else {
            props.getCategoryList({page: 0,size: 20,});
        }
    }, [props.categoryList]);

    useEffect(()=>{
        return ()=> props.resetMerchantState()
    },[])

    return (
        <div>
            { renderFilters() }
            {renderHeaders()}
            { props.merchantsList?.merchants?.length>0
                ? props.merchantsList.merchants.map((item, i) => renderMerchantCard (item, i))
                : renderNoRecords()
            }
            { props.merchantsList?.totalItems>paginationAndFilterData.size && (
                <Pagination
                    currentPage={props.merchantsList?.page}
                    totalPages={props.merchantsList?.totalPages}
                    getNextPageNumber={gotoPage}
                />)
            }
        </div>
    );
}

export default compose(BaseHOC)(MerchantsStore(ListMerchants))
