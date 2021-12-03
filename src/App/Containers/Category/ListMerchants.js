import React, { useState, useEffect } from "react";
import { Card } from "../../Components/atoms/Card";
import { Typography } from "../../Components/atoms/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import image from "../../assets/images/Placeholder.png";
import { compose } from "redux";
import BaseHOC from "../BaseHOC";
import MerchantsStore from "../Merchants/MerchantsStore";
import {Link} from "react-router-dom";
import {get} from "lodash";
import { useParams } from "react-router-dom";
import {ucFirst} from "../../Utils/helpers";
import {Pagination} from "../../Components/atoms/Pagination";

function ListMerchants(props) {

    const { userId, t } = props
    const {id} = useParams ();

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
                            {t("common.user.name")}
                        </Typography>
                    </div>
                    <div className="w-3/12">
                        <Typography color="primary" type="h4">
                            {t("common.user.createdAt")}
                        </Typography>
                    </div>
                </div>
            </div>
        </Card>
        );
    };

    const renderMerchantCard =(item, i)=>{
        return(
            <Card key={i} type="primary" size="full" className=" bg-white mb-2 h-24 space-y-2 ">
                <Link
                    to={{
                        pathname: "/merchants/view/"+item.id,
                    }}
                >
                <div className="flex flex-row border-b ">
                    <div className="w-3/12">
                        <img
                            class="w-16 h-16 rounded-full object-cover mr-4 shadow"
                            src={get(item,'imageUrl')  ? get(item,'imageUrl') : image}
                            alt="avatar"
                        />
                    </div>
                    <div className="w-3/12">
                        <div> { ucFirst(get(item,'name')) }</div>
                    </div>
                    <div className="w-3/12">
                        <div> {(get(item,'joinedOn.displayDate'))}</div>
                    </div>
                </div>
            </Link>
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
                            {paginationAndFilterData.searchTerm && paginationAndFilterData.searchTerm != "NONE" ? null : (
                                <FontAwesomeIcon icon={faSearch} size="lg" />
                            )}
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
                        No record found
                    </Typography>
                </div>
            </Card>
        )
    }

    //default values for filters and pagination
    let initialPaginationAndFilterData = {
        page: 0,
        size: 20,
        searchTerm: "ALL"
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
        props.searchMerchantsForCategory({
            ...paginationAndFilterData,
            userId,
            categoryId: id,
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
            { renderHeaders()}         
            { props.merchantsList?.merchants?.length>0
                    ? props.merchantsList.merchants.map((item, i) => renderMerchantCard(item, i))
                    : renderNoRecords()
            }
            { props.categoryList?.categories?.totalItems > paginationAndFilterData.size && (
                    <Pagination
                        currentPage={props.categoryList?.page}
                        totalPages={props.categoryList?.totalPages}
                        getNextPageNumber={gotoPage}
                    />)
            }
        </div>
    );
}

export default compose(BaseHOC)(MerchantsStore(ListMerchants))
