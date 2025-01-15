import React from 'react'
import Sidebar from '../../app/account/leftColumn/sidebar'

const Drawer = () => {
  return (
    <ul
      className="menu bg-base-200 text-base-content min-h-full w-72 p-4"
      aria-label="close sidebar"
    >
      <Sidebar />
    </ul>
  );
}

export default Drawer