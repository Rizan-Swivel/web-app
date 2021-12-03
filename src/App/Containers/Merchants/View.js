import React, {useEffect, useRef, useState} from "react";
import "../../assets/styles/main.css";
import { Card } from "../../Components/atoms/Card";
import {useParams, useLocation, Link} from "react-router-dom";
import {compose} from "redux";
import BaseHOC from "../BaseHOC";
import MerchantsStore from "./MerchantsStore";
import {get} from "lodash";
import SimpleList from "../../Components/atoms/List/SimpleList";
import {Typography} from "../../Components/atoms/Typography";
import {ImageComponent} from "../../Components/atoms/ImageComponent";
import image from "../../assets/images/Placeholder.png"
import {Button} from "../../Components/atoms/Button";
import Modal from "react-modal";
import ConfirmModal from "../../Components/atoms/ConfirmModal/ConfirmModal";
import {approvalStatuses, roles} from "../../Utils/constants";

function Edit(props) {
    const { t } = props;
    const { id } = useParams();
    const { state } = useLocation();
    const [merchantBusinessInfo, setMerchantBusinessInfo] = useState();
    const [merchantContactInfo, setMerchantContactInfo] = useState();
    const [merchantSummery, setMerchantSummery] = useState();
    const [merchantId, setMerchantId] = useState(id);

    //confirm modal
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

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalMessage, setModalMessage] = React.useState(null);
    const [modalAction, setModalAction] = React.useState(null);
    const [commentRequired, setCommentRequired] = React.useState(false);

    const openModal = (action) => {

        setModalAction(action)

        switch (action){
            case "approve":
                setModalMessage(t('merchant.areYouSureYouWantToApproveMerchant'))
                setCommentRequired(false)
                break
            case "reject":
                setModalMessage(t('merchant.areYouSureYouWantToRejectMerchant'))
                setCommentRequired(true)
                break
            case "block":
                setModalMessage(t('merchant.areYouSureYouWantToBlockMerchant'))
                setCommentRequired(true)
                break
            case "unblock":
                setModalMessage(t('merchant.areYouSureYouWantToUnblockMerchant'))
                setCommentRequired(false)
                break
        }
        setIsOpen(true);
    }

    const handleModalAction = (resp, comment) => {
        if (resp){
            switch (modalAction){
                case "approve":
                    approveMerchant()
                    break
                case "reject":
                    rejectMerchant(comment)
                    break
                case "block":
                    blockMerchant(comment)
                    break
                case "unblock":
                    unblockMerchant()
                    break
            }
        }
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const approveMerchant = () => {
        props.handleMerchantApproval(
            {
                merchantId:id,
                action: approvalStatuses.approve
            }
        )
    }
    const rejectMerchant = (comment) => {
        props.handleMerchantApproval(
            {
                merchantId: id,
                action: approvalStatuses.reject,
                comment: comment
            }
        )
    }

    const blockMerchant = (comment) => {
        props.handleMerchantBlocking(
            {
                merchantId: id,
                action: approvalStatuses.block,
                comment: comment
            }
        )
    }

    const unblockMerchant = () => {
        props.handleMerchantBlocking(
            {
                merchantId: id,
                action: approvalStatuses.unblock,
            }
        )
    }



    const renderModal = () => {
        return(
            <>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <ConfirmModal
                        closeModal={closeModal}
                        onModalAction={handleModalAction}
                        message={modalMessage}
                        commentRequired={commentRequired}
                        t={t}
                    />
                </Modal>
            </>
        )
    }
    //end confirm modal

    const apiData = {
        merchantId: props.userRole === roles.admin ? id : props.userId,
        userId: props.userId
    }

  console.log("user id :",    props.getBrandsCategoriesMappingByMerchant(props.userId))

    useEffect(() => {
        prepareSummeryDataToRender()
        prepareBusinessDataToRender()
        prepareContactDataToRender()
    },[props.merchantSummery, props.merchant, props.merchantContactInfo, props.merchantBusinessInfo])

    useEffect(() => {
        if (merchantId){
            props.getMerchant(apiData);
            props.getMerchantSummery(apiData);
            props.getBusinessInfoByMerchantId(apiData)
            props.getContactInfoByMerchantId(apiData)
            props.getBrandsCategoriesMappingByMerchant(apiData)
        }else
            setMerchantId(props.userId)
    },[merchantId])

    const prepareSummeryDataToRender = () => {
        {console.log("mapping :",props.brandsCategoriesMapping)}
        const categoriesList = get(props,'brandsCategoriesMapping.categories')
        const brandsList = get(props,'brandsCategoriesMapping.brands')
        console.log("categoriesList",categoriesList)
        console.log("brandsList",brandsList)
        const categories = categoriesList? categoriesList?.reduce((prevVal,currVal,idx)=>{ return idx == 0 ? currVal.name : prevVal + ', ' + currVal.name;},", "):"Not added";
        const brands= brandsList? brandsList?.reduce((prevVal,currVal,idx)=>{return idx == 0 ? currVal.name : prevVal + ', ' + currVal.name;},", "):"Not added";
        {console.log("cat :",categories[1])}
        setMerchantSummery([
            {name: t("common.email"),value: get(props,'merchantSummery.email')},
            {name: t("common.mobile"),value: get(props,'merchantSummery.mobileNo.displayNumber')},
            {name: t("common.status"),value: get(props,'merchantSummery.approvalStatus')},
            {name: t("common.joinedOn"),value:  get(props,'merchantSummery.createdAt.displayDate')} ,
            {name: t("common.lastUpdated"),value: get(props,'merchantSummery.updatedAt.displayDate')},
            {name: t("common.categories"),value: categories},
            {name: t("common.brands"),value: brands},
        ])
    }

    const prepareBusinessDataToRender = () => {         

        setMerchantBusinessInfo([
            {name: t("common.businessName"),value: get(props,'merchantBusinessInfo.businessName')},
            {name: t("common.ownerName"),value: get(props,'merchantBusinessInfo.ownerName')},
            {name: t("common.mobile"),value: 0+get(props,'merchantBusinessInfo.telephone.localNumber')},
            {name: t("merchant.address"),value: get(props,'merchantBusinessInfo.address')},
            {name: t("common.email"),value: get(props,'merchantBusinessInfo.email')},
            {name: t("merchant.businessRegNo"),value: get(props,'merchantBusinessInfo.businessRegNo')},
            {name: t("merchant.webSite"),value: get(props,'merchantBusinessInfo.webSite'), type: "link"},
            {name: t("merchant.facebook"),value: get(props,'merchantBusinessInfo.facebook'), type: "link"},
            {name: t("merchant.instagram"),value: get(props,'merchantBusinessInfo.instagram'), type: "link"},

        ])
    }

    const prepareContactDataToRender = () => {
        setMerchantContactInfo([
            {name: t("merchant.contactPersonName"),value: get(props,'merchantContactInfo.name')},
            {name: t("merchant.contactPersonDesignation"),value: get(props,'merchantContactInfo.designation')},
            {name: t("merchant.contactPersonTelephone"),value: get(props,'merchantContactInfo.telephone.localNumber')},
            {name: t("merchant.contactPersonEmail"),value: get(props,'merchantContactInfo.email')},
        ])
    }

  


    // useEffect(()=>{
    //     prepareSummeryDataToRender();
    // },[props.merchantSummery])

    useEffect(()=>{
        return () => props.resetMerchantState();
    },[])

    const renderBlockButtons = () => {
        return(
            <div className="flex flex-col w-1/2 items-end">
                <div>
                    {
                        get(props,'merchantSummery.approvalStatus') === approvalStatuses.approved &&
                        <Button
                            type="primary"
                            className="mr-2 flex-grow"
                            onClick={()=>openModal("block")}
                        >
                            {t('merchant.block')}
                        </Button>
                    }
                    {    get(props,'merchantSummery.approvalStatus') === approvalStatuses.blocked &&
                    <Button
                        type="primary"
                        className="mr-2 flex-grow"
                        onClick={()=>openModal("unblock")}
                    >
                        {t('merchant.unblock')}
                    </Button>
                    }
                </div>
            </div>
        )
    }

    const renderApproveButtons = () =>{
        return(
            ( state?.action === 'review' &&
                get(props,'merchantSummery.approvalStatus') === approvalStatuses.pending) &&
                    <div className="mb-3 flex items-end mt-4">
                        <div className={"flex"}>
                            <Button
                                type="primary"
                                className="mr-2 flex-grow"
                                onClick={()=>openModal("approve")}
                            >
                                {t('deal.approve')}
                            </Button>
                            <Button
                                type="danger"
                                className="mr-2 flex-grow"
                                onClick={()=>openModal("reject")}
                            >
                                {t('deal.reject')}
                            </Button>
                        </div>
                    </div>
        )
    }

    return (
        <>{props.merchantSummery &&
            <div>
                <div className="w-full h-screen flex ">
                    <div className="w-full  flex flex-col content-center bg-gradient md:bg-transparent md:bg-none">
                        <div className="flex flex-col justify-center text-center md:justify-start  pt-2 md:pt-0 px-2 ">
                            <Card type="primary" size="full" className=" bg-white">
                                <div className="flex justify-between">
                                    <Typography color="primary" type="h1">{get(props,'merchantSummery.fullName')}</Typography>
                                    {
                                        props.userRole !== roles.admin ? 
                                        <div className="flex flex-row items-end">
                                            <Link
                                                to={{
                                                    pathname: "/merchants/edit/"+ props.merchantSummery?.userId,
                                                }}
                                            >
                                                <Button
                                                    type="purpeldark"
                                                    className="mr-2 flex-grow h-11 w-28"
                                                    onClick={() => openModal("reject")}
                                                >
                                                    {t('common.edit')}
                                                </Button>
                                            </Link>
                                        </div>                                        
                                        : null
                                    }
                                </div>
                            </Card>
                            <Card className="flex flex-row bg-white  text-left bg-opacity-75 pb-2 px-4 py-4 md:px-8 mb-4">
                                <div className="flex items-center w-48 mr-8 ">
                                    <ImageComponent image={props.merchantSummery?.imageUrl ? props.merchantSummery?.imageUrl : image} customClasses="rounded-full"/>
                                </div>
                                <div className="flex w-full">
                                    <SimpleList items={merchantSummery} itemClass="pb-1 text-gray-800" labelClass={"w-1/4"} separator={" :"}/>
                                    { props.userRole === roles.admin && renderBlockButtons() }
                                </div>
                            </Card>
                            <Card
                                type="primary"
                                className="bg-white  text-left bg-opacity-75 pb-2 px-4 md:px-8 "
                            >
                                <div  >
                                    <Typography color="primary" type="h4">{t("merchant.business")}</Typography>
                                    <div className="flex items-center w-48 mr-8 ">
                                        {console.log(props.merchantBusinessInfo)}
                                    <ImageComponent image={props.merchantBusinessInfo?.imageUrl ? props.merchantBusinessInfo?.imageUrl : image} customClasses=""/>
                                </div>
                                    <SimpleList items={merchantBusinessInfo} itemClass="py-3 text-gray-800" labelClass={"w-1/4"} separator={""}/>
                                </div>
                                <div  >
                                    <Typography color="primary" type="h4">{t("merchant.contact")}</Typography>
                                    <SimpleList items={merchantContactInfo} itemClass="py-3 text-gray-800" labelClass={"w-1/4"} separator={""}/>
                                </div>
                                { props.userRole === roles.admin && renderApproveButtons() }
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        }
            {renderModal()}
        </>
    );
}
export default compose(BaseHOC)(MerchantsStore(Edit))
