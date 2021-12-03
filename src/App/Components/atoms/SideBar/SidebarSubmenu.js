import React, { useState } from 'react'
import { Link, NavLink, Route } from 'react-router-dom'
// import { DropdownIcon } from '../Icons'
import * as Icons from '../Icons'
// import { Transition } from '@windmill/react-ui'
function Icon({ icon, ...props }) {
  const Icon = Icons[icon]
  return <Icon {...props} />
}

function SidebarSubmenu(props) {
  const {route, toggleSidebar, isSidebarOpen, t } = props
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false)

  function handleDropdownMenuClick() {
    setIsDropdownMenuOpen(!isDropdownMenuOpen)
  }

  return (
    <li className={`relative px-6 py-3 panel-${t(`navigation.${route.title}`).replace(/\s/g, '')}`} key={route.name}>
      <button
        className="inline-flex items-center text-white justify-between w-full text-sm font-semibold transition-colors duration-150 dark:hover:text-gray-200"
        onClick={handleDropdownMenuClick}
        aria-haspopup="true"
      >
        <div className="inline-flex items-center btn btn-effect">
          { route.path ? (
          <Link  className="w-full inline-flex" to={ route.path }>
            <span className="ml-4 bg-img">{t(`navigation.${route.title}`)}</span>
          </Link> ) : <span className="ml-4">{t(`navigation.${route.title}`)}</span> }
        </div>
        {/* <DropdownIcon className="w-4 h-4" aria-hidden="true" /> */}
      </button>
      {/* <Transition
        show={isDropdownMenuOpen}
        enter="transition-all ease-in-out duration-300"
        enterFrom="opacity-25 max-h-0"
        enterTo="opacity-100 max-h-xl"
        leave="transition-all ease-in-out duration-300"
        leaveFrom="opacity-100 max-h-xl"
        leaveTo="opacity-0 max-h-0"
      > */}
        <ul
          className="mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
          aria-label="submenu"
        >
          {route.routes.map((r) => (
            <li
              className={`px-4 transition-colors relative duration-150 text-white panel-${t(r.title).replace(/\s/g, '')}`}
              key={r.title}
              
            >
            
              <Link onClick={isSidebarOpen?  toggleSidebar : null} className="w-full font-semibold" to={r.path}>
                {t(r.title)}
              </Link>
            </li>
          ))}
        </ul>
      {/* </Transition> */}
    </li>
  )
}

export default SidebarSubmenu;
