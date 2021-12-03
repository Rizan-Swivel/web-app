import React from "react";
import { useSelector, useDispatch } from "react-redux";
import UserAction from "../../Stores/User/Actions";

const UserStore = (Component) =>
  function Comp(props) {
    const dispatch = useDispatch();

    let userList = useSelector((state) => state.users.userList);

    const getProps = () => ({
      ...props,
      userList,
      getUserList: (data) => (dispatch(UserAction.getAllUsers(data))) ,
      getAllMobileUsers:(data) => ( dispatch(UserAction.getAllMobileUsers(data)) )
      
    })

    return <Component {...getProps()} />;
  };

export default UserStore;
