import React, {useEffect, useState} from "react"
import {compose} from "redux";
import BaseHOC from "../../BaseHOC";
import DealsStore from "../DealsStore";
import {Card} from "../../../Components/atoms/Card";
import {Typography} from "../../../Components/atoms/Typography";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {get} from "lodash";
import {Pagination} from "../../../Components/atoms/Pagination";
import {useParams} from "react-router-dom"
import Modal from "react-modal";

const RequestsForCombination = (props) => {
    const {t, userId} = props;
    const {merchantId, categoryId, brandId} = useParams();

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
        merchantId ,
        categoryId,
        brandId
    })

    useEffect(() => {

        props.getDealRequestsListForCombination(
            {...filterParameters,
                userId
            }
        );
        props.getSummeryForDealRequestsListForCombination(
            {...filterParameters,
                userId
            }
        )
    },[filterParameters])

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null)

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = (item) => {
        setSelectedRequest(item)
        setIsOpen(true);
    }
    const customStyles = {
        overlay: {
            backgroundColor: "rgba(0,0,0,.7)",
        },
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            background: "rgba(0,0,0,.7)",
        },
    };

    const viewRequestModal = ()=>{
        return(
            <>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster">
                        <div className="border border-teal-500 shadow-lg modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                            <div className="modal-content py-4 text-left px-6">
                                <div className="flex justify-between items-center pb-3">
                                    <p className="text-2xl font-bold">{t("deal.dealRequest")}</p>
                                    <div className="modal-close cursor-pointer z-50">
                                        <svg
                                            onClick={closeModal}
                                            className="fill-current text-black"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 18 18"
                                        >
                                            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center pb-3" >
                                    <div className="flex flex-col items-baseline border-b w-full">
                                        <div className="flex flex-row w-full mb-2">
                                            <div className="w-4/12">
                                                <Typography color="primary" type="h4">
                                                    {t("deal.requestedOn")}:
                                                </Typography>
                                            </div>
                                            <div className="w-8/12">{(get(selectedRequest,'requestedOn.displayDate')) }</div>
                                        </div>
                                        <div className="flex flex-row w-full mb-2">
                                            <div className="w-4/12">
                                                <Typography color="primary" type="h4">
                                                {t("deal.offerType")}
                                                </Typography>
                                            </div>
                                            <div className="w-8/12">{(get(selectedRequest,'offerType.name')) }</div>
                                        </div>
                                        <div className="flex flex-row w-full mb-2">
                                            <div className="w-4/12">
                                                <Typography color="primary" type="h4">
                                                    {t("deal.user")}:
                                                </Typography>
                                            </div>
                                            <div className="w-8/12">{(get(selectedRequest,'user.name')) }</div>
                                        </div>
                                        <div className="flex flex-row w-full mb-2">
                                            <div className="w-4/12">
                                                <Typography color="primary" type="h4">
                                                    {t("deal.products")}:
                                                </Typography>
                                            </div>
                                            <div className="w-8/12">{(get(selectedRequest,'products')) }</div>
                                        </div>
                                        <div className="flex flex-col">
                                            <Typography color="primary" type="h4">
                                                {t("deal.note")}:
                                            </Typography>
                                            <div className="mt-2">{(get(selectedRequest,'note')) }</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </>
        )
    }

    const renderMainHeader = () =>{
        return(
            <Card type="primary" size="full" className="  mb-2"  >
                <div className="flex justify-between" >
                    <div className=" justify-start">
                        <div className="">
                            <Typography color="primary" type="h1">{t("deal.dealRequests")}</Typography>
                        </div >
                    </div>
                </div>
            </Card>
        );
    }

    const renderHeaders= () =>{
        return(
            <Card type="primary" size="full" className=" bg-white mb-2"  >
                <div className="flex flex-row border-b justify-start">
                    <div className="flex flex-col w-full mt-5">
                        <div className="flex flex-row text-black font-weight: 400 text-sm ">
                            <div className="w-2/12">
                                <Typography color="primary" type="h4">
                                    {t("deal.requestedOn")}
                                </Typography>
                            </div>
                            <div className="w-2/12">
                                <Typography color="primary" type="h4">
                                    {t("deal.offerType")}
                                </Typography>
                            </div>
                            <div className="w-2/12">
                                <Typography color="primary" type="h4">
                                    {t("deal.user")}
                                </Typography>
                            </div>
                            <div className="w-3/12">
                                <Typography color="primary" type="h4">
                                    {t("deal.products")}
                                </Typography>
                            </div>
                            <div className="w-5/12">
                                <Typography color="primary" type="h4">
                                    {t("deal.note")}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

    const renderFilters = (i) => {
        return (
            <Card type="primary" size="full" className=" bg-white ">
                <div className="flex content-start">
                    <div className=" content-start md:w-1/3  relative">
                        <input
                            type="search"
                            onChange={handleChange}
                            className="w-full bg-gray-200 border border-gray-200 text-gray-700 border   -0 p-2 leading-tight rounded-lg"
                            placeholder={t('common.search_by_merchant')}
                        />
                        <div className="absolute inset-y-0 mt-2 right-0 mr-2 text-gray-500">
                            {filterParameters.searchTerm && filterParameters.searchTerm != "NONE" ? null : (
                                <FontAwesomeIcon icon={faSearch} size="lg" />
                            )}
                        </div>
                    </div>
                    <div className=" flex flex-row content-start w-full relative ml-10">
                        <div className="w-4/12">
                            <div className=" flex flex-row "> <Typography color="primary" type="h4">{t("common.merchant")}: &nbsp; </Typography> {get(props,"summeryForDealRequestsListForCombination.merchant.name")}</div>
                            <div className=" flex flex-row "> <Typography color="primary" type="h4">{t("deal.numberOfRequests")}: &nbsp;  </Typography> {get(props,"summeryForDealRequestsListForCombination.noOfRequests")}</div>
                        </div>
                        <div className="w-8/12">
                            <div className=" flex flex-row "><Typography color="primary" type="h4">{t("common.category.title")}: &nbsp;</Typography>{get(props,"summeryForDealRequestsListForCombination.category.name")}</div>
                            <div className=" flex flex-row "><Typography color="primary" type="h4">{t("common.brand.title")}: &nbsp;</Typography>{get(props,"summeryForDealRequestsListForCombination.brand.name")}</div>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

    const renderDealRequest = (item, i) => {
        return (
            <Card key={i} type="primary" size="full" className=" bg-white mb-2 h-24 space-y-2 " >
                <div className="flex flex-row w-full pt-5 cursor-pointer" onClick={()=>openModal(item)}>
                    <div className="flex flex-row items-baseline border-b w-full">
                        <div className="w-2/12">{(get(item,'requestedOn.displayDate')) }</div>
                        <div className="w-2/12">{(get(item,'offerType.name')) }</div>
                        <div className="w-2/12">{(get(item,'user.name')) }</div>
                        <div className="w-3/12">{(get(item,'products')) }</div>
                        <div className="w-5/12">
                            <p className="line-clamp-1"> {(get(item,'note')) }</p>
                        </div>
                    </div>
                </div>
            </Card>
        );
    };

    return (
        <div>
            { renderMainHeader() }
            { renderFilters() }
            { renderHeaders() }
            { viewRequestModal() }
            { props.dealRequestsListForCombination?.requestADeals &&
                props.dealRequestsListForCombination?.requestADeals.map((item,i)=> renderDealRequest(item,i)) }

            { props.dealRequestsListForCombination?.totalItems>filterParameters.size &&
                <Pagination
                    currentPage={props.dealRequestsListForCombination?.page}
                    totalPages={props.dealRequestsListForCombination?.totalPages}
                    getNextPageNumber={gotoPage}
                />
            }
        </div>
    )
}

export default compose(BaseHOC)(DealsStore(RequestsForCombination))