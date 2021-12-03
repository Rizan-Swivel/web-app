import React, { useEffect, useState } from "react";
import { Card } from "../../Components/atoms/Card";
import { compose } from "redux";
import BaseHOC from "../BaseHOC";
import UserStore from "./UserStore";
import { Typography } from "../../Components/atoms/Typography";
import { Pagination } from "../../Components/atoms/Pagination";
import image from "../../assets/images/Placeholder.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {get} from "lodash";
import {Spinner} from "../../Components/atoms/Spinner";

const List = (props) => {

  const {t} = props

    const renderTitle = () => {
        return(
            <Card type="primary" size="full" className=" "  >
                <div className="flex justify-between" >
                    <div className=" justify-start">
                        <Typography color="primary" type="h1">  {t("common.user.title")}</Typography>
                    </div>
                </div>
            </Card>
        )
    }

    const renderHeader =() =>{
        return(
            <Card type="primary" size="full" className=" bg-white mb-2"  >
                <div className="flex flex-row border-b justify-start">
                    <div className="flex flex-col w-1/6 mt-5">
                        <Typography color="primary" type="h4">
                            {t("common.profileImage")}
                        </Typography>
                    </div>
                    <div className="flex flex-col w-5/6 mt-5">
                        <div className="flex flex-row text-black Noto Sans font-weight: 400 text-sm ">
                            <div className="w-1/3 ">
                                <Typography color="primary" type="h4">
                                    {t("common.user.name")}
                                </Typography>
                            </div>
                            <div className="w-1/3 ">
                                <Typography color="primary" type="h4">
                                    {t("common.user.mobileNumber")}
                                </Typography>
                            </div>
                            <div className="w-1/3 ">
                                <Typography color="primary" type="h4">
                                    {t("common.user.createdAt")}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

    const renderUsers = (user,i) => {
    return (    
      <Card key={i} type="primary" size="full" className=" bg-white mb-2 h-24 space-y-2 ">
          <Link
              to={{
                  //pathname: "/users/view/"+item.userId,
              }}      >
            <div className="flex flex-row border-b justify-start">
                <div className="flex flex-col w-1/6">
                    <img
                        className="w-16 h-16 rounded-full object-cover mr-4 shadow"
                        src={user.imageUrl ? user.imageUrl : image}
                        alt="avatar"
                    />
                </div>
                <div className="flex flex-col w-5/6 mt-5">
                    <div className="flex flex-row text-black Noto Sans font-weight: 400 text-sm">
                        <div className="w-1/3">{get(user,'fullName')}</div>
                        <div className="w-1/3"> {get(user,'mobileNo.displayNumber')}</div>
                        <div className="w-1/3 "> {get(user,'createdAt.displayDate')}</div>
                    </div>
                </div>
            </div>
        </Link>
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

  const renderFilters = () => {
    return (     
      <Card type="primary" size="full" className=" bg-white ">
        <div className="w-3/12"></div>
        <div className="flex content-start">
            <div className="flex justify-start">               
            </div>
            <div className=" content-start md:w-1/3  relative">
                  <input
                      type="search"
                      onChange={handleChange}
                      className="w-full bg-gray-200 border border-gray-200 text-gray-700 rounded border-0 p-2 leading-tight rounded-lg"
                      placeholder={t('common.search_by_user')}
                  />
                <div class="absolute inset-y-0 mt-2 right-0 mr-2 text-gray-500">
                      {filterParameters.searchTerm && filterParameters.searchTerm != "NONE" ? null : (
                        <FontAwesomeIcon icon={faSearch} size="lg" />
                    )}  
                </div>
            </div>         
        </div>
      </Card>
    );
  };
  const [searchTermState, setSearchTermState] = useState(null)

  const handleChange = (e) => {
    let text = e.target.value ? e.target.value : "ALL"
    setFilterParameters({
      ...filterParameters,
      searchTerm:text,
    });
    setSearchTermState(e.target.value)
  };

  const gotoPage = (pageNo) => {
    setFilterParameters({
      ...filterParameters,
      page: pageNo,
    });
  };

  const [filterParameters, setFilterParameters] = useState({
    page: 0,
    size: 25,
    searchTerm: "ALL",
  });

  useEffect(() => {
    props.getAllMobileUsers(filterParameters);
  }, [filterParameters]);

   return (
    <div>
      {renderTitle()}
      {renderFilters()}
      {renderHeader()}

      { props.userList?.users?.length>0
        ? props.userList?.users.map((user, i) => renderUsers(user,i))
        : renderNoRecords()
      }

      { props.userList?.totalItems > filterParameters.size && 
        <Pagination
          currentPage={props.userList?.page}
          totalPages={props.userList?.totalPages}
          getNextPageNumber={gotoPage}
        />
      }
    </div>
  );
};
export default compose(BaseHOC)(UserStore(List));
