import React, {useEffect, useRef, useState} from "react";
import "../../../assets/styles/main.css";
import { Card } from "../../../Components/atoms/Card";
import { useParams, useLocation } from "react-router-dom";
import {compose} from "redux";
import BaseHOC from "../../BaseHOC";
import MerchantsStore from "../MerchantsStore";
import {get} from "lodash"
import SimpleList from "../../../Components/atoms/List/SimpleList";
import {Typography} from "../../../Components/atoms/Typography";
import {Button} from "../../../Components/atoms/Button";
import Modal from "react-modal";
import ConfirmModal from "../../../Components/atoms/ConfirmModal/ConfirmModal";
import {approvalStatuses, roles} from "../../../Utils/constants";

const ViewBusinessProfile = (props) =>{
    const { t } = props;
    const { id } = useParams();
    const { state } = useLocation();
    const [merchant, setMerchant] = useState();
    const [merchantBusinessInfo, setMerchantBusinessInfo] = useState();
    const [businessId, setMerchantId] = useState(id);

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
                setModalMessage(t('merchant.areYouSureYouWantToApproveUpdate'))
                setCommentRequired(false)
                break
            case "reject":
                setModalMessage(t('merchant.areYouSureYouWantToRejectUpdate'))
                setCommentRequired(true)
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
            }
        }
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const approveMerchant = () => {
        props.approvePendingBusinessInfo(
            {
                id:id,               
                action: approvalStatuses.approve
            }
        )
    }
    const rejectMerchant = (comment) => {
        props.approvePendingBusinessInfo(
            {
                businessId: id,
                action: approvalStatuses.reject,
                comment: comment
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
        businessId: props.userRole === roles.admin ? id : props.userId,
        userId: props.userId
    }

    useEffect(() => {
        if (businessId){
            props.getPendingBusinessDetails(apiData);
           
        }else
            setMerchantId(props.userId)
    },[businessId])

    const prepareBusinessDataToRender = () => {     

        setMerchantBusinessInfo([
            {name: t("common.email"),value: get(props,'pendingBusinessData.email')},          
            {name: t("merchant.tel"),value: get(props,'pendingBusinessData.telephone.displayNumber')},
            {name: t("merchant.address"),value: get(props,'pendingBusinessData.address')},
            {name: t("merchant.businessRegNo"),value: get(props,'merchant.businessRegNo')},
            {name: t("merchant.webSite"),value: get(props,'pendingBusinessData.webSite'), type: "link"},
            {name: t("merchant.facebook"),value: get(props,'pendingBusinessData.facebook'), type: "link"},
            {name: t("merchant.instagram"),value: get(props,'pendingBusinessData.instagram'), type: "link"},      
        ])
    }
    useEffect(() => {
        setMerchant({
            ...props.pendingBusinessData,   
        })
        prepareBusinessDataToRender()  
    },[props.pendingBusinessData])

    const renderApproveButtons = () =>{
        return(
           
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
        <>{merchant &&
            <div>
                <div className="w-full h-screen flex ">
                    <div className="w-full  flex flex-col content-center bg-gradient md:bg-transparent md:bg-none">
                        <div className="flex flex-col justify-center text-center md:justify-start  pt-2 md:pt-0 px-2 ">  
                            <Card
                                type="primary"
                                className="bg-white  text-left bg-opacity-75 pb-2 px-4 md:px-8 "
                            >
                                <div  >
                                    <Typography color="primary" type="h4">Business Profile</Typography>
                                    <SimpleList items={merchantBusinessInfo} itemClass="py-3 text-gray-800" labelClass={"w-1/4"} separator={""}/>
                                </div>
                                { renderApproveButtons() }
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
export default compose(BaseHOC)(MerchantsStore(ViewBusinessProfile))
