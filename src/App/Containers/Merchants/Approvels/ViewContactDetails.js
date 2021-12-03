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

const ViewContactDetails = (props) =>{
    const { t } = props;
    const { id } = useParams();
    const { state } = useLocation();
    const [merchant, setContact] = useState();
    const [merchantBusinessInfo, setMerchantContactInfo] = useState();
    const [contactId, setMerchantId] = useState(id);

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
                setModalMessage(t('merchant.areYouSureYouWantToApproveContactUpdate'))
                setCommentRequired(false)
                break
            case "reject":
                setModalMessage(t('merchant.areYouSureYouWantToRejectContactUpdate'))
                setCommentRequired(true)
                break         
        }
        setIsOpen(true);
    }

    const handleModalAction = (resp, comment) => {
        if (resp){
            switch (modalAction){
                case "approve":
                    approveContact()
                    break
                case "reject":
                    rejectContact(comment)
                    break             
            }
        }
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const approveContact = () => {
        props.approvePendingContactInfo(
            {
                id:id,               
                action: approvalStatuses.approve
            }
        )
    }
    const rejectContact = (comment) => {
        props.approvePendingContactInfo(
            {
                contactId: id,
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
        contactId: props.userRole === roles.admin ? id : props.userId,
        userId: props.userId
    }

    useEffect(() => {
        if (contactId){
            props.getPendingContactDetails(apiData);
           
        }else
            setMerchantId(props.userId)
    },[contactId])

    const prepareContactDataToRender = () => {     

        setMerchantContactInfo([
            {name: t("common.name"),value: get(props,'PendingContactData.name')}, 
            {name: t("common.email"),value: get(props,'PendingContactData.email')},
            {name: t("merchant.designation"),value: get(props,'PendingContactData.designation')} ,          
            {name: t("merchant.tel"),value: get(props,'PendingContactData.telephone.displayNumber')},                                  
        ])
    }
    useEffect(() => {
        setContact({
            ...props.PendingContactData,   
        })
        prepareContactDataToRender()  
    },[props.PendingContactData])

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
                                    <Typography color="primary" type="h4">Contact Details</Typography>
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
export default compose(BaseHOC)(MerchantsStore(ViewContactDetails))
