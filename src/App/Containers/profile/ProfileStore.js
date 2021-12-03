import React, {useEffect} from "react";
import ProfileActions from "../../Stores/Profile/Actions";
import {useDispatch, useSelector} from "react-redux";
import { ProfileState } from "../../Stores/Profile/Selectors";

const ProfileStore = Component  =>
    function Comp(props) {

        const dispatch = useDispatch()

        useEffect(()=>{
            dispatch({type: ProfileActions.userProfile})
        },[])

        let profile = useSelector( state => ProfileState(state)  )

        const getProps = () => ({
            ...props,
            profile,
            userProfile: () => {
                dispatch({type: ProfileActions.userProfile});
            },
            updateUserProfile: (data) => {
                dispatch({type: ProfileActions.userProfileUpdate,data});
            },
        })

    return <Component {...getProps()} />;
}

export default  ProfileStore;