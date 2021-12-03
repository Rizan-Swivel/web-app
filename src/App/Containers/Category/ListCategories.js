import React, { useEffect, useState } from "react";
import { Card } from "../../Components/atoms/Card";
import { compose } from "redux";
import BaseHOC from "../BaseHOC";
import CategoryStore from "./CategoryStore";
import { Typography } from "../../Components/atoms/Typography";
import { Pagination } from "../../Components/atoms/Pagination";
import image from "../../assets/images/Placeholder.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {get} from "lodash";
import {Spinner} from "../../Components/atoms/Spinner";

const ListCategories = (props) => {
  const { t } = props;
  
  const renderCategories = (category, i) => {
    return (
        <Card key={i} type="primary" size="full" className=" bg-white mb-2 h-24 space-y-2 ">
            <Link
                to={{
                      pathname: "/categories/view/" + category.id,
                }}     
             >
                <div className="flex flex-row border-b ">
                      <div className="flex flex-col w-1/6">
                          <img
                            className="w-16 h-16 rounded-full object-cover mr-4 shadow"
                            src={category.imageUrl ? category.imageUrl : image}
                            alt="avatar"
                          />
                      </div>     
                      <div className="flex-row">
                          <div className="grid grid-cols-1 gap-2 text-black Noto Sans font-weight: 400 text-sm mt-1">
                              <div>{ get(category,'name')}</div> 
                          </div>
                      </div>
                </div>           
            </Link>
        </Card>
    );
  };

  const renderHeader = () =>{
    return(
      <Card type="primary" size="full" className=" bg-white mb-2">
        <div className="flex flex-row border-b ">
          <div className="flex flex-col w-1/6">
            <Typography color="primary" type="h4">
               {t("category.icon")}
            </Typography>
          </div>
          <div className="flex flex-col w-5/6">
            <div className="flex-row">
              <div className="grid grid-cols-1 gap-2 text-black Noto Sans font-weight: 400 text-sm ">
                <div>         
                  <Typography color="primary" type="h4">
                      {t("category.name")}
                  </Typography> 
                </div>                         
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  const renderTitle = () =>{
    return(
      <Card type="primary" size="full" className="  mb-2">
        <Typography color="primary" type="h1"> 
            {t("category.title")}
        </Typography>
      
      </Card>
    )
  }

  const renderFilters = () => {
    return (
      <Card type="primary" size="full" className=" bg-white">
          <div className="flex content-start">
            <div className="flex justify-start">   
            </div>
            <div className=" content-start md:w-1/3  relative">
              <input
                  type="search"
                  onChange={handleChange}
                  className="w-full bg-gray-200 border border-gray-200 text-gray-700 rounded border-0 p-2 leading-tight rounded-lg"
                  placeholder={t('category.search_by_category')}
              />
              <div className="absolute inset-y-0 mt-2 right-0 mr-2 text-gray-500">
                    {paginationAndFilterData.searchTerm && paginationAndFilterData.searchTerm != "NONE" ? null : (
                      <FontAwesomeIcon icon={faSearch} size="lg" />
                    )}
              </div>
            </div>         
          </div>
      </Card>
    );
  };

  const renderNoRecords = () => {
      return (
          <Card type="primary" size="full" className=" bg-white mb-2">
              <div className="w-3/12">
                  <Typography color="primary" type="h4">
                      <Spinner type={"ClipLoader"}/>
                  </Typography>
              </div>
          </Card>
      )
  }

  //default values for filters and pagination
  let initialPaginationAndFilterData = {
      page: 0,
      size: 25,
      searchTerm: "ALL",
  };

  const [paginationAndFilterData, setPaginationAndFilterData] = useState(initialPaginationAndFilterData);
 
  const handleChange = (e) => {
    let text = e.target.value ? e.target.value : "ALL"
    setPaginationAndFilterData({
        ...paginationAndFilterData,
        searchTerm: text
    })   
};

  const gotoPage = (pageNo) => {
    setPaginationAndFilterData({
      ...paginationAndFilterData,
        page: pageNo,
    });
  }; 

  useEffect(() => {
    props.getCategoryList(paginationAndFilterData)
  },[paginationAndFilterData]);

  useEffect(()=>{
      return ()=> props.resetCategoryState()
  },[])

  return (
    <div>
      {renderTitle()}
      {renderFilters()} 
      {renderHeader()}
      { props.categoryList?.categories?.length>0
            ? props.categoryList?.categories.map((categories, i) => renderCategories(categories,i))
          : renderNoRecords()
      }
      {props.categoryList?.totalItems>paginationAndFilterData.size && (
        <Pagination
          currentPage={props.categoryList?.page}
          totalPages={props.categoryList?.totalPages}
          getNextPageNumber={gotoPage}
        />
      )}
    </div>
  );
};

export default compose(BaseHOC)(CategoryStore(ListCategories));
