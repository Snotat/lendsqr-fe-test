import React, { useState } from 'react'
import UserDetails from '../../components/UserDetails/UserDetails'
import NavBar from '../../components/NavBar'
import SideBar from '../../components/SideBar/SideBar'


const User = () => {
      const [openSideBar, setOpenSideBar]=useState<boolean>(false)
  return (
    <div>
        <NavBar openSidebar={()=>setOpenSideBar(!openSideBar)} sidebar={openSideBar}/>
        <SideBar open={openSideBar} />
        <UserDetails />
    </div>
  )
}

export default User