import React, {useEffect, useRef, useState} from "react";
import "../../../assets/styles/main.css";
import { Card } from "../../../Components/atoms/Card";
import { compose } from "redux";
import BaseHOC from "../../BaseHOC";
import MerchantsStore from "../MerchantsStore";
import BusinessInfoEdit from "./BusinessInfoEdit";
import ContactInfoEdit from "./ContactInfoEdit";
import { Typography } from "../../../Components/atoms/Typography";
import BasicInfoEdit from "./BasicInfoEdit";
import CredentialsUpdate from "./CredentialsUpdate";

function Edit(props) {
    const { t } = props;
    const [openTab, setOpenTab] = useState(1);

    useEffect(()=>{
        return () => props.resetMerchantState();
    },[])

    return (
        <>{
            <div>
                <Card type="primary" size="full" className=" bg-white mb-2">
                    <div className="flex justify-between">
                        <div className="flex justify-start">
                            <Typography color="secondary" type="h3">{t("merchant.editMerchant")}</Typography>
                        </div>
                    </div>
                    <BasicInfoEdit {...props}/>
                </Card>
                <div className="w-full h-screen flex ">
                    <div className="w-full  flex flex-col content-center bg-gradient md:bg-white md:bg-none">
                        <div className="flex flex-col justify-center text-center md:justify-start  pt-2 md:pt-0 px-2 ">
                            <Card
                                type="primary"
                                className="bg-white  text-left bg-opacity-75 pb-2 px-4 md:px-8"
                            >
                                <div className={"flex justify-start"}>
                                    <div className={"px-2 py-2 cursor-pointer" + ((openTab==1)?" border-b-2 border-opacity-30 border-gray-400":"")} onClick={e => {
                                            e.preventDefault();
                                            setOpenTab(1);
                                        }}>
                                        <Typography color="secondary" type="h4">{t("merchant.business")}</Typography>
                                    </div>
                                    <div className={"px-2 py-2 cursor-pointer" + ((openTab==2)?" border-b-2 border-opacity-30 border-gray-400":"")} onClick={e => {
                                            e.preventDefault();
                                            setOpenTab(2);
                                        }}>
                                        <Typography color="secondary" type="h4">{t("merchant.contact")}</Typography>
                                    </div>
                                    <div className={"px-2 py-2 cursor-pointer" + ((openTab==3)?" border-b-2 border-opacity-30 border-gray-400":"")} onClick={e => {
                                        e.preventDefault();
                                        setOpenTab(3);
                                    }}>
                                        <Typography color="secondary" type="h4">{t("common.credentials")}</Typography>
                                    </div>
                                </div>
                                <div  className={openTab === 1 ? "block" : "hidden"}>
                                    <BusinessInfoEdit {...props} />
                                </div>
                                <div  className={openTab === 2 ? "block" : "hidden"}>
                                    <ContactInfoEdit {...props}/>
                                </div>
                                <div  className={openTab === 3 ? "block" : "hidden"}>
                                    <CredentialsUpdate {...props}/>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    );
}
export default compose(BaseHOC)(MerchantsStore(Edit))
