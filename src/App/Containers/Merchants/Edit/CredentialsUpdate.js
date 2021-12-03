import React from 'react'
import {Card} from "../../../Components/atoms/Card";
import PasswordChange from "./PasswordChange";
import UsernameChange from "./UsernameChange";

const CredentialsUpdate = (props) => {
    return(

            <div className="flex flex-row">
                <div className="w-1/2 ">
                    <PasswordChange {...props}/>
                </div>
                <div className="w-1/2 ">
                    <UsernameChange {...props}/>
                </div>
            </div>

    )
}

export default CredentialsUpdate;

