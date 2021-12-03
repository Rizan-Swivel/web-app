import React, {useEffect, useState} from 'react'
import {Card} from "../../../../Components/atoms/Card";
import {Typography} from "../../../../Components/atoms/Typography";
import {compose} from "redux";
import BaseHOC from "../../../BaseHOC";
import ReportStore from "../../ReportStore";
import {get} from "lodash";
import {ucFirst} from "../../../../Utils/helpers";
import Select from "../../../../Components/atoms/MultiSelect/Select";
import moment from "moment";
import * as yup from "yup";
import {roles, timeDurations} from "../../../../Utils/constants";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {DateField} from "../../../../Components/atoms/Date";
import {Button} from "../../../../Components/atoms/Button";
import Modal from "react-modal";
import AudienceReachDetailReportForDeal from "./AudienceReachDetailReportForDeal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import image from "../../../../assets/images/Placeholder.png";
import { Pagination } from "../../../../Components/atoms/Pagination";


const DealsAudienceReachSummeryReport = (props) => {
    const { t, userId } = props;
    const [initialPaginationAndFilterData] = useState({
        page: 0,
        size: 250,
      //  searchTerm: 'ALL'
       option: props.option,
       startDate: props.startDate,
       endDate: props.endDate,
    })

    const [paginationAndFilterData, setPaginationAndFilterData] = useState(initialPaginationAndFilterData);
    

    const gotoPage = (pageNo) => {
        setPaginationAndFilterData({
          ...paginationAndFilterData,
            page: pageNo,
        });
      }; 

    const schema = yup.object().shape({
        option: yup.string().required().nullable()
            .transform(value => (value ? value.value : null))
            .label(t("reports.duration")),
        startDate: yup.date().required().label(t("common.startDate")),
        endDate: yup.date()
            .min(yup.ref('startDate'),t("deal.dealsCannotExpireBeforeStart"))
            .required().label(t("common.endDate")),
    });

    const { register, handleSubmit,formState:{ errors }, getValues, control, watch } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });

    const onSubmit = data => {
        props.getAudienceReachSummeryReportForDeals({
            ...data,
            ...paginationAndFilterData,
            userId,
            startDate: moment().valueOf(data.startDate),
            endDate: moment().valueOf(data.endDate),
            merchantId: props.userRole === roles.admin ? "ALL" : userId
        })
    }

    const [timeDurationsList] = useState([
        {value: timeDurations.daily, label: t("reports.daily")},
        {value: timeDurations.weekly, label: t("reports.weekly")},
        {value: timeDurations.monthly, label: t("reports.monthly")},       
        {value: timeDurations.yearly, label: t("reports.yearly")},
    ])

    const renderFilters = () => {
        return (
            <Card type="primary" size="full" className=" bg-white mb-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex content-start">
                        <div className=" flex flex-col mt-5 mr-5 w-3/12">
                            <Select
                                name={"option"}
                                label={t("Option")}
                                error={errors.option?.message}
                                isMulti={false}
                                options={timeDurationsList}
                                defaultValue={{value: timeDurations.weekly, label: t("reports.weekly")}}
                                controlObject={control}
                                required={true}
                            />
                        </div>
                        <div className=" flex flex-col mt-5 mr-5 w-3/12">
                            <DateField
                                type={ errors.startDate?"red": "primary"}
                                size="sm"
                                name={"startDate"}
                                label={ t("common.startDate")}
                                error={errors.startDate?.message}
                                required={true}
                                hookFormControlObject={control}
                                defaultValue={moment("11-01-2021", "MM-DD-YYYY").toDate()}
                            />
                        </div>
                        <div className=" flex flex-col mt-5 mr-5 w-3/12">
                            <DateField
                                type={ errors.endDate?"red": "primary"}
                                size="sm"
                                name={"endDate"}
                                label={ t("common.endDate")}
                                error={errors.endDate?.message}
                                required={true}
                                hookFormControlObject={control}
                                defaultValue={moment().toDate()}
                            />
                        </div>
                        <div>
                            <div className="flex flex-row justify-end">
                                <Button
                                    type="purpeldark"
                                    className="mb-2 "
                                >
                                    {t('common.submit')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </Card>
        )
    }

    const renderHeader = () =>{
        return(
            <Card type="primary" size="full" className=" bg-white mb-2">
                <div className="flex-grow border-b py-1">
                    <div className="flex">
                    <div className="w-4/12">
                            <Typography color="primary" type="h4">
                                {" "}
                            </Typography>
                        </div>
                        <div className="w-4/12">
                            <Typography color="primary" type="h4">
                                {t('deal.deal')}
                            </Typography>
                        </div>
                        <div className="w-4/12">
                            <Typography color="primary" type="h4">
                                {t('reports.viewsCount')}
                            </Typography>
                        </div>
                    </div>
                   
                </div>
            </Card>
        )
    }

    const renderDeal =(item, i)=>{
        return(
            <Card key={i} type="primary" size="full" className=" bg-white mb-2 h-24 space-y-2 " >
                    <div className="flex flex-row border-b cursor-pointer" onClick={openModal}>
                    <div className="w-4/12">
                            <div>
                                <img
                                    className="w-16 h-16 rounded-full object-cover mr-4 shadow"
                                    src={item.deal.coverImage ? item.deal.coverImage : image}
                                    alt="avatar"
                                />
                          </div>
                        </div>
                        <div className="w-4/12">
                            <div> { ucFirst(get(item,'deal.title') ) }</div>
                        </div>
                        <div className="w-4/12">
                            <div> {(get(item,'totalViewCount'))}</div>
                        </div>
                    </div>
            </Card>
        )
    }
 

    useEffect(()=>{
        return () => props.resetDealsState();
    },[])

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

    const { startDate, endDate, option } = getValues()

    const renderModal = () => {
        return( <>
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
                                <p className="text-2xl font-bold">{t("reports.modal11Title")}</p>
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
                            <AudienceReachDetailReportForDeal startDate={startDate} endDate={endDate} option={option} />
                        </div>
                    </div>
                </div>
            </Modal>
        </>)
    }

    const [modalIsOpen, setModalIsOpen] = useState(false)

    const openModal = () => {
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }

    return(
        <div>
            { renderFilters() }
            { renderHeader() }
            { renderModal() }
            { props.audienceReachSummeryReportForDeals?.views?.map((item, key)=>renderDeal(item, key)) }
            {props.audienceReachSummeryReportForDeals?.totalItems>paginationAndFilterData.size && (
            <Pagination
                currentPage={props.audienceReachSummeryReportForDeals?.page}
                totalPages={props.audienceReachSummeryReportForDeals?.totalPages}
                getNextPageNumber={gotoPage}
            />
      )}
        </div>
    )
}

export default compose(BaseHOC)(ReportStore(DealsAudienceReachSummeryReport))
