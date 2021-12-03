import React, {useEffect, useState} from "react";
import { compose } from "redux";
import BaseHOC from "../BaseHOC";
import DealsStore from "./DealsStore";
import { useParams } from "react-router-dom"
import {Typography} from "../../Components/atoms/Typography";
import {Card} from "../../Components/atoms/Card";
import {get} from "lodash"
import {Button} from "../../Components/atoms/Button";
import Modal from "react-modal";
import ConfirmModal from "../../Components/atoms/ConfirmModal/ConfirmModal";
import {approvalStatuses, roles} from "../../Utils/constants";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";


Modal.setAppElement("#root");

const View = (props) => {
    const { deal, t } = props;
    const {id} = useParams();
    const [canDelete, setCanDelete ] = useState(false);
    const [canApprove, setCanApprove ] = useState(false);

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

    const openModal = (action) => {

        setModalAction(action)

        switch (action){
            case "delete":
                setModalMessage(t('deal.areYouSureYouWantToDeleteDeal'))
                break
            case "approve":
                setModalMessage(t('deal.areYouSureYouWantToRejectDeal'))
                break
            case "reject":
                setModalMessage(t('deal.areYouSureYouWantToApproveDeal'))
                break
        }

        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const deleteDeal = () => {
        props.deleteDeal({dealId:id,merchantId: props.userId})
    }

    const handleModalAction = (resp) => {

        if (resp){
            switch (modalAction){
                case "delete":
                    deleteDeal()
                    break
                case "approve":
                    approveDeal()
                    break
                case "reject":
                    rejectDeal()
                    break
            }
        }
        closeModal()
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
                        t={t}
                    />
                </Modal>
            </>
        )
    }

    //end confirm modal
    const [brands, setBrands] = useState("")
    const [categories,setCategories] = useState("")

    useEffect(()=>{
        props.getDeal({
            dealId: id,
            userId: props.userId
        });

        if (deal.brands?.length>0){
            let brandsList = deal.brands?.reduce((prevVal,currVal,idx)=>{return idx == 0 ? currVal.name : prevVal + ', ' + currVal.name;},", ");
            setBrands(brandsList)
        }

        if (deal.categories?.length>0){
            let categoriesList = deal.categories?.reduce((prevVal,currVal,idx)=>{return idx == 0 ? currVal.name : prevVal + ', ' + currVal.name;},", ");
            setCategories(categoriesList)
        }
    },[props.actionSuccess])

    useEffect(()=>{
        const approvalStatus = get(deal,"approvalStatus")

        if (approvalStatus === approvalStatuses.pending && props.userRole === roles.merchant){
            setCanDelete(true)
        }else {
            setCanDelete(false)
        }
        if (approvalStatus === approvalStatuses.pending && props.userRole === roles.admin){
            setCanApprove(true)
        }else {
            setCanApprove(false)
        }
        setAllImagesToRender()
    },[deal])

    const approveDeal = () => {
        const payload = {
            "id": id,
            "approvalStatus": approvalStatuses.approved
        }
        props.handleDealApproval(payload)
    }

    const rejectDeal = () => {
        const payload = {
            "id": id,
            "approvalStatus": approvalStatuses.rejected,
            "comment": "no comment"
        }
        props.handleDealApproval(payload)
    }

    const [allImages,setAllImages] = useState([])

    const setAllImagesToRender = () => {
        setAllImages([])
        if(deal.coverImage){
            setAllImages((prevState)=>([
                ...prevState,
                {   original: deal.coverImage,
                    thumbnail: deal.coverImage,
                    description: "Cover image"
                }
            ]))
        }
        if (deal.imageUrls?.length>0){
            const images = deal.imageUrls.map(image =>(
                {
                    original: image,
                    thumbnail: image
                }
            ))

            setAllImages((prevState)=>([
                    ...prevState,
                    ...images
            ]))
        }
    }

    useEffect(()=>{
        return () => props.resetDealsState();
    },[])

    return (
        <>
        {deal &&
            <div>
                <div className="flex justify-center bg-white">
                    <div className="w-full  m-8 mb-8 mt-8 border-l border-r ">
                        <Card type="primary" size="full" className=" bg-white ">
                            <div className="flex justify-between">
                                <div className="-ml-3 ">
                                    <Typography className="text-gray-800" color="primary" type="h3">{get(deal,'title') }</Typography>
                                </div>
                                <div className={"flex"}>
                                    {
                                        canDelete &&
                                        <Button
                                            type="purpeldark"
                                            className="mr-2 flex-grow"
                                            onClick={()=>openModal("delete")}
                                        >
                                            {t('common.delete')}
                                        </Button>
                                    }
                                </div>
                            </div>
                        </Card>
                        <div className="flex items-justify">
                            <div>
                                <i className="fas fa-arrow-left text-blue-400 text-lg"/>
                            </div>
                        </div>
                        <div className=" " >
                            {allImages.length>0 && <ImageGallery
                                items={allImages}
                                showThumbnails={true}
                                thumbnailPosition={"right"}
                                showFullscreenButton={false}
                                showPlayButton={false}
                                showNav={false}
                            />}
                        </div>

                        <div className="flex flex-row bg-gray-100 p-4 mt-4 ">
                            <div className="flex flex-col w-1/2">
                                    <div className=" flex items-center mb-3">
                                        <span className="font-bold text-base text-gray-800">{t("deal.subTitle")}:  </span>
                                        <p className=" mb-1v  text-gray-800">{ get(deal,'subTitle')}</p>
                                    </div>
                                    <div className=" flex items-center mb-3">
                                        <span className="font-bold text-base text-gray-800">{t("common.description")}:</span>
                                        <p>{ (deal,'description')}</p>
                                    </div>
                                    <div className="mb-3 flex items-center">
                                        <span className="font-bold text-base text-gray-800">{t("deal.brands")}: </span>
                                        <p className="ml-2 font-normal text-gray-800"> { brands }</p>
                                    </div>
                                    <div className=" flex items-center mb-3">
                                        <span className="font-bold text-base text-gray-800">{t("common.categories")}: </span>
                                        <p className="ml-2 font-normal text-gray-800"> { categories }</p>
                                    </div>
                                    <div className="flex items-center mb-3">
                                        <span className="font-bold text-base text-gray-800">{t("merchant.validityPeriod")}: </span>
                                        <p className="ml-2 font-normal text-gray-800">{(get(deal,'validFrom.displayDate'))} - {( get(deal,'expiredOn.displayDate'))}</p>
                                    </div>
                                    <div className="flex ">
                                        <span className="font-bold text-gray-800">{t("merchant.termsAndConditions")}: </span>
                                        <p className="font-normal ml-2 text-gray-800" >{get(deal,'termsAndConditions')}</p>
                                    </div>

                            </div>
                            <div className="flex flex-col w-1/2 ">
                            {console.log("deductionPercentage: ", props.deal.deductionType)}

                            {props.deal.deductionType=="AMOUNT" ? 
                              <div className="mb-3 flex items-center">
                              <i className="fas fa-map-marker-alt"></i>
                              <span className="font-bold text-gray-800">{t("merchant.deductionAmount")}: </span>                                   
                              <p className="ml-2 font-normal text-gray-800">{get(deal, 'deductionAmount')}</p>
                              </div>                         
                                                      
                            : null }
                             
                            {props.deal.deductionType=="PERCENTAGE" ? 
                            <div className="mb-3 flex items-center">
                                <i className="fas fa-link"></i>
                                <span className="font-bold text-gray-800">{t("merchant.deductionPercentage")}: </span>
                                <p className="ml-2 font-normal text-gray-800">{get(deal, 'deductionPercentage')}</p>
                            </div> 
                            
                            : null}

                                <div className="mb-3 flex items-center">
                                    <i className="fas fa-calendar-alt"></i>
                                    <span className="font-bold text-gray-800">{t("merchant.deductionType")}: </span>
                                    <p className="ml-2 font-normal text-gray-800">{get(deal,'deductionType')}</p>
                                </div>
                                <div className="mb-3 flex items-center">
                                    <span className="font-bold text-gray-800">{t("merchant.quantity")}: </span>
                                    <p className="ml-3 cursor-pointer hover:underline font-normal text-gray-800">{get(deal,'totalQuantity')}</p>
                                </div>
                                <div className="mb-3 flex items-center">
                                    <span className="font-bold text-gray-800">{t("deal.remainingQuantity")}: </span>
                                    <p className="ml-3 cursor-pointer hover:underline font-normal text-gray-800">{get(deal,'remainingQuantity')}</p>
                                </div>
                                <div className="mb-3 flex items-center">
                                    <span className="font-bold text-gray-800">{t("merchant.approval")}: </span>
                                    <p className="ml-2 font-normal text-gray-800">{ get(deal,'approvalStatus') }</p>
                                </div>
                            </div>
                        </div>

                        { canApprove &&
                                <div className="mb-3 flex items-end bg-gray-100 pb-4">
                                    <div className="w-1/2"></div>
                                    <div className={"flex w-1/2"}>
                                        <Button
                                            type="purpel"
                                            className="mr-2 flex-grow h-11 w-28"
                                            onClick={()=>openModal("approve")}
                                        >
                                            {t('deal.approve')}
                                        </Button>
                                        <Button
                                            type="purpeldark"
                                            className="mr-2 flex-grow h-11 w-28"
                                            onClick={()=>openModal("reject")}
                                        >
                                            {t('deal.reject')}
                                        </Button>
                                    </div>
                                </div>
                        }
                        {renderModal()}
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default compose(BaseHOC)(DealsStore(View))