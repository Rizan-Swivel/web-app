import React, {useEffect, useState} from "react"
import {compose} from "redux";
import BaseHOC from "../../BaseHOC";
import DealsStore from "../DealsStore";
import {Card} from "../../../Components/atoms/Card";
import {Typography} from "../../../Components/atoms/Typography";
import {Link} from "react-router-dom";
import {get} from "lodash";
import {Pagination} from "../../../Components/atoms/Pagination";

const AddOfferType = (props) => {
    const {t, userId} = props;

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

        props.getAllOfferTypes(
            {
                ...filterParameters,
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
                            <Typography color="primary" type="h1">{t("deal.offerTypesList")}</Typography>
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
                    <div className="flex flex-col w-5/6 mt-5">
                        <div className="flex flex-row text-black font-weight: 400 text-sm ">
                            <div className="w-full">
                                <Typography color="primary" type="h4">
                                    {t("common.user.name")}
                                </Typography>

                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

    const renderOfferType = (item, i) => {
        return (
            <Card key={i} type="primary" size="full" className=" bg-white mb-2 h-24 space-y-2 ">
                <div className="flex flex-row w-full pt-4">
                    <div className="flex flex-row items-baseline border-b w-full">
                        <div className="w-1/3">{(get(item,'name')) }</div>
                    </div>
                </div>
            </Card>
        );
    };

    return (
        <div>
            { renderMainHeader() }
            { renderHeaders() }
            { props.offerTypesList.offerTypes &&
                props.offerTypesList.offerTypes.map((deal,i)=> renderOfferType(deal,i)) }
            { props.offerTypesList?.totalItems>filterParameters.size &&
                <Pagination
                    currentPage={props.offerTypesList?.page}
                    totalPages={props.offerTypesList?.totalPages}
                    getNextPageNumber={gotoPage}
                />
            }
        </div>
    )
}

export default compose(BaseHOC)(DealsStore(AddOfferType))