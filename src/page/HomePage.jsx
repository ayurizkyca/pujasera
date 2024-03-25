import React from 'react'
import SideBar from "../component/SideBar"
import Navbar from "../component/Navbar"

export default function HomePage() {
  return (
    <div className='h-[100vh]'>
      <Navbar />
      <SideBar />
    </div>
  )
}
