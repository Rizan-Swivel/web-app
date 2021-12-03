import React, { useState, useEffect } from "react";

import "../../assets/styles/main.css";
import {default as ProfileStore} from "./ProfileStore"

import { Button } from "../../Components/atoms/Button";
import { Card } from "../../Components/atoms/Card";
import { Typography } from "../../Components/atoms/Typography";
import { Textfield } from "../../Components/atoms/Textfield";
import BaseHOC from "../BaseHOC";
import {countryCodes } from "../../Utils/constants";
import {compose} from "redux";

const styles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
};

let inputElement = "";

function Profile(props) {
    const { t } = props

    const [picture, setPicture] = useState(null);
    const [fullName, setFullName] = useState(null);
    const [lname, setLname] = useState(null);
    const [email, setEmail] = useState(
        props.profile ? props.profile.email : null
    );
    const [phone, setPhone] = useState(
        props.profile
            ? props.profile.mobileNo.countryCode + props.profile.mobileNo.localNumber
            : null
    );

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        if (props.profile) {
            setTimeout(() => {
                setPicture(props.profile.imageUrl);
                setFullName(props.profile.fullName);
                setEmail(props.profile.email);
                setPhone(props.profile.mobileNo.displayNumber);
            }, 1000);
        } else {
            props.userProfile();
        }

    }, [props.profile]);

    function onUploadClick(e) {
        e.target.value = null;
    }

    function triggerFileUpload() {
        inputElement.click();
    }

    function onDropFile(e) {
        const files = e.target.files;
        // Iterate over all uploaded files
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            readFile(file);
        }
    }

    function readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            // Read the image via FileReader API and save image result in state.
            reader.onload = function (e) {
                // Add the file name to the data URL
                let dataURL = e.target.result;
                dataURL = dataURL.replace(";base64", `;name=${file.name};base64`);
                setPicture(dataURL);
                resolve({ file, dataURL });
            };
            reader.readAsDataURL(file);
        });
    }

    function onTextChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        switch (name) {
            case "fullName":
                setFullName(value);
                break;
            case "phone":
                setPhone(value);
                break;
            case "email":
                setEmail(value)
                break
            default:
        }
    }

    async function onUpdate() {
        if (!fullName || !phone) {
            alert("Required Fields should not be empty");
            return;
        }

        const data = {
            fullName: `${fullName}`,
            email: email,
            mobileNo: {
                countryCode: countryCodes.sriLanka,
                localNumber: phone,
                displayNumber: null,
            },
            imageUrl: picture,
            language: "ENGLISH",
        };

        try {
            await props.updateUserProfile(data);
            alert("Profile Updated Successfully");
        } catch (e) {
            alert(e);
        }
    }

    return (
        <div>{
            props.profile && (
                <div>
                    <Card type="primary" size="full" className="flex bg-white mb-10">
                        <Typography color="primary" type="h1">
                            {t('profile.profile')}
                        </Typography>
                    </Card>
                    <Card type="primary" size="full" className="flex bg-white mb-10">
                        <div className="w-full md:w-1/2">
                            <div className="flex justify-start">
                                <Typography color="primary" type="h1">
                                    {props.profile ? props.profile.fullName : ""}
                                </Typography>
                            </div>
                            <div>
                                <input
                                    style={{ visibility: "hidden" }}
                                    type="file"
                                    id="myFile"
                                    name="filename"
                                    ref={(input) => (inputElement = input)}
                                    onChange={onDropFile}
                                    onClick={onUploadClick}
                                />
                                <div className="flex justify-start">
                                    <Button
                                        onClick={triggerFileUpload}
                                        type="outline"
                                        className="mr-2"
                                    >
                                        {props.profile.imageUrl ? t('profile.change_picture') : t('profile.add_picture')}
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-4">
                                <Textfield
                                    label={t('profile.full_name')}
                                    value={fullName || ""}
                                    name={"fullName"}
                                    placeholder={t('profile.full_name')}
                                    onChange={onTextChange}
                                    type="primary"
                                    size="sm"
                                />
                            </div>
                            <div className="mt-4">
                                <Textfield
                                    label={t('profile.email')}
                                    disabled={true}
                                    value={email || ""}
                                    placeholder={t('profile.email')}
                                    type="primary"
                                    size="sm"
                                    name="email"
                                    onChange={onTextChange}
                                />
                            </div>
                            <div className="mt-4">
                                <Textfield
                                    label={t('profile.mobile_number')}
                                    value={phone || ""}
                                    name={"phone"}
                                    placeholder={t('profile.mobile_number')}
                                    onChange={onTextChange}
                                    type="primary"
                                    size="sm"
                                />
                            </div>
                            <div className="mt-4">
                                <Textfield
                                    label={t('profile.address_1')}
                                    placeholder={t('profile.address_1')}
                                    type="primary"
                                    size="sm"
                                />
                            </div>
                            <div className="mt-4">
                                <Textfield
                                    label={t('profile.address_2')}
                                    placeholder={t('profile.address_2')}
                                    type="primary"
                                    size="sm"
                                ></Textfield>
                            </div>
                            <div className="mt-4">
                                <Textfield
                                    label={t('profile.zip_code')}
                                    placeholder={t('profile.zip_code')}
                                    type="primary"
                                    size="sm"
                                ></Textfield>
                            </div>

                            <div className="flex mt-8">
                                <Button
                                    type="primary"
                                    className="mr-2 flex-grow"
                                    onClick={onUpdate}
                                >
                                    {t('profile.save')}
                                </Button>
                                <Button type="danger" className="ml-2 flex-grow">
                                    {t('profile.cancel')}
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )
        }
        <div>adfdfdsfdf</div>
        </div>

    );
}

export default compose(BaseHOC)(ProfileStore(Profile));
