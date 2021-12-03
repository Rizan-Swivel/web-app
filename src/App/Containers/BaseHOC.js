import React, {useEffect} from "react";

const BaseHOC = NewComponent =>
    function Comp(props){

        const { t } = props;
        const baseProps = ()=>({ t })
        return  <NewComponent {...baseProps()}/>

}

export default BaseHOC;