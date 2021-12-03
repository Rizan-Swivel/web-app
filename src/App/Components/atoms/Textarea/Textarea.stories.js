import React from 'react';

import { Textarea } from "../Textarea";
import "../../../assets/styles/main.css";

export default {
    title: 'Textarea',
    component: Textarea,
};

export const showcase = () =>
    <div>
        <div className="flex flex-col p-12">
            <div>
                <Textarea
                    size="sm"
                    type="primary"
                    label="Title goes here"
                    placeHolder="Enter Placeholder"
                    error={"Please Enter a value"}
                />
            </div>

            <div className="py-12">
                <Textarea
                    size="sm"
                    type="red"
                    label="Title goes here"
                    placeHolder="Enter Placeholder"
                    error={"Please Enter a value"}
                />
            </div>

            <div>
                <Textarea
                    size="sm"
                    type="green"
                    label="Title goes here"
                    placeHolder="Enter Placeholder"
                    error={"Please Enter a value"}
                />
            </div>
        </div>
    </div>
;