import React, { useState } from 'react'

import SidebarContent from './SidebarContent'
import { Transition } from 'react-transition-group';

const duration = 300;

const defaultStyle = {
  transition: `width ${duration}ms ease-in-out`,
   
}

const transitionStyles = {
  entering: { width: 0 },
  entered: { width: '500px' },
  exiting: { width: '500px' },
  exited: { width: 0 }
};


function MobileSidebar(props) {
  const { isSidebarOpen } = props

  return (
    <Transition in={isSidebarOpen} timeout={duration}>
      {state => (
        <div style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}>
          <aside  className={`fixed inset-y-0 z-50 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-sideNav dark:bg-gray-800 lg:hidden ${!isSidebarOpen && 'invisible'}`}>
            <SidebarContent isSidebarOpen={isSidebarOpen}  {...props} />
          </aside>
        </div>
      )}
    </Transition>
  )
}

export default MobileSidebar
