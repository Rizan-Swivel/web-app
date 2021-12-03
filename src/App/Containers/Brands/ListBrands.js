import React, { useEffect, useState } from "react";
import { Card } from "../../Components/atoms/Card";
import { compose } from "redux";
import BaseHOC from "../BaseHOC";
import BrandStore from "./BrandStore";
import { Typography } from "../../Components/atoms/Typography";
import { Pagination } from "../../Components/atoms/Pagination";
import image from "../../assets/images/Placeholder.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {Spinner} from "../../Components/atoms/Spinner"


const List = (props) => {
  const { t } = props;

  const renderHeaders = () => {
    return (
      <Card type="primary" size="full" className=" bg-white mb-4">
        <div className="flex-grow border-b">
          <div className="flex">
            <div className="w-3/12">
            <Typography color="primary" type="h4">
                 {t("common.icon")} 
              </Typography>
            </div>
            <div className="w-3/12">
              <Typography color="primary" type="h4">
                {t("common.user.name")}
              </Typography>
            </div>
            <div className="w-3/12">
              <Typography color="primary" type="h4">
                {/* {t("common.user.description")} */}
              </Typography>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  const renderTitle =() =>{
    return(
      <Card type="primary" size="full" className="mb-4">
        <div className="flex-grow border-b">
        <Typography color="primary" type="h1">
          {t("common.brand.title")}
        </Typography>
        </div>
      </Card>
    )
  }

  const renderBrands = (brand) => {
    return (
      <Card type="primary" size="full" className=" bg-white mb-2">
        <Link
          to={{
            pathname: "/brands/view/" + brand.id,
          }}
        >
          <div className="flex-grow border-b py-1">
            <div className="flex">
              <div className="w-3/12">
                <img
                  class="w-12 h-12 rounded-full object-cover mr-4 shadow"
                  src={brand.images?.activeImageUrl ? brand.images?.activeImageUrl : image}
                  alt="avatar"
                />
              </div>
              <div className="w-3/12">
                  {brand.name}            
              </div>
              <div className="w-3/12">
                <Typography color="primary" type="h4">
                  {/* {brand.description} */}
                </Typography>
              </div>
            </div>
          </div>
        </Link>
      </Card>
    );
  };

  const renderFilters = () => {
    return (
      <Card type="primary" size="full" className=" bg-white">
      <div className="flex justify-between">
        <div className="w-full md:w-1/3  relative">
          <input
            type="search"
            onChange={handleChange}
            className="w-full bg-gray-200 border border-gray-200 text-gray-700 rounded border-0 p-2 leading-tight rounded-lg"
            placeholder={t("common.brand.search_by_band")}
          />
          <div class="absolute inset-y-0 mt-2 right-0 mr-2 text-gray-500">
            {paginationAndFilterData.searchTerm &&
            paginationAndFilterData.searchTerm != "NONE" ? null : (
              <FontAwesomeIcon icon={faSearch} size="lg" />
            )}
          </div>
        </div>
      </div>
    </Card>
    );
  };

  const [ spinner, setSpinner ] = useState(true);

  useEffect(() => {
    setTimeout(() => setSpinner(false), 1000)
  }, []);
 

  const renderNoRecords = () => {
    return (
        <Card type="primary" size="full" className=" bg-white mb-2">
            <div className="w-3/12">        
                <Typography color="primary" type="h4">
                    <Spinner type={"ClipLoader"}/>
                      {/* No records found */}
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

  useEffect(()=>{
    return ()=>{props.resetBrandsState()}
  },[])

  useEffect(() => {
    props.getBrandList(paginationAndFilterData)
  },[paginationAndFilterData]);

  return (
    <div>
      {renderTitle()}
      {renderFilters()}
      {renderHeaders()}
      { props.brandList?.brands?.length>0
            ? props.brandList?.brands.map((brands, i) => renderBrands(brands,i))
          : renderNoRecords()
      }

      {props.brandList?.totalItems>paginationAndFilterData.size && (
        <Pagination
          currentPage={props.brandList?.page}
          totalPages={props.brandList?.totalPages}
          getNextPageNumber={gotoPage}
        />
      )}
    </div>
  );
};

export default compose(BaseHOC)(BrandStore(List));
