import React, {useCallback, useState} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";

import { Link, NavLink } from 'react-router-dom';

const SideBar = ( props ) => {
    const {items, color, role, isAuthenticated} = props

    return (  
    <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
        <div className="py-4 text-gray-500 dark:text-gray-400">
            <a className="ml-6 text-lg font-bold text-gray-100 dark:text-gray-200" href="#logo" > Swivel App </a>
             
            <ul>
            {
                items.map((item,index) => {
                    if (!isAuthenticated && item.auth===false){
                        return <NavLink to={item.path} key={index} className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:.bg-purple-600 dark:hover:text-gray-200">{item.title}</NavLink>
                    }else if (isAuthenticated && item.auth==true && (item.roles.find(roleItem=>roleItem==role) == role)){
                        
                        return ( <li className={`relative px-6 py-3 panel-${item.title}.replace(/\s/g, '')`}> 
                        <NavLink 
                            to={item.path} 
                            key={index} 
                            className={`inline-flex items-center w-full text-sm text-white font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 ${'active'}`} href="forms.html">
                            <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                            </svg>
                            <span className="ml-4">{item.title}</span>
                        </NavLink>
                        </li>);
                    } else {
                        return ''
                    }
                })
            }
            </ul>
        </div>
    </aside>
)}

SideBar.propTypes = {
    items : PropTypes.object.isRequired,
    color : PropTypes.string,
    role : PropTypes.string
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);

