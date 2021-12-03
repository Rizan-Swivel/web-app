import React, { useState, useEffect } from "react";
import { Card } from "../../Components/atoms/Card";
import { Typography } from "../../Components/atoms/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import image from "../../assets/images/Placeholder.png";
import { compose } from "redux";
import BaseHOC from "../BaseHOC";
import MerchantsStore from "./MerchantsStore";
import {Link,useLocation} from "react-router-dom";
import {get} from "lodash"
import {Button} from "../../Components/atoms/Button";
import {ucFirst} from "../../Utils/helpers";

function ListMerchants(props) {

    const {userId, t } = props

    const renderHeaders = () => {
        return (
            <Card type="primary" size="full" className=" bg-white mb-4">
                <div className="flex-grow border-b">
                    <div className="flex">
                        <div className="w-3/12">
                            <Typography color="secondary" type="h4">
                                {t("common.profileImage")}
                            </Typography>
                        </div>
                        <div className="w-3/12">
                            <Typography color="secondary" type="h4">
                                {t("common.user.name")}
                            </Typography>
                        </div>
                        <div className="w-3/12">
                            <Typography color="secondary" type="h4">
                                {t("common.approvalStatus")}
                            </Typography>
                        </div>
                    </div>
                </div>
            </Card>
        );
    };

    const renderFilters = () => {
        return (
            <Card type="primary" size="full" className=" bg-white mb-2">
                <div className="flex justify-between">
                    <div className="flex justify-start">
                        <Typography color="secondary" type="h3">{t("merchant.merchantsList")}</Typography>
                    </div>
                    <div className="w-full md:w-1/3 ml-10 relative">
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

    const renderMerchantCard = (item, i) => {

        return (
            <Card type="primary" size="full" className=" bg-white mb-2">
                <Link
                    to={{
                        pathname: "/merchants/review/"+item.userId,
                        state: { action: 'review' }
                    }}
                >
                    <div className="flex-grow border-b py-1">
                        <div className="flex">
                            <div className="w-3/12">
                                <img
                                    class="w-12 h-12 rounded-full object-cover mr-4 shadow"
                                    src={get(item,'imageUrl')  ? get(item,'imageUrl') : image}
                                    alt="avatar"
                                />
                            </div>
                            <div className="w-3/12">
                                <Typography color="primary" type="h4">
                                    {get(item,'fullName')}
                                </Typography>
                            </div>
                            <div className="w-3/12">
                                <Typography color="primary" type="h4">
                                    { ucFirst(get(item,'approvalStatus'))}
                                </Typography>
                            </div>
                            <div className="w-3/12 flex justify-end items-center">
                                <Button
                                    type="primary"
                                    className="mr-2 flex-grow"
                                >
                                    {t("common.review")}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Link>
            </Card>
        );
    };

    //default values for filters and pagination
    let initialPaginationAndFilterData = {
        page: 0,
        size: 20,
        searchTerm: "ALL",
    };

    const [paginationAndFilterData, setPaginationAndFilterData] = useState(initialPaginationAndFilterData);

    const handleChange = (e) => {
        setPaginationAndFilterData({
            ...paginationAndFilterData
        })
    };

    const gotoPage = (pageNo)=>{
        setPaginationAndFilterData({
            ...paginationAndFilterData,
            page: pageNo
        })
    }

    useEffect(() => {
        props.getPendingMerchantsList({
            ...paginationAndFilterData,
            userId
        })
    }, [paginationAndFilterData]);

    return (
        <div>
            { renderFilters() }
            { renderHeaders() }
            { props.merchantsList?.users?.length>0
                    ? props.merchantsList?.users?.map((item, i) => renderMerchantCard(item, i))
                    : null
            }
        </div>
    );
}

export default compose(BaseHOC)(MerchantsStore(ListMerchants))
