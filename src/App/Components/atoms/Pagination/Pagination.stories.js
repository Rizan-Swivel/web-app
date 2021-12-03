import React, {useEffect} from "react";

import { Pagination } from "../Pagination";
import "../../../assets/styles/main.css";

export default {
  title: "Pagination",
  component: Pagination,
};


export const showcase = () => {


    let page = 1;

    const getPage=(nextPage)=>{
        page = nextPage;
    }

   const props = {
     totalItems: 24,
     totalPages: 10,
     currentPage: page,
     itemsPerPage: 2,
       getNextPageNumber: getPage
   }
   return(<Pagination {...props }/>)
};
