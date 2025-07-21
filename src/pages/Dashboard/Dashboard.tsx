 "use client"

import React, { useState } from 'react'
import NavBar from '../../components/NavBar'
import SideBar from '../../components/SideBar/SideBar'
import styles  from './Dashboard.module.scss'
import InfoCards from '../../components/InfoCards/InfoCards'
import MainDash from '../../components/MainDash/MainDash'
import FilterCard from '../../components/FilterCard/FilterCard'
function Dashboard() {
  const [openSideBar, setOpenSideBar]=useState<boolean>(false)
  return (
    <div className={styles.dashboard}>
        <NavBar openSidebar={()=>setOpenSideBar(!openSideBar)} sidebar={openSideBar}/>
        <SideBar open={openSideBar} />
        <InfoCards />
        <MainDash />
    </div>
  )
}

export default Dashboard