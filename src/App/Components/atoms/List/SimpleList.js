import React from "react";
import {get} from "lodash";
import {Typography} from "../Typography";
import {ucFirst} from "../../../Utils/helpers";

const SimpleList = ({items, itemClass, labelClass, separator}) =>{

    const renderItem = (item,k) => {
        return (
            <div key={k}  className={`flex flex-row ${itemClass}`}>
                <div className={`w-1/2 ${labelClass}`}>
                    <span className="text-sm">{get(item, 'name')}{separator}</span>
                </div>
                {
                    item.type === "link" &&
                    <Typography color="secondary">
                        <a href={get(item,'value')}><p className={"text-sm"}>{get(item,'value') }</p></a>
                    </Typography>

                }
                {
                    typeof item.type == "undefined" &&
                    <div className={""}>
                        <div className={""}> <p className={"text-sm"}>{get(item,'value')}</p></div>
                    </div>
                }
            </div>
        )
    }

    return (
        <>
            <div className={"flex flex-col w-full" }>
                {items && items.map((item,k) => renderItem(item,k))}
            </div>
        </>
    )
}

export default SimpleList;