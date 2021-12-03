import React from 'react';

import { Icon } from "../Icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { Typography } from "../Typography";
import "../../../assets/styles/main.css";

export default {
    title: 'Icon',
    component: Icon,
};

export const showcase = () =>
    <div className="px-12 py-8">

        <div className="pt-4">
            <Typography color="primary" type="h1">
                Icon usage sizes
            </Typography>

            <div className="flex justify-left flex-col mt-2">
                <FontAwesomeIcon icon={faCoffee} size="xs" />
                <FontAwesomeIcon icon={faCoffee} size="lg" />
                <FontAwesomeIcon icon={faCoffee} size="6x" />
            </div>
        </div>

        <div className="pt-8">
            <Typography color="primary" type="h1">
                Fixed-Width Icons
            </Typography>

            <div className="flex justify-left flex-col mt-2">
                <FontAwesomeIcon icon={faCoffee} fixedWidth />
            </div>
        </div>

        <div className="pt-8">
            <Typography color="primary" type="h1">
                Color Icons
            </Typography>

            <div className="flex justify-left flex-col mt-2">
                <FontAwesomeIcon icon={faCoffee} color="red" />
            </div>
        </div>

        <div className="pt-8">
            <Typography color="primary" type="h1">
                Rotating Icons
            </Typography>

            <div className="flex justify-left flex-col mt-2">
                <FontAwesomeIcon icon={faCoffee} rotation={90} />
                <FontAwesomeIcon icon={faCoffee} rotation={180} />
                <FontAwesomeIcon icon={faCoffee} rotation={270} />
            </div>
        </div>

        <div className="pt-8">
            <Typography color="primary" type="h1">
                Flip horizontally, vertically, or both
            </Typography>

            <div className="flex justify-left flex-col mt-2">
                <FontAwesomeIcon icon={faCoffee} flip="horizontal" />
                <FontAwesomeIcon icon={faCoffee} flip="vertical" />
                <FontAwesomeIcon icon={faCoffee} flip="both" />
            </div>
        </div>
        
        <div className="pt-8">
            <Typography color="primary" type="h1">
                Animating Icons
            </Typography>

            <div className="flex justify-left flex-col mt-2">
                <FontAwesomeIcon icon={faCoffee} spin />
            </div>
        </div>

        <div className="pt-8">
            <Typography color="primary" type="h1">
                Bordered Icons
            </Typography>

            <div className="flex justify-left flex-col mt-2">
                <FontAwesomeIcon icon={faCoffee} size="lg" border />
            </div>
        </div>


    </div>
    ;


