import React, { useState, useEffect } from "react";
import { Card } from "../../Components/atoms/Card";
import { Typography } from "../../Components/atoms/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import image from "../../assets/images/Placeholder.png";
import { compose } from "redux";
import BaseHOC from "../BaseHOC";
import MerchantsStore from "./MerchantsStore";
import {Link} from "react-router-dom";
import {get} from "lodash"
import {dateFromTs, ucFirst} from "../../Utils/helpers";
import {Pagination} from "../../Components/atoms/Pagination";
import {Spinner} from "../../Components/atoms/Spinner";

function ListMerchants(props) {

    const {userId, t } = props
  

    const renderMainHeader = () =>{
        return(
            <Card type="primary" size="full" className="  mb-2"  >
            <div className="flex justify-between" >
                <div className=" justify-start">
                    <div className="">
                        <Typography color="primary" type="h1">{t("merchant.merchantsList")}</Typography>
                    </div >
                </div>
            </div>
        </Card>
        );
    }

    const renderFilters = () => {
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
                        <div class="absolute inset-y-0 mt-2 right-0 mr-2 text-gray-500">
                            {paginationAndFilterData.searchTerm && paginationAndFilterData.searchTerm != "NONE" ? null : (
                                <FontAwesomeIcon icon={faSearch} size="lg" />
                            )}
                        </div>
                    </div>
                <div >                   
                </div>
                </div>
            </Card>
        )
    }


    const renderHeaders= () =>{
        //this contains the colomn headers
        return(
            <Card type="primary" size="full" className=" bg-white mb-2"  >
                <div className="flex flex-row border-b justify-start">
                    <div className="flex flex-col w-1/6 mt-5">
                        <Typography color="primary" type="h4">
                            {t("merchant.bussinessLogo")}
                        </Typography>
                    </div>
                    <div className="flex flex-col w-5/6 mt-5">
                        <div className="flex flex-row text-black Noto Sans font-weight: 400 text-sm ">
                            <div className="w-1/5 ">
                                <Typography color="primary" type="h4">
                                {t("merchant.businessName")}
                                </Typography>
                            </div>
                            <div className="w-1/5 ">
                                <Typography color="primary" type="h4">
                                {t("merchant.bussinessStatus")}
                                </Typography>
                            </div>
                            <div className="w-1/5 ">
                                <Typography color="primary" type="h4">
                                {t("profile.profileName")}
                                </Typography>
                            </div>
                            <div className="w-1/5 ">
                                <Typography color="primary" type="h4">
                                {t("profile.profileStatus")}
                                </Typography>
                            </div>
                            <div className="w-1/5 ">
                                <Typography color="primary" type="h4">
                                {t("common.user.createdAt")}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

    const renderMerchantCard = (item, i) => {
        return (
            <Card key={i} type="primary" size="full" className=" bg-white mb-2 h-24 space-y-2 ">
                <Link
                    to={{
                        pathname: "/merchants/view/"+item.profile.id,
                    }}
                >
                    <div className="flex flex-row border-b ">
                        <div className="flex flex-col w-1/6">
                            <img
                                class="w-16 h-16 rounded-full object-cover mr-4 shadow"
                                src={get(item,'business.imageUrl')  ? get(item,'business.imageUrl') : image}
                                alt="avatar"
                            />
                        </div>
                        <div className="flex flex-col w-5/6 mt-5">
                            <div className="flex flex-row text-black Noto Sans font-weight: 400 text-sm mt-5 ">
                                <div className="w-1/5">{(get(item,'business.name')) }</div>
                                <div className="w-1/5">{ucFirst(get(item,'business.approvalStatus')) }</div>
                                <div className="w-1/5">{get(item,'profile.name')}</div>
                                <div className="w-1/5">{ucFirst(get(item,'profile.approvalStatus'))}</div>
                                <div className="w-1/5">{get(item,'profile.joinedOn.displayDate')}</div>
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
                            <Spinner type={"ClipLoader"} timeout={1000}/>
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
    const [searchTermState, setSearchTermState] = useState(null)

    const handleChange = (e) => {
        let text = e.target.value ? e.target.value : "ALL"
        setPaginationAndFilterData({
            ...paginationAndFilterData,
            searchTerm: text
        })
        setSearchTermState(e.target.value)
    };

    const gotoPage = (pageNo)=>{
        setPaginationAndFilterData({
            ...paginationAndFilterData,
            page: pageNo
        })
    }

    useEffect(() => {
        props.getAllMerchants({
            ...paginationAndFilterData,
            userId
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
            { renderMainHeader() }
            { renderFilters() }
            { renderHeaders() }
            {console.log("users : ",props.merchantsList.users)}
            {console.log("merchents : ",props.merchantsList.merchants)}
            { props.merchantsList?.merchants?.length>0
                ? props.merchantsList?.merchants.map((item, i) => renderMerchantCard(item, i))
                : renderNoRecords()
            }
            { props.merchantsList?.totalItems>paginationAndFilterData.size &&
                <Pagination
                    currentPage={props.merchantsList?.page}
                    totalPages={props.merchantsList?.totalPages}
                    getNextPageNumber={gotoPage}
                />
            }
        </div>
    );
}

export default compose(BaseHOC)(MerchantsStore(ListMerchants))
